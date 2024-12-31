import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/auth/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3D52A0] to-[#7091E6]">
    <div className="max-w-lg mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#3D52A0]">Reset Password</h2>

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit}>
        {/* New Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6]"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#7091E6] focus:border-[#7091E6]"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#3D52A0] text-white rounded mt-4 hover:bg-[#2E4292] focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
        >
          Reset Password
        </button>
      </form>

      {/* Message */}
      {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
    </div>
  </div>
  );
};

export default ResetPassword;
