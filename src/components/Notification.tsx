  import React from 'react';

interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
  onClose: () => void;
}

const icons = {
  success: (
    <svg className="w-16 h-16 mx-auto animate-bounce" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" stroke="#bbf7d0" strokeWidth="3" fill="#f0fdf4" />
      <path d="M8 12l2 2l4-4" />
    </svg>
  ),
  error: (
    <svg className="w-16 h-16 mx-auto animate-shake" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" stroke="#fee2e2" strokeWidth="3" fill="#fef2f2" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  ),
  warning: (
    <svg className="w-16 h-16 mx-auto animate-pulse" viewBox="0 0 24 24" fill="none" stroke="#f59e42" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" stroke="#fef9c3" strokeWidth="3" fill="#fefce8" />
      <path d="M12 8v4m0 4h.01" />
    </svg>
  ),
  info: (
    <svg className="w-16 h-16 mx-auto animate-pulse" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" stroke="#dbeafe" strokeWidth="3" fill="#eff6ff" />
      <path d="M12 8h.01M12 12v4" />
    </svg>
  ),
};

export default function Notification({ type = 'info', message, description, onClose }: NotificationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">
        {icons[type]}
        <h2 className="text-2xl font-bold mt-4 mb-2 text-gray-800">{message}</h2>
        {description && <div className="text-gray-500 mb-4">{description}</div>}
        <button
          onClick={onClose}
          className="mt-4 px-8 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-lg hover:bg-blue-200 transition"
        >
          حسناً
        </button>
      </div>
    </div>
  );
}

// أنميشن CSS
// أضف في ملف index.css أو global css:
// .animate-fadeIn { animation: fadeIn .3s; }
// @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
// .animate-bounce { animation: bounce .8s infinite alternate; }
// @keyframes bounce { 0% { transform: scale(1);} 100% { transform: scale(1.15);} }
// .animate-shake { animation: shake .5s; }
// @keyframes shake { 0% { transform: rotate(-5deg);} 50% { transform: rotate(5deg);} 100% { transform: rotate(0);} }
// .animate-pulse { animation: pulse 1.2s infinite alternate; }
// @keyframes pulse { 0% { opacity: .7;} 100% { opacity: 1;} } 