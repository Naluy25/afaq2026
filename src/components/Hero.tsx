import { GraduationCap, BookOpen, Users, Trophy, CheckCircle, Star, Clock, ArrowRight, Sparkles, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: <BookOpen className="w-8 h-8" />, value: '+1000', label: 'درس تعليمي' },
    { icon: <Users className="w-8 h-8" />, value: '+5000', label: 'طالب مسجل' },
    { icon: <Trophy className="w-8 h-8" />, value: '+50', label: 'معلم متميز' },
  ];

  const features = [
    {
      icon: <GraduationCap className="w-12 h-12 text-sky-500" />,
      title: 'تعليم متميز',
      description: 'نقدم أفضل المناهج التعليمية بأحدث الطرق وأكثرها فعالية'
    },
    {
      icon: <Star className="w-12 h-12 text-orange-500" />,
      title: 'معلمون محترفون',
      description: 'نخبة من أفضل المعلمين ذوي الخبرة في التدريس'
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      title: 'محتوى متكامل',
      description: 'شرح شامل للمناهج مع تدريبات وامتحانات دورية'
    },
    {
      icon: <Clock className="w-12 h-12 text-purple-500" />,
      title: 'دعم مستمر',
      description: 'فريق دعم فني متكامل لمساعدتك في أي وقت'
    }
  ];

  const scrollToGrades = () => {
    document.getElementById('grades-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-sky-600 via-sky-700 to-orange-500 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
          
          {/* Animated Circles */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-sky-400/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          
          {/* Particle Effect */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, index) => (
              <div 
                key={index}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse-slow"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className={`relative container mx-auto px-6 pt-40 pb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg animate-float">
                <GraduationCap className="w-16 h-16" />
              </div>
            </div>
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="block text-white mb-4">مرحباً بك في</span>
                <span className="relative">
                  <span className="text-orange-400">آفاق أكاديمي</span>
                  <Sparkles className="absolute -top-8 -right-8 w-8 h-8 text-yellow-300 animate-pulse-slow" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
                منصة تعليمية متكاملة للمرحلة الثانوية تقدم أفضل المناهج التعليمية
                بأحدث الطرق وأكثرها فعالية
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={scrollToGrades}
                className="group bg-white text-sky-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sky-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  ابدأ رحلة التعلم
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <a 
                href="#why-us"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  تعرف على المزيد
                  <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white/20 border border-white/20 shadow-lg"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-400/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
            <defs>
              <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="moving-waves">
              <use href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
              <use href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use href="#wave" x="48" y="7" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div id="why-us" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-lg bg-sky-100 text-sky-600 text-lg font-medium mb-4">
              لماذا آفاق أكاديمي؟
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">تجربة تعليمية فريدة</h2>
            <p className="text-xl text-gray-600">
              نقدم تجربة تعليمية متكاملة لطلاب المرحلة الثانوية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group modern-card bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-500 modern-card">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16">
                <div className="flex items-center mb-6">
                  <div className="bg-sky-50 p-3 rounded-xl">
                    <BookMarked className="w-8 h-8 text-sky-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mr-4">رؤيتنا ورسالتنا</h2>
                </div>
                <div className="mb-8 border-r-4 border-sky-500 pr-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">رؤيتنا</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    نسعى لأن نكون المنصة التعليمية الرائدة في الوطن العربي، نقدم تعليماً عالي الجودة يساعد الطلاب على التفوق والنجاح.
                  </p>
                </div>
                <div className="border-r-4 border-orange-500 pr-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">رسالتنا</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    توفير بيئة تعليمية متكاملة تجمع بين التكنولوجيا الحديثة وأفضل أساليب التدريس، لمساعدة طلابنا على تحقيق أهدافهم التعليمية.
                  </p>
                </div>
              </div>
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                  alt="طلاب يدرسون"
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-br from-sky-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-lg bg-orange-100 text-orange-600 text-lg font-medium mb-4">
              آراء طلابنا
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">ماذا يقول طلابنا عنا</h2>
            <p className="text-xl text-gray-600">
              نفخر بآراء طلابنا ونسعى دائماً لتقديم أفضل تجربة تعليمية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "أحمد محمد",
                role: "طالب الصف الثالث الثانوي",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                quote: "ساعدتني منصة آفاق أكاديمي على فهم المواد الدراسية بشكل أفضل وتحسين درجاتي بشكل ملحوظ."
              },
              {
                name: "سارة أحمد",
                role: "طالبة الصف الثاني الثانوي",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                quote: "المدرسون متميزون والشرح واضح وسهل الفهم. أنصح جميع الطلاب بالتسجيل في المنصة."
              },
              {
                name: "محمود علي",
                role: "طالب الصف الأول الثانوي",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                quote: "الاختبارات والتدريبات ساعدتني على تحديد نقاط ضعفي وتقويتها. شكراً آفاق أكاديمي!"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 modern-card"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-sky-100"
                  />
                  <div className="mr-4">
                    <h4 className="text-xl font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex mt-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}