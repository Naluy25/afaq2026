import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import Notification from './Notification';

const API_URL = 'https://script.google.com/macros/s/AKfycbw1xVNk-9jP1xlouFYVMEotmmWnpgh53pUXTmbleOFPBW6JWwEwK2RGJAaxM5OSV_Pl3A/exec';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // رابط فيديو طريقة إنشاء حساب
  const howToCreateAccountVideo = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
  // رابط طريقة الدفع والاشتراك
  const paymentGuideLink = 'https://your-payment-guide-link.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const users = await res.json();
      const user = users.find((u: any) => u.phone === formData.phone && u.password === formData.password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
          window.location.reload();
        }, 2000);
      } else {
        setError('بيانات الدخول غير صحيحة. تأكد من رقم الهاتف وكلمة المرور.');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('يرجى التواصل مع الدعم لاستعادة كلمة المرور.');
  };

  return (
    <div className="min-h-screen flex bg-white">
      {showSuccess && (
        <Notification
          type="success"
          message="تم تسجيل الدخول بنجاح !"
          description="اضغط حسناً للاستمرار"
          onClose={() => {
            setShowSuccess(false);
            navigate('/');
            window.location.reload();
          }}
        />
      )}
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-8">
        <div className="max-w-xl mx-auto w-full">
          {/* Title */}
          <h2 className="text-3xl font-bold text-yellow-600 mb-2 flex items-center gap-2">
            <span>تسجيل الدخول</span>
            <span className="text-2xl">✝️</span>
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            ادخل على حسابك بإدخال رقم الهاتف و كلمة المرور المسجل بهم من قبل
          </p>
          {error && <div className="text-red-600 text-center mb-4 font-bold">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-1 flex items-center gap-1">
                <Phone className="w-4 h-4 text-cyan-500" /> رقم الهاتف
              </label>
              <input
                type="tel"
                required
                className="w-full p-3 border-b-2 border-gray-200 focus:border-yellow-400 outline-none bg-transparent"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 flex items-center gap-1">
                <Lock className="w-4 h-4 text-cyan-500" /> كلمة السر
              </label>
              <input
                type="password"
                required
                className="w-full p-3 border-b-2 border-gray-200 focus:border-yellow-400 outline-none bg-transparent"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-white py-3 rounded-lg font-bold text-lg mt-2 shadow hover:bg-yellow-500 transition"
            >
              تسجيل الدخول
            </button>
            <div className="flex flex-col md:flex-row gap-2 mt-2">
              <button
                type="button"
                onClick={() => window.open(paymentGuideLink, '_blank')}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold text-base shadow hover:bg-teal-600 transition"
              >
                طريقة الدفع و الإشتراك في المواد على منصة بستشارك
              </button>
              <button
                type="button"
                onClick={() => window.open(howToCreateAccountVideo, '_blank')}
                className="w-full bg-blue-50 text-blue-700 border border-blue-200 py-3 rounded-lg font-bold text-base shadow hover:bg-blue-100 transition"
              >
                طريقة إنشاء حساب على منصة بستشارك
              </button>
            </div>
            <div className="text-center mt-4 text-sm">
              <span className="text-gray-500">هل نسيت كلمة السر؟ </span>
              <button type="button" onClick={handleForgotPassword} className="text-yellow-600 font-bold hover:underline bg-transparent border-none outline-none cursor-pointer">اضغط هنا</button>
            </div>
            <div className="text-center mt-2 text-sm">
              <span className="text-gray-500">لا يوجد لديك حساب؟ </span>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-cyan-600 font-bold hover:underline"
              >
                أنشئ حسابك الآن !
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
        <img src="/login-illustration.png" alt="تسجيل الدخول" className="max-w-md w-full" />
      </div>
    </div>
  );
}