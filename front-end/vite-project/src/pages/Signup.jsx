import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('https://login-page-6789.onrender.com/auth/signup', formData);

            if (response.status === 201) {
                // Redirect to login page after successful signup
                navigate('/');
            }
        } catch (err) {
          console.log(err);
          console.error('Signup Error:', err.response?.data || err.message);
            setLoading(false);
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Something went wrong');
            } else {
                setError('Server error, please try again later');
            }
        }
    };

    return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3D52A0] to-[#7091E6]">
      <div className="max-w-lg mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3D52A0]">Create an Account</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className='min-w'>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6]"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6]"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6]"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#3D52A0] text-white rounded mt-4 hover:bg-[#2E4292] focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <a href="/" className="text-[#7091E6] hover:text-[#3D52A0]">Login</a>
          </p>
        </div>
      </div>
    </div>
    );
};

export default Signup;
