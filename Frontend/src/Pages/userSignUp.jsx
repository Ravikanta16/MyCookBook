import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { RegisterAPI } from '../Pages/API/MyAPI';

const UserSignUp = () => {
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const navigate = useNavigate();

    const {userData,setUserData} = useContext(UserDataContext)

    const submitHandler= async (e)=>{
        e.preventDefault();

        const newUser = {
            username:userName,
            email:email,
            password:password
        }

        // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`,newUser);
        const response = await RegisterAPI(newUser);
        if(response.status === 201){
            const data=response.data;
            setUserData(data.user)  
            localStorage.setItem('token',data.token)
            navigate('/home')
        }

        setUserName('')
        setEmail('')
        setPassword('')
    }
    return (
        <div className='bg-[url(https://imgs.search.brave.com/4DwU690Bau9ugN2WGkFZBZZkm_4nvFSrlUEi2rtoUvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFd2pq/V2QyQkUvMS8wLzEx/MzF3L2NhbnZhLXJl/c3RhdXJhbnQtbWVu/dS1oZWFsdGh5LWZv/b2Qtd2l0aC1waG90/by15TkVzVHFBbm5Y/MC5qcGc)] p-7 h-screen w-full flex items-center justify-center flex-col'>
        <div className=" bg-gray-100 border-2 border-gray-200 rounded-lg p-10 w-11/12 max-w-2xl">
            <form onSubmit={(e)=>{
                submitHandler(e)}
            }>
                <h1 className="text-xl font-bold mb-4 text-blue-400 flex items-center justify-center">Sign Up Form</h1>
                <h1 className='text-lg font-medium mb-2'>What's your Name?</h1>
                <div className='flex gap-4'>
                    <input 
                        className='bg-slate-100 border-slate-200 border rounded w-full mb-5 px-1 py-1' 
                        required type='text'
                        placeholder='full name'
                        value={userName}
                        onChange={(e)=>{
                            setUserName(e.target.value)}
                        }
                    />
                </div>
                
                <h1 className='text-lg font-medium mb-2'>Email Address</h1>
                <input 
                    className='bg-slate-100  border-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='email' 
                    placeholder='email@example.com'
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)}
                    }
                
                />
                <h1 className='text-lg font-medium mb-2'>Enter Password</h1>
                <input 
                    className='bg-slate-100  border-slate-200 border rounded w-full mb-5 px-1 py-1' 
                    required type='password' 
                    placeholder='password'
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)}
                    }
                />
                <button className='w-full rounded bg-gray-700 text-white font-bold px-2 py-2'>Create Account</button>
            </form> 
            <p className='justify-center mt-2'>Already have an account ? <Link to='/login' className='text-blue-400'>Login here</Link></p>
        </div>
        </div>
    );
};

export default UserSignUp;