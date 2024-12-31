import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post('http://localhost:5000/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3D52A0] to-[#7091E6]">
      <div className="max-w-lg mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3D52A0]">Forgot Password</h2>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6]"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#3D52A0] text-white rounded mt-4 hover:bg-[#2E4292] focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
          >
            Submit
          </button>
        </form>

        {/* Message */}
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
