import React, { useState } from 'react';
import { deleteUserByPhone } from '../database/db';
import { useNavigate } from 'react-router-dom';

export default function DeleteUser() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDelete = () => {
    if (phone.trim() === '') {
      setMessage('الرجاء إدخال رقم الهاتف');
      return;
    }

    const success = deleteUserByPhone(phone);
    if (success) {
      setMessage('تم حذف الحساب بنجاح');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setMessage('لم يتم العثور على الحساب أو لا يمكن حذفه');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">حذف حساب</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">رقم الهاتف</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="مثال: 01011342972"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-center ${
              message.includes('نجاح') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
          >
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
} 