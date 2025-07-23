import { Subject } from '../types';
import { Book, ArrowLeft, Users, Star } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
}

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  return (
    <div 
      className="group modern-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
      onClick={() => onClick(subject)}
    >
      <div className="relative">
        <img 
          src={subject.image} 
          alt={subject.name} 
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl">
            <Book className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 left-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
            <h3 className="text-2xl font-bold text-white mb-2">{subject.name}</h3>
            <div className="flex items-center justify-between text-white/90 text-sm">
              <div className="flex items-center">
                <Users className="w-4 h-4 ml-1" />
                <span>+500 طالب</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 ml-1 text-yellow-400" />
                <span>4.8</span>
              </div>
              <div className="flex items-center">
                <Book className="w-4 h-4 ml-1" />
                <span>{subject.courses.length} كورسات</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-sky-50 text-sky-600 px-3 py-1 rounded-lg text-sm font-medium">
            {subject.courses.length} كورسات
          </div>
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">
            متاح الآن
          </div>
        </div>
        <p className="text-gray-600 mb-4 text-lg leading-relaxed line-clamp-2">
          اكتشف محتوى مادة {subject.name} مع أفضل المدرسين وأحدث طرق التعليم
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sky-500 font-semibold group-hover:text-orange-500 transition-colors">
            <span>تصفح الكورسات</span>
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}