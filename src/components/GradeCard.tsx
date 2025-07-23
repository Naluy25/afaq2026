import { Grade } from '../types';
import { ArrowLeft, BookOpen, Users } from 'lucide-react';

interface GradeCardProps {
  grade: Grade;
  onClick: (grade: Grade) => void;
}

export default function GradeCard({ grade, onClick }: GradeCardProps) {
  return (
    <div 
      className="group modern-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
      onClick={() => onClick(grade)}
    >
      <div className="relative">
        <img 
          src={grade.image} 
          alt={grade.name} 
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute bottom-6 right-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{grade.name}</h3>
          <div className="flex items-center text-sm text-gray-200">
            <Users className="w-4 h-4 ml-1" />
            <span>+1000 طالب مسجل</span>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-sky-50 text-sky-600 px-3 py-1 rounded-lg text-sm font-medium">
            {grade.subjects.length} مواد دراسية
          </div>
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">
            متاح الآن
          </div>
        </div>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          اكتشف المناهج الدراسية المتكاملة للصف {grade.name} مع أفضل المدرسين
        </p>
        <div className="flex items-center text-sky-500 font-semibold group-hover:text-orange-500 transition-colors">
          <span className="text-lg">استكشف المواد</span>
          <ArrowLeft className="w-6 h-6 mr-3 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  );
}