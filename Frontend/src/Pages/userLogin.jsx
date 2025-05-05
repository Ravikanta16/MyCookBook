import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../Pages/API/MyAPI';

const UserLogin = () => {
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const {userData,setUserData}=useContext(UserDataContext)
    const navigate=useNavigate()

    const submitHandler= async (e)=>{
        e.preventDefault();

        const UserDetails = {
            username:userName,
            password:password
        }

        // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`,UserDetails);
        const response = await LoginAPI(UserDetails);
        if(response.status === 201){
            const data=response.data;
            setUserData(data.user)  
            localStorage.setItem('token',data.token)
            navigate('/home')
        }
        setUserName('')
        setPassword('')
    }
    return (
        <div className='bg-[url(https://imgs.search.brave.com/otLljbgDL6uWy-MBMBpE76i1mAy7A5EuWq9kT6OcGBk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2I5LzU4/LzRhL2I5NTg0YTNm/YzZjZjYzYjE1OTdj/ZDU3MmUyOWNiYmRl/LmpwZw)] p-7 h-screen w-full flex items-center justify-center flex-col'>
        <div className=" bg-gray-100 border border-gray-200 rounded-lg p-10 w-11/12 max-w-2xl">
            <form onSubmit={(e)=>{
                submitHandler(e)}
            }>
                <h1 className="text-xl font-bold mb-4 text-blue-400 flex items-center justify-center">Sign In Form</h1>
                <h1 className='text-xl font-medium mb-2'>What's your Name?</h1>
                <input 
                    className='bg-slate-100 border-slate-200 border rounded w-full mb-7 px-2 py-2' 
                    value={userName}
                    onChange={(e)=>{
                        setUserName(e.target.value)}
                    }
                    required type='text' 
                    placeholder='name'
                
                />
                <h1 className='text-xl font-medium mb-2'>Enter Password</h1>
                <input 
                    className='bg-slate-100 border-slate-200 border rounded w-full mb-7 px-2 py-2' 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)}
                    }
                    required type='password' 
                    placeholder='password'
                />
                <button className='w-full rounded bg-gray-700 text-white font-bold px-2 py-2'>Login</button>
            </form> 
            <p className='justify-center mt-2 '>New here ? <Link to='/signup' className='text-blue-400'>Create New Account</Link></p>

        </div>
        </div>
    );
};

export default UserLogin;