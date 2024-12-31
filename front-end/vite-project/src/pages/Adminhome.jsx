import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Adminhome = () => {
  //const { userId } = useParams(); // Get userId from the URL params
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const userId= localStorage.getItem('userId');

        if (!token) {
          // If no token is present, redirect to login
          navigate('/');
        } else {
          // Fetch user data based on userId
          const response = await axios.get(`https://login-page-6789.onrender.com/auth/home/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }, // Send token in request header
          });

          setUserData(response.data); // Store the data in state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/'); // Redirect to login if the token is invalid or expired
      }
    };

    fetchUserData();
  }, [ navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userId');
    navigate('/'); // Redirect to login page
  };

  if (!userData) {
    return <div>Loading...</div>; // Display loading while fetching user data
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#3D52A0] to-[#7091E6]">
      <h2 className="text-5xl font-semibold text-[#fff] mb-6 text-center">
        Welcome {userData.name}!
      </h2>
      <p className="text-lg text-[#fff] mb-6 text-center">
        You are logged in and ready to access your dashboard.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate(`/profile/${userData.id}`)}
          className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg"
        >
          Go to Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-[#f44336] text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Adminhome;
