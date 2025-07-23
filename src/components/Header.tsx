import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, User, Wallet, Home, LogOut, BookOpen, ShoppingCart, CreditCard, Users, Info, FileText, PlusSquare, LogIn, Accessibility } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (location.pathname === '/login' || location.pathname === '/register') {
        navigate('/');
      }
    } else {
      setUser(null);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md bg-white`}>
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <div className="p-2 rounded-xl bg-sky-50">
              <GraduationCap className="w-8 h-8 text-sky-500" />
            </div>
            <span className="text-2xl font-bold mr-3 text-gray-800">
              آفاق أكاديمي
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-sky-500 hover:bg-sky-50">الرئيسية</Link>
            <Link to="/grades" className="px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-sky-500 hover:bg-sky-50">المراحل الدراسية</Link>
            <Link to="/about" className="px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-sky-500 hover:bg-sky-50">عن المنصة</Link>
            <Link to="/contact" className="px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-sky-500 hover:bg-sky-50">تواصل معنا</Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full shadow text-sky-700 font-bold text-sm">
                  <Wallet className="w-5 h-5 mr-1 text-sky-500" />
                  {user.balance} جنيه
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 border border-sky-200 hover:shadow-lg transition"
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    <User className="w-6 h-6 text-sky-500" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-3 px-2 border border-gray-100 z-50">
                      <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-sky-50 rounded-lg text-base font-medium">
                        <Home className="w-5 h-5 ml-2 text-sky-500" />
                        الصفحة الرئيسية
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <div className="px-4 py-2 text-gray-600 text-sm text-center">
                        أهلاً {user.first_name} {user.last_name}
                      </div>
                      <Link to="/forum" className="flex items-center px-4 py-2 text-gray-700 hover:bg-sky-50 rounded-lg text-base font-medium">
                        <Users className="w-5 h-5 ml-2 text-sky-500" />
                        منتدى الطلبة
                      </Link>
                      <Link to="/charge-code" className="flex items-center px-4 py-2 text-gray-700 hover:bg-sky-50 rounded-lg text-base font-medium">
                        <CreditCard className="w-5 h-5 ml-2 text-sky-500" />
                        شحن كود سنتر
                      </Link>
                      <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-sky-50 rounded-lg text-base font-medium">
                        <User className="w-5 h-5 ml-2 text-sky-500" />
                        حسابي
                      </Link>
                      <Link to="/wallet" className="flex items-center px-4 py-2 text-gray-700 hover:bg-sky-50 rounded-lg text-base font-medium">
                        <Wallet className="w-5 h-5 ml-2 text-sky-500" />
                        محفظتي
                      </Link>
                      <Link to="/subscriptions" className="flex items-center px-4 py-2 text-gray-700 hover:bg-sky-50 rounded-lg text-base font-medium">
                        <BookOpen className="w-5 h-5 ml-2 text-sky-500" />
                        إشتراكاتي
                      </Link>
                      <Link to="/store" className="flex items-center px-4 py-2 text-gray-700 hover:bg-sky-50 rounded-lg text-base font-medium">
                        <ShoppingCart className="w-5 h-5 ml-2 text-sky-500" />
                        منافذ بيع الكتب و الأكواد
                      </Link>
                      <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-base font-medium mt-2">
                        <LogOut className="w-5 h-5 ml-2 text-red-500" />
                        تسجيل خروج
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1 bg-white shadow rounded-lg px-4 py-2 text-sm font-bold"
                  style={{ minWidth: '120px', justifyContent: 'center', border: 'none' }}
                >
                  <span style={{ color: '#b8860b' }}>سجل دخولك</span>
                  <Accessibility className="w-4 h-4" style={{ color: '#b8860b' }} />
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg px-5 py-2 text-sm transition shadow"
                  style={{ minWidth: '140px', justifyContent: 'center' }}
                >
                  <span>اعمل حساب جديد!</span>
                  <PlusSquare className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-3 text-sm font-medium rounded-lg ${
                  isScrolled
                    ? 'text-gray-600 hover:text-sky-500 hover:bg-sky-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/grades"
                className={`px-4 py-3 text-sm font-medium rounded-lg ${
                  isScrolled
                    ? 'text-gray-600 hover:text-sky-500 hover:bg-sky-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                المراحل الدراسية
              </Link>
              <Link
                to="/about"
                className={`px-4 py-3 text-sm font-medium rounded-lg ${
                  isScrolled
                    ? 'text-gray-600 hover:text-sky-500 hover:bg-sky-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                عن المنصة
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-3 text-sm font-medium rounded-lg ${
                  isScrolled
                    ? 'text-gray-600 hover:text-sky-500 hover:bg-sky-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل معنا
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}