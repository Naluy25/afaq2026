import { useParams, useNavigate } from 'react-router-dom';
import { grades } from '../data';
import { Subject } from '../types';
import SubjectCard from './SubjectCard';
import { Book, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SubjectsList() {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const grade = grades.find(g => g.id === gradeId);
  
  if (!grade) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">عذراً</h2>
          <p className="text-gray-600">لم يتم العثور على هذا الصف</p>
        </div>
      </div>
    );
  }

  const handleSubjectClick = (subject: Subject) => {
    navigate(`/subject/${subject.id}`);
  };

  const filteredSubjects = grade.subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center bg-sky-100 text-sky-600 px-4 py-2 rounded-lg text-lg font-medium mb-4">
            <Book className="w-5 h-5 ml-2" />
            <span>المرحلة الدراسية</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{grade.name}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر المادة التي تريد دراستها من قائمة المواد المتاحة للصف {grade.name}
          </p>
        </div>

        {/* Search and Filter */}
        <div className={`max-w-7xl mx-auto mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="ابحث عن مادة..."
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">نوع المادة</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                      <option value="">جميع المواد</option>
                      <option value="main">مواد أساسية</option>
                      <option value="secondary">مواد ثانوية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الترم الدراسي</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                      <option value="">جميع الترمات</option>
                      <option value="term1">الترم الأول</option>
                      <option value="term2">الترم الثاني</option>
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
                <div className="flex justify-end mt-6">
                  <button className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors">
                    تطبيق الفلتر
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {filteredSubjects.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            {filteredSubjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={handleSubjectClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 inline-flex p-6 rounded-full mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-gray-600">
              لم نتمكن من العثور على أي مواد تطابق بحثك. يرجى تجربة كلمات بحث أخرى.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}