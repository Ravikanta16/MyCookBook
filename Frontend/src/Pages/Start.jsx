import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://imgs.search.brave.com/IN-5u-BccYVpVc32L3TP3foc8ENf-3rBnxOJFnI63w8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzA1LzU4LzQ5/LzM2MF9GXzEwNTU4/NDk1NF9DcWpBT2tI/Rmh0NGg3NWMwdk4w/R3Q5d3p2NVZNeUdo/MS5qcGc)] h-screen w-full pt-3 flex justify-between flex-col'>
            
            <div className="flex flex-col justify-center items-center h-screen">
                <h2 className="text-4xl font-bold text-black">
                    Welcome to Tasty Tales
                </h2>
                <p className="text-xl text-gray-700 mt-1">Where Every Recipe Tells a Story</p>
                <Link to='/login' className='bg-gray-600 rounded-lg p-1 text-2xl text-white mt-4 py-3'>Browse Recipes</Link>
            </div>
                
            </div>
        </div>
    );
};

export default Start;