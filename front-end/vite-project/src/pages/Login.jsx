import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,  useNavigate } from 'react-router-dom';

const Login = () => {
    //const { userId } = useParams();
    const [ error, setError ]=useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        try {
            const res = await axios.post('https://login-page-6789.onrender.com/auth/login', { email, password });
            const { token, id } = res.data;
            localStorage.setItem('token', token);
            navigate(`/admin/${id}`);
        } catch (err) {
            //setError(err.response.data.message || 'Something went wrong');
            console.error(err.response.data.message);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Something went wrong');
            } else {
                setError('Server error, please try again later');
            }
        }
    };

    return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3D52A0] to-[#7091E6]">
      <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#3D52A0] mb-6 text-center">Login</h2>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-[#8697C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6] bg-[#EDE8F5] text-gray-700 placeholder-gray-500"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-[#8697C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6] bg-[#EDE8F5] text-gray-700 placeholder-gray-500"
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#3D52A0] text-white font-semibold rounded-lg hover:bg-[#2E4292] focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
        >
          Login
        </button>

        {/* Signup and Forgot Password Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            New user?{' '}
            <a href="/signup" className="text-[#7091E6] hover:text-[#3D52A0]">
              Signup
            </a>
          </p>
          <p className="text-gray-700 mt-2">
            Forgot password?{' '}
            <a href="/forgotpassword" className="text-[#7091E6] hover:text-[#3D52A0]">
              Forgot Password
            </a>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Login;
