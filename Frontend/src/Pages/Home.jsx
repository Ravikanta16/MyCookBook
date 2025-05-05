import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FiSearch } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { BookmarkAPI, BookmarkedRecipeAPI, DeleteRecipeAPI, GetRecipeAPI, SearchAPI, UnBookmarkAPI } from '../Pages/API/MyAPI';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const {userData,setUserData}=useContext(UserDataContext);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState({});

    useEffect(() => {
        fetchRecipes();
    }, []);

    const token = localStorage.getItem('token')

    const fetchRecipes = async () => {
        try {
            //const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipe/`);
            const response = await GetRecipeAPI();
            try {
                // const responsebookmarked=await axios.get(`${import.meta.env.VITE_BASE_URL}/recipe/bookmarked`, {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // });
                const responsebookmarked=await BookmarkedRecipeAPI(token);
                const bookmarkedObj = {};
                responsebookmarked.data.forEach(recipe => {
                    bookmarkedObj[recipe._id] = true;
                });
                setBookmarkedRecipes(bookmarkedObj);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipe/search?search=${searchTerm}`);
            const response = await SearchAPI(searchTerm);
            setRecipes(response.data);
        } catch (error) {
            console.error('Error searching recipe:', error);
        }
        setSearchTerm("");
    };

    const handleDelete = async (id) => {
        try {
            // await axios.delete(`${import.meta.env.VITE_BASE_URL}/recipe/delete`,{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            //     params: {
            //         recipeId: id,
            //     }
            // });
            await DeleteRecipeAPI(id,token);
            fetchRecipes();
        } catch (error) {
            alert("You are not authorized to delete this recipe");
            console.error('Error deleting event:', error);
        }
    };

    const myBookMarkedRecipes = async () => {
        try {
            // const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/recipe/bookmarked`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
            const response = await BookmarkedRecipeAPI(token);
            const bookmarkedObj = {};
            response.data.forEach(recipe => {
                bookmarkedObj[recipe._id] = true;
            });
            setBookmarkedRecipes(bookmarkedObj);
            if(response.data.length === 0){
                alert("No recipes found in your bookmarks");
            }
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleBookmark = async (recipeId) => {
        const isCurrentlyBookmarked = bookmarkedRecipes[recipeId] || false;

        setBookmarkedRecipes(prev => ({
            ...prev,
            [recipeId]: !isCurrentlyBookmarked
        }));

        if(!isCurrentlyBookmarked){
            // await axios.post(`${import.meta.env.VITE_BASE_URL}/recipe/bookmark`, {
            //     recipeId: recipeId,
              
            // },{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
            await BookmarkAPI(recipeId,token);
        }
        else{
            // await axios.post(`${import.meta.env.VITE_BASE_URL}/recipe/unbookmark`, {
            //     recipeId: recipeId,
               
            // },{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
            await UnBookmarkAPI(recipeId,token);
        }
    }

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);  
    };

    const handleCloseDetails = () => {
        setSelectedRecipe(null); 
    };

    return (
        <div className="bg-[url(https://img.freepik.com/free-photo/green-plate-star-anise-orange-marmalades_114579-58424.jpg?t=st=1745501476~exp=1745505076~hmac=7bbc15d10da5d3fa8a71a31e796b2a65f941a48ddc27a2569731c43d15c9d86c&w=1380)] min-h-screen flex flex-col">
            <header className="p-4 pl-8 pr-8 flex justify-between items-center">
                <div 
                    className=" text-white text-4xl font-bold hover:text-gray-100 cursor-pointer"
                    onClick={() => {
                        fetchRecipes();
                    }}
                >
                    Cook    Book
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <button className="text-white font-extrabold text-2xl hover:text-gray-100" onClick={myBookMarkedRecipes}>Favourites</button>
                    </div>
                    <Link to='/CreateRecipe' className="text-white font-extrabold text-2xl hover:text-gray-100">Add Recipe</Link>
                    <div className="flex items-center border-2 rounded-full text-white font-bold text-xl bg-emerald-500 p-1">
                        {userData.username}
                    </div>
                </div>
            </header>
            
            <main className="flex-grow p-4">
                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        className="border border-black rounded-lg p-2 flex-grow"
                        placeholder="Search recipies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch size={40}
                        className="text-blue-500 hover:text-black border rounded-lg bg-white cursor-pointer"
                        onClick={(e)=>{
                            handleSearch(e)}
                        }
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">``
                {recipes.sort((a,b) => new Date(b?.createdAt) - new Date(a?.createdAt) ).map((recipe) => (
                <div
                    key={recipe._id}
                    className="border p-4 bg-slate-200 hover:shadow-2xl rounded-lg shadow cursor-pointer"
                >
                    <img
                        src={recipe.Image}
                        alt="Recipe"
                        className=" h-64 w-full mb-4 rounded-lg"
                        width={100}
                        height={200}
                        onClick={() => handleCardClick(recipe)}
                    />
                    <h2 className="text-xl font-semibold flex items-center text-green-500 justify-center truncate ">{recipe.title}</h2>
                    <div className="flex justify-between items-center">
                    <p className="text-blue-600">By- {recipe.createdBy}</p>
                    <p className="text-blue-600">On- {new Date(recipe.createdAt).toLocaleDateString()}</p>
                
                    </div>
                    <div className=" flex justify-between mt-2">
                        <button 
                            className="bg-none border-none cursor-pointer p-1"
                            onClick={()=>handleBookmark(recipe._id)}>
                                {bookmarkedRecipes[recipe._id] ? <FaBookmark size={20} color="green" /> : <FaRegBookmark size={20} color="gray" />}
                        </button>
                        <FaTrash size={20}
                            className="text-red-400 hover:text-black cursor-pointer"
                            onClick={(e) => {
                                handleDelete(recipe._id)}
                            } 
                        />
                    </div>
                </div>
                ))}
                </div>
                {selectedRecipe && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-end">
                            <button onClick={handleCloseDetails} className="text-red-500 text-lg mb-4">
                                Close
                            </button>
                        </div>
                        <img
                            src={selectedRecipe.Image}
                            alt="Recipe"
                            className="w-full h-64 object-cover mb-4"
                        />
                        <h2 className="text-2xl text-red-500 font-bold flex items-center justify-center mb-4">{selectedRecipe.title}</h2>
                        <div className='flex justify-between items-center mb-2'>
                        <p className="text-blue-600 mb-2">By- {selectedRecipe.createdBy}</p>
                        <p className="text-blue-600 mb-2">On- {new Date(selectedRecipe.createdAt).toLocaleDateString()}</p>
                     
                        </div>
                        <div 
                            className="mt-2 mb-2"
                            dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
                        />
                        <p className="mt-2 mb-2"><b>Ingredients: </b>{selectedRecipe.ingredients.join(", ")}</p>
                    </div>
                </div>
            )}
            </main>
        </div>
    );
};

export default Home;