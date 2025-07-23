import { useState } from 'react';
import { User, Phone, Mail, Lock, Briefcase, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://script.google.com/macros/s/AKfycbw1xVNk-9jP1xlouFYVMEotmmWnpgh53pUXTmbleOFPBW6JWwEwK2RGJAaxM5OSV_Pl3A/exec';

const governorates = [
  'القاهرة', 'الإسكندرية', 'الجيزة', 'المنصورة', 'طنطا', 'المنيا', 'أسيوط',
  'سوهاج', 'قنا', 'أسوان', 'الأقصر', 'الغردقة', 'شرم الشيخ', 'السويس'
];

const grades = [
  'الصف الأول الثانوي',
  'الصف الثاني الثانوي',
  'الصف الثالث الثانوي'
];

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    third_name: '',
    phone: '',
    mother_phone: '',
    parent_job: '',
    school: '',
    governorate: '',
    grade: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);

  // رابط فيديو طريقة إنشاء حساب
  const howToCreateAccountVideo = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // تحقق من صحة كلمة السر
    if (formData.password !== formData.confirm_password) {
      alert('كلمة السر غير متطابقة');
      return;
    }
    setLoading(true);
    // بناء بيانات المستخدم
    const newUser = {
      id: Date.now(),
      first_name: formData.first_name,
      last_name: formData.second_name + ' ' + formData.third_name,
      email: formData.email,
      password: formData.password,
      governorate: formData.governorate,
      grade: formData.grade,
      balance: 0,
      role: 'student',
      phone: formData.phone,
      secondary_phone: formData.mother_phone
    };
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (res.ok) {
        alert('تم إنشاء الحساب بنجاح!');
        navigate('/login');
      } else {
        alert('حدث خطأ أثناء إنشاء الحساب');
      }
    } catch (err) {
      alert('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-8">
        <div className="max-w-2xl mx-auto w-full">
          {/* Title */}
          <h2 className="text-3xl font-bold text-blue-700 mb-2 flex items-center gap-2">
            <span>طلب إنشاء حساب</span>
            <User className="w-7 h-7 text-blue-400" />
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            ادخل بياناتك بشكل صحيح وسيتم التواصل معك خلال ساعات قليلة لتفعيل الحساب !
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <User className="w-4 h-4 text-blue-400" /> الاسم الأول
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.first_name}
                  onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <User className="w-4 h-4 text-blue-400" /> الاسم الثاني
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.second_name}
                  onChange={e => setFormData({ ...formData, second_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <User className="w-4 h-4 text-blue-400" /> الاسم الثالث
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.third_name}
                  onChange={e => setFormData({ ...formData, third_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="w-4 h-4 text-blue-400" /> رقم الهاتف
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="w-4 h-4 text-blue-400" /> رقم هاتف الأم
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.mother_phone}
                  onChange={e => setFormData({ ...formData, mother_phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-blue-400" /> مهنة ولي الأمر
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.parent_job}
                  onChange={e => setFormData({ ...formData, parent_job: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <School className="w-4 h-4 text-blue-400" /> اسم المدرسة
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.school}
                  onChange={e => setFormData({ ...formData, school: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">المحافظة</label>
                <select
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.governorate}
                  onChange={e => setFormData({ ...formData, governorate: e.target.value })}
                >
                  <option value="">اختر المحافظة</option>
                  {governorates.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">الصف الدراسي</label>
                <select
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.grade}
                  onChange={e => setFormData({ ...formData, grade: e.target.value })}
                >
                  <option value="">اختر الصف الدراسي</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4 text-blue-400" /> البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <Lock className="w-4 h-4 text-blue-400" /> كلمة السر
                </label>
                <input
                  type="password"
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 flex items-center gap-1">
                  <Lock className="w-4 h-4 text-blue-400" /> تأكيد كلمة السر
                </label>
                <input
                  type="password"
                  required
                  className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent"
                  value={formData.confirm_password}
                  onChange={e => setFormData({ ...formData, confirm_password: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg mt-4 shadow hover:bg-blue-700 transition"
            >
              طلب إنشاء حساب !
            </button>
            <button
              type="button"
              onClick={() => window.open(howToCreateAccountVideo, '_blank')}
              className="w-full bg-blue-50 text-blue-700 border border-blue-200 py-3 rounded-lg font-bold text-base shadow hover:bg-blue-100 transition mt-2"
            >
              طريقة إنشاء حساب على منصة بستشارك
            </button>
            <div className="text-center mt-4 text-sm">
              <span className="text-gray-500">يوجد لديك حساب بالفعل؟ </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-cyan-600 font-bold hover:underline"
              >
                ادخل إلى حسابك الآن !
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