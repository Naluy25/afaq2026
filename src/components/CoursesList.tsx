import { useParams, useNavigate } from 'react-router-dom';
import { grades } from '../data';
import { Course } from '../types';
import { Book, ArrowLeft, Clock, Users, Star, Play, Download, CheckCircle, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CoursesList() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // SEO Optimization
  useEffect(() => {
    let subject;
    for (const grade of grades) {
      subject = grade.subjects.find(s => s.id === subjectId);
      if (subject) break;
    }
    if (subject) {
      document.title = `${subject.name} | آفاق أكاديمي`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `اكتشف كورسات ${subject.name} المتميزة مع نخبة من أفضل المدرسين. دورات تعليمية شاملة ومتكاملة.`);
      }
    }
    
    setIsVisible(true);
  }, [subjectId]);

  // Find the subject
  let subject;
  for (const grade of grades) {
    subject = grade.subjects.find(s => s.id === subjectId);
    if (subject) break;
  }
  
  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">عذراً</h2>
          <p className="text-gray-600">لم يتم العثور على هذه المادة</p>
        </div>
      </div>
    );
  }

  const handleCourseClick = (course: Course) => {
    navigate(`/course/${course.id}`);
  };

  const features = [
    { icon: <Play className="w-6 h-6" />, text: 'فيديوهات تعليمية عالية الجودة' },
    { icon: <Download className="w-6 h-6" />, text: 'مذكرات وملخصات قابلة للتحميل' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'اختبارات وتدريبات مستمرة' }
  ];

  const filteredCourses = subject.courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel ? course.level === selectedLevel : true;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className={`bg-gradient-to-r from-sky-500 to-sky-600 rounded-3xl shadow-xl overflow-hidden mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative p-8 md:p-12">
            <div className="absolute inset-0 opacity-10">
              <div className="hero-pattern absolute inset-0"></div>
            </div>
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center mb-8 md:mb-12">
                <div className="bg-white/10 p-4 rounded-xl mb-6 md:mb-0 md:mr-8">
                  <Book className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {subject.name}
                  </h1>
                  <p className="text-lg md:text-xl text-sky-100 max-w-2xl">
                    اختر الكورس المناسب لمستواك في مادة {subject.name} مع نخبة من أفضل المدرسين
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-all">
                  <Users className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">+1000</div>
                  <div className="text-sky-100">طالب مسجل</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-all">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">4.9</div>
                  <div className="text-sky-100">تقييم الطلاب</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transform hover:scale-105 transition-all">
                  <Book className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{subject.courses.length}</div>
                  <div className="text-sky-100">كورس متاح</div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white/5 backdrop-blur-md rounded-xl p-4">
                    <div className="bg-white/10 p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="text-white mr-3">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`max-w-7xl mx-auto mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="ابحث عن كورس..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
                <Search className="absolute top-3.5 right-4 w-5 h-5 text-gray-400" />
              </div>
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center justify-center space-x-2 bg-sky-50 text-sky-600 px-6 py-3 rounded-xl hover:bg-sky-100 transition-all"
              >
                <SlidersHorizontal className="w-5 h-5 ml-2" />
                <span>خيارات التصفية</span>
              </button>
            </div>

            {filterOpen && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المستوى</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      <option value="">جميع المستويات</option>
                      <option value="beginner">مبتدئ</option>
                      <option value="intermediate">متوسط</option>
                      <option value="advanced">متقدم</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المدة</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                      <option value="">جميع المدد</option>
                      <option value="short">أقل من 10 ساعات</option>
                      <option value="medium">10-20 ساعة</option>
                      <option value="long">أكثر من 20 ساعة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                      <option value="popular">الأكثر شعبية</option>
                      <option value="newest">الأحدث</option>
                      <option value="price-low">السعر: من الأقل للأعلى</option>
                      <option value="price-high">السعر: من الأعلى للأقل</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => setSelectedLevel('')}
                    className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors mr-4"
                  >
                    إعادة ضبط
                  </button>
                  <button className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors">
                    تطبيق الفلتر
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="group modern-card bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleCourseClick(course)}
              >
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md ${
                      course.level === 'beginner' ? 'bg-green-400/20 text-green-400' :
                      course.level === 'intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-red-400/20 text-red-400'
                    }`}>
                      {course.level === 'beginner' ? 'مبتدئ' :
                       course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <h3 className="text-xl font-bold text-white mb-2">{course.name}</h3>
                      <div className="flex items-center justify-between text-white/90 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 ml-1" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 ml-1" />
                          <span>+500 طالب</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 ml-1 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-lg leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sky-500 font-semibold group-hover:text-orange-500 transition-colors">
                      <span>عرض التفاصيل</span>
                      <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="text-xl font-bold text-sky-500">
                      {course.price} جنيه
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 inline-flex p-6 rounded-full mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-gray-600">
              لم نتمكن من العثور على أي كورسات تطابق بحثك. يرجى تجربة كلمات بحث أخرى أو تغيير معايير التصفية.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}