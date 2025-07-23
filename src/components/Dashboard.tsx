import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  balance: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                مرحباً، {user.first_name} {user.last_name}
              </h1>
              <p className="text-gray-600">هذه صفحتك الشخصية</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl flex items-center">
              <Wallet className="w-6 h-6 text-red-600 ml-2" />
              <div>
                <p className="text-sm text-gray-600">رصيد المحفظة</p>
                <p className="text-xl font-bold text-red-600">{user.balance} جنيه</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">الدورات المتاحة</h2>
            {/* هنا يمكنك إضافة قائمة بالدورات المتاحة */}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">الدورات المشتركة</h2>
            {/* هنا يمكنك إضافة قائمة بالدورات المشتركة */}
          </div>
        </div>
      </div>
    </div>
  );
} 