import axios from 'axios';

export const LoginAPI =async  (UserDetails) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`,UserDetails);
        return response;
    } catch (error) {
        console.error('Error in login:', error);
        throw error;
    }
}

export const RegisterAPI =async (newUser) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`,newUser);
        return response;
    } catch (error) {
        console.error('Error in register:', error);
        throw error;
    }
}

export const ProfileAPI = async (token)=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error in profile check:', error);
        throw error;
    }
}

export const CreateRecipeAPI = async (newRecipe,token) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/recipe/create`,
            newRecipe,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Error in creating recipe data:', error);
        throw error;
    }
}

export const GetRecipeAPI = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipe/`);
        return response;
    } catch (error) {
        console.error('Error in getting recipe data:', error);
        throw error;
    }
}

export const BookmarkedRecipeAPI = async (token) => {
    try {
        const responsebookmarked=await axios.get(`${import.meta.env.VITE_BASE_URL}/recipe/bookmarked`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return responsebookmarked;
    } catch (error) {
        console.error('Error in getting bookmarked recipe data:', error);
        throw error;
    }
}

export const BookmarkAPI = async (recipeId,token) => {
    try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/recipe/bookmark`, {
            recipeId: recipeId,
          
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error in bookmarking recipe:', error);
        throw error;
    }
}

export const UnBookmarkAPI = async (recipeId,token) => {
    try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/recipe/unbookmark`, {
            recipeId: recipeId,
           
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error in unbookmarking recipe:', error);
        throw error;
    }
}

export const SearchAPI = async (searchTerm) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipe/search?search=${searchTerm}`);
        return response;
    } catch (error) {
        console.error('Error in searching recipe:', error);
        throw error;
    }
}

export const DeleteRecipeAPI = async (id,token) => {
    try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/recipe/delete`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                recipeId: id,
            }
        });
    } catch (error) {
        console.error('Error in deleting recipe:', error);
        throw error;
    }
}

export const fetchData = async (recipeName) => {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


