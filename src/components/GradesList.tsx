import { useNavigate } from 'react-router-dom';
import { grades } from '../data';
import GradeCard from './GradeCard';
import { Grade } from '../types';
import { BookOpen, Users, Star, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function GradesList() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGradeClick = (grade: Grade) => {
    navigate(`/grade/${grade.id}`);
  };

  const stats = [
    { 
      icon: <BookOpen className="w-10 h-10 text-sky-500" />, 
      value: '+30', 
      label: 'مادة دراسية',
      description: 'مواد دراسية متنوعة تغطي جميع المناهج'
    },
    { 
      icon: <Users className="w-10 h-10 text-purple-500" />, 
      value: '+50', 
      label: 'معلم متميز',
      description: 'نخبة من أفضل المعلمين ذوي الخبرة في التدريس'
    },
    { 
      icon: <Star className="w-10 h-10 text-yellow-500" />, 
      value: '4.9', 
      label: 'تقييم الطلاب',
      description: 'متوسط تقييم الطلاب لجودة المحتوى التعليمي'
    }
  ];

  return (
    <div id="grades-section" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-lg bg-sky-100 text-sky-600 text-lg font-medium mb-4">
            المراحل الدراسية
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">اختر المرحلة الدراسية</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف المناهج الدراسية المتكاملة لكل صف مع نخبة من أفضل المدرسين وأحدث طرق التعليم
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="modern-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start">
                <div className="bg-gray-50 p-4 rounded-xl mr-6">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                  <p className="text-gray-600">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">جميع الصفوف الدراسية</h3>
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
          >
            <Filter className="w-5 h-5 text-gray-600 ml-2" />
            <span className="text-gray-700">تصفية</span>
          </button>
        </div>

        {filterOpen && (
          <div className="max-w-7xl mx-auto mb-8 bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المرحلة الدراسية</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="">جميع المراحل</option>
                  <option value="1">الصف الأول الثانوي</option>
                  <option value="2">الصف الثاني الثانوي</option>
                  <option value="3">الصف الثالث الثانوي</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المواد الدراسية</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="">جميع المواد</option>
                  <option value="arabic">اللغة العربية</option>
                  <option value="english">اللغة الإنجليزية</option>
                  <option value="math">الرياضيات</option>
                  <option value="science">العلوم</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="popular">الأكثر شعبية</option>
                  <option value="newest">الأحدث</option>
                  <option value="rating">التقييم</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          {grades.map((grade, index) => (
            <GradeCard
              key={grade.id}
              grade={grade}
              onClick={handleGradeClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}