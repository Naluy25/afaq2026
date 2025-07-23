import { Link, useLocation } from 'react-router-dom';
import { Users, Settings } from 'lucide-react';

const sidebarLinks = [
  { to: '/dashboard', label: 'ملف المستخدم' },
  { to: '/charge-code', label: 'شحن كود سنتر' },
  { to: '/wallet', label: 'محفظتي' },
  { to: '/subscriptions', label: 'كورساتي' },
  { to: '/store', label: 'متاجر الكتب' },
  { to: '/forum', label: 'مجموعات الواتساب' },
];

export default function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <aside className="w-64 bg-white shadow-lg rounded-xl p-4">
      <div className="space-y-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === link.to
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <span>{link.label}</span>
          </Link>
        ))}
        {user.role === 'admin' && (
          <>
            <Link
              to="/admin/users"
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === '/admin/users'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Users className="w-6 h-6" />
              <span>إدارة المستخدمين</span>
            </Link>
            <Link
              to="/settings"
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === '/settings'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Settings className="w-6 h-6" />
              <span>إعدادات النظام</span>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
} 