import { useNavigate } from 'react-router-dom';
import { useEffect, useState,useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import React from 'react';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserDataContext);
    const token = localStorage.getItem('token');

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data) {
                setUserData(response.data);
            } else {
              console.log("no token found")
              navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        if (!token) {
          console.log("no token found")
          navigate('/login');
        } else {
          setUserData(""); 
          getUserProfile();
        }
    }, [token,navigate]);
    return <>{children}</>;
};

export default UserProtectedWrapper;
