import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateRecipe = () => {

    const [recipeName, setRecipeName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState('');
    const [date, setDate] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();

    const {userData,setUserData} = useContext(UserDataContext)

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (recipeName.trim().length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);
                const data = await res.json();
                if (data.recipes) {
                    setSuggestions(data.recipes.slice(0, 5));
                } else {
                    setSuggestions([]);
                }
            } catch (err) {
                console.error('Error fetching suggestions:', err);
                setSuggestions([]);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 400);
        return () => clearTimeout(debounce);
    }, [recipeName]);

    const handleSelectSuggestion = (title) => {
        setRecipeName(title);
        setSuggestions([]);
    };

    const submitHandler= async (e)=>{
        e.preventDefault();

        const token = localStorage.getItem('token')
        const newRecipe = {
            title:recipeName,
            instructions:instructions,
            Image:image,
            createdAt:date,
            ingredients:ingredients.split(','),
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/recipe/create`,
            newRecipe,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        if(response.status === 201){
            const data=response.data;  
            console.log("createevent"+ data.token)
            navigate('/home')
        }
        
        setRecipeName('')   
        setInstructions('')
        setImage('')
        setDate('')
        setIngredients('')
        
    }
    return (
        <div className='bg-[url(https://imgs.search.brave.com/6z4oiPp14ibm37BCShignOlVqr6PUUlJ_dNgK5aMeow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/NDI3NzU1My9waG90/by9iYWtpbmctaW5n/cmVkaWVudHMtb24t/YmFja2dyb3VuZC13/aXRoLWNvcHktc3Bh/Y2UuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWQxQm1vQjda/QXRDRU1ua1BTM2Rz/ellpbklKZVA1TWs0/bmc3dWFoNGtYOTA9)] p-7 h-screen w-full flex items-center justify-center flex-col'>
        <div className=" bg-gray-100 border-2 border-gray-200 rounded-lg p-10 w-11/12 mt-4 max-w-2xl">
            <form onSubmit={(e)=>{
                submitHandler(e)}
            }>
                <h1 className='text-lg font-medium mb-2'>Recipe Name</h1>
                <input 
                    className='bg-slate-100 border-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='text'
                    placeholder='recipe name'
                    value={recipeName}
                    onChange={(e)=>{
                        setRecipeName(e.target.value)}
                    }
                />
               
                {suggestions.length > 0 && (
                    <>
                    <p>Suggestions....</p>
                    <ul className='bg-gray-100 border border-gray-300 rounded mb-5'>
                        {suggestions.map((item) => (
                            <li
                                key={item.recipe_id}
                                onClick={() => handleSelectSuggestion(item.title)}
                                className='px-2 py-1 hover:bg-gray-200 border text-blue-500 cursor-pointer'
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                    </>
                )}

                <h1 className='text-lg font-medium mb-2'>Date</h1>
                <input 
                    className='bg-slate-100 border-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='date' 
                    placeholder='dd/mm/yyyy'
                    value={date}
                    onChange={(e)=>{
                        setDate(e.target.value)}
                    }
                />

                <h1 className='text-lg font-medium mb-2'>Enter Instructions</h1>
                <ReactQuill 
                    theme="snow" 
                    value={instructions} 
                    onChange={setInstructions} 
                    placeholder="Write your cooking instructions here..." 
                />

                <h1 className='text-lg font-medium mb-2'>Image URL</h1>
                <input
                    className='bg-slate-100 border-slate-200 border rounded w-full mb-5 px-1 py-1'
                    required
                    type='text'
                    placeholder='Image URL'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <h1 className='text-lg font-medium mb-2'>Ingredients</h1>
                <input
                    className='bg-slate-100 border-slate-200 border rounded w-full mb-5 px-1 py-1'
                    required
                    type='text'
                    placeholder='e.g., sugar, flour, eggs'
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />

                <button className='w-full rounded bg-gray-700 text-white font-bold px-2 py-2'>Create Recipe</button>
            </form> 
        </div>
        </div>
    );
};

export default CreateRecipe;