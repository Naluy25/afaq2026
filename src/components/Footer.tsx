import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-sky-500 text-white shadow-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-110"
          aria-label="العودة إلى الأعلى"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">اشترك في نشرتنا البريدية</h3>
            <p className="text-sky-100 mb-8">
              احصل على آخر الأخبار والتحديثات عن المنصة والكورسات الجديدة
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني" 
                className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                type="submit"
                className="bg-white text-sky-600 px-6 py-4 rounded-xl font-semibold hover:bg-sky-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Mail className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold mr-3">آفاق أكاديمي</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                منصة تعليمية رائدة تقدم أفضل المناهج التعليمية للمرحلة الثانوية بأحدث الطرق وأكثرها فعالية
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-sky-500/20 transition-colors">
                  <Facebook className="w-5 h-5 text-sky-400" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-sky-500/20 transition-colors">
                  <Instagram className="w-5 h-5 text-sky-400" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-sky-500/20 transition-colors">
                  <Twitter className="w-5 h-5 text-sky-400" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-sky-500/20 transition-colors">
                  <Youtube className="w-5 h-5 text-sky-400" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">روابط سريعة</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-sky-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full inline-block ml-2"></span>
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-sky-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full inline-block ml-2"></span>
                    عن المنصة
                  </Link>
                </li>
                <li>
                  <Link to="/grades" className="text-gray-400 hover:text-sky-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full inline-block ml-2"></span>
                    المراحل الدراسية
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-sky-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full inline-block ml-2"></span>
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">المراحل الدراسية</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/grade/1" className="text-gray-400 hover:text-sky-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full inline-block ml-2"></span>
                    الصف الأول الثانوي
                  </Link>
                </li>
                <li>
                  <Link to="/grade/2" className="text-gray-400 hover:text-sky-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full inline-block ml-2"></span>
                    الصف الثاني الثانوي
                  </Link>
                </li>
                <li>
                  <Link to="/grade/3" className="text-gray-400 hover:text-sky-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-sky-500 rounded-full inline-block ml-2"></span>
                    الصف الثالث الثانوي
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">تواصل معنا</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-sky-400 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-400">01011342972</span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-sky-400 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-400">support@afaq-academy.com</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-sky-400 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-400">المملكة العربية السعودية، الرياض - شارع الملك فهد</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                <span>جميع الحقوق محفوظة © {currentYear} آفاق أكاديمي</span>
              </p>
              <div>
                <p className="text-gray-500">
                  <span>تم التطوير بواسطة </span>
                  <a 
                    href="https://www.facebook.com/profile.php?id=100079615578194" 
                    className="text-sky-400 hover:text-sky-300"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Luffy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}