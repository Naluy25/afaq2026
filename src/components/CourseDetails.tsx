import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { Clock, Users, Star, Shield, Award, BookOpen, Zap, X, Calendar, BookMarked, MessageCircle, Share2, Heart, Bookmark } from 'lucide-react';
import { grades } from '../data';
import TeacherProfile from './TeacherProfile';
import CourseContent from './CourseContent';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // SEO Optimization
    if (course) {
      document.title = `${course.name} | آفاق أكاديمي`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${course.description} - تعلم مع أفضل المدرسين في منصة آفاق أكاديمي.`);
      }
    }
  }, [courseId]);

  // Find the course
  let course: Course | undefined;

  for (const grade of grades) {
    for (const subject of grade.subjects) {
      const foundCourse = subject.courses.find(c => c.id === courseId);
      if (foundCourse) {
        course = foundCourse;
        break;
      }
    }
    if (course) break;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">عذراً</h2>
          <p className="text-gray-600">لم يتم العثور على هذا الكورس</p>
        </div>
      </div>
    );
  }

  const courseFeatures = [
    { 
      icon: <Clock className="w-6 h-6 text-sky-500" />, 
      text: course.duration,
      description: 'مدة الكورس الكاملة'
    },
    { 
      icon: <Users className="w-6 h-6 text-purple-500" />, 
      text: '+500 طالب مسجل',
      description: 'عدد الطلاب المسجلين'
    },
    { 
      icon: <Star className="w-6 h-6 text-yellow-500" />, 
      text: 'تقييم 4.8 من 5',
      description: 'متوسط تقييم الطلاب'
    },
    { 
      icon: <Shield className="w-6 h-6 text-green-500" />, 
      text: 'ضمان استرداد الأموال',
      description: 'خلال 30 يوم من الشراء'
    }
  ];

  const highlights = [
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: 'شهادة معتمدة',
      description: 'احصل على شهادة إتمام معتمدة بعد إكمال الكورس'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      title: 'محتوى حصري',
      description: 'مواد تعليمية وتدريبات خاصة غير متوفرة في أي مكان آخر'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: 'تحديثات مستمرة',
      description: 'محتوى متجدد ومحدث باستمرار ليواكب آخر المستجدات'
    }
  ];

  const handleEnrollment = () => {
    setShowConfirmation(true);
  };

  const confirmEnrollment = () => {
    const message = encodeURIComponent(`مرحباً، أرغب في الاشتراك في كورس: ${course?.name}`);
    window.open(`https://wa.me/201011342972?text=${message}`, '_blank');
    setShowConfirmation(false);
  };

  const shareOptions = [
    { name: 'واتساب', url: `https://wa.me/?text=${encodeURIComponent(`تعلم مع أفضل المدرسين في منصة آفاق أكاديمي - ${course.name} ${window.location.href}`)}` },
    { name: 'فيسبوك', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
    { name: 'تويتر', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`تعلم مع أفضل المدرسين في منصة آفاق أكاديمي - ${course.name}`)}&url=${encodeURIComponent(window.location.href)}` },
    { name: 'نسخ الرابط', action: () => {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط بنجاح!');
      setShowShareOptions(false);
    }}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Course Header */}
          <div className={`bg-gradient-to-r from-sky-500 to-sky-600 rounded-3xl shadow-xl overflow-hidden mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative p-8 md:p-12">
              <div className="absolute inset-0 opacity-10">
                <div className="hero-pattern absolute inset-0"></div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md ${
                        course.level === 'beginner' ? 'bg-green-400/20 text-green-400' :
                        course.level === 'intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-red-400/20 text-red-400'
                      }`}>
                        {course.level === 'beginner' ? 'مبتدئ' :
                         course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                      </span>
                      <div className="flex mr-4 space-x-2">
                        <button 
                          onClick={() => setIsBookmarked(!isBookmarked)}
                          className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
                        </button>
                        <button 
                          onClick={() => setIsLiked(!isLiked)}
                          className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'text-red-400 fill-red-400' : 'text-white'}`} />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setShowShareOptions(!showShareOptions)}
                            className="p-1.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                          >
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                          
                          {showShareOptions && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg p-3 z-10 w-48">
                              <div className="py-1">
                                {shareOptions.map((option, index) => (
                                  <a
                                    key={index}
                                    href={option.url}
                                    onClick={(e) => {
                                      if (option.action) {
                                        e.preventDefault();
                                        option.action();
                                      }
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                  >
                                    {option.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{course.name}</h1>
                    <p className="text-xl text-sky-100 mb-8 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center mb-8">
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div className="mr-4">
                        <div className="text-white font-semibold">{course.instructor.name}</div>
                        <div className="text-sky-200 text-sm">{course.instructor.specialization}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={handleEnrollment}
                        className="bg-white text-sky-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sky-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group"
                      >
                        <span className="relative z-10">اشترك الآن</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
                      <button 
                        onClick={() => setShowPreview(true)}
                        className="bg-sky-400/20 text-white border border-white/30 backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sky-400/30 transition-all relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center">
                          عرض تجريبي مجاني
                        </span>
                        <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <img 
                      src={course.image}
                      alt={course.name}
                      className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Features */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            {courseFeatures.map((feature, index) => (
              <div 
                key={index}
                className="modern-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    {feature.icon}
                  </div>
                  <div className="mr-4">
                    <div className="text-xl font-bold text-gray-800">{feature.text}</div>
                    <div className="text-gray-500 text-sm">{feature.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Course Highlights */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="modern-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-gray-50 p-4 rounded-xl inline-block mb-6">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>

          {/* Teacher Profile */}
          <div className={`mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <TeacherProfile teacher={course.instructor} />
          </div>

          {/* Course Content */}
          <div className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="bg-sky-50 p-3 rounded-xl">
                  <BookMarked className="w-8 h-8 text-sky-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mr-4">محتوى الكورس</h2>
              </div>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-sky-500 ml-2" />
                  <span className="text-gray-700">تاريخ التحديث: 15 يونيو 2024</span>
                </div>
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-sky-500 ml-2" />
                  <span className="text-gray-700">دعم فني على مدار الساعة</span>
                </div>
              </div>
              
              <CourseContent lectures={course.lectures} />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 transform transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">تأكيد الاشتراك</h3>
            <p className="text-gray-600 mb-6">
              هل ترغب في الاشتراك بهذا الكورس والوصول إلى محتوى حصري؟
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmEnrollment}
                className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                تأكيد الاشتراك
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-4 w-full transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">عرض تجريبي للكورس</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/4qwnsWeF55E"
                title="عرض تجريبي"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowPreview(false);
                  handleEnrollment();
                }}
                className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-3 rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all"
              >
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}