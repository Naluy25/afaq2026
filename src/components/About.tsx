import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <GraduationCap className="w-12 h-12 text-sky-500" />,
      title: 'تعليم متميز',
      description: 'نقدم أفضل المناهج التعليمية بأحدث الطرق وأكثرها فعالية'
    },
    {
      icon: <Award className="w-12 h-12 text-orange-500" />,
      title: 'معلمون محترفون',
      description: 'نخبة من أفضل المعلمين ذوي الخبرة في التدريس'
    },
    {
      icon: <BookOpen className="w-12 h-12 text-green-500" />,
      title: 'محتوى متكامل',
      description: 'شرح شامل للمناهج مع تدريبات وامتحانات دورية'
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: 'دعم مستمر',
      description: 'فريق دعم فني متكامل لمساعدتك في أي وقت'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">عن منصة آفاق أكاديمي</h1>
          <p className="text-xl text-gray-600">
            منصة تعليمية رائدة تهدف إلى تقديم تجربة تعليمية فريدة ومتكاملة لطلاب المرحلة الثانوية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">رؤيتنا</h2>
              <p className="text-gray-600 mb-6">
                نسعى لأن نكون المنصة التعليمية الرائدة في الوطن العربي، نقدم تعليماً عالي الجودة يساعد الطلاب على التفوق والنجاح.
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">رسالتنا</h2>
              <p className="text-gray-600">
                توفير بيئة تعليمية متكاملة تجمع بين التكنولوجيا الحديثة وأفضل أساليب التدريس، لمساعدة طلابنا على تحقيق أهدافهم التعليمية.
              </p>
            </div>
            <div className="relative h-96 lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                alt="طلاب يدرسون"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}