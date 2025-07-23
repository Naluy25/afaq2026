import { Facebook, Youtube, Twitter, Linkedin, Users, BookOpen, Star } from 'lucide-react';
import { Teacher } from '../types';

interface TeacherProfileProps {
  teacher: Teacher;
}

export default function TeacherProfile({ teacher }: TeacherProfileProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-20 h-20 rounded-full border-4 border-sky-100"
        />
        <div className="mr-4">
          <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
          <p className="text-gray-600">{teacher.specialization}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="font-bold text-gray-800">{teacher.rating}</div>
          <div className="text-sm text-gray-500">التقييم</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-sky-500" />
          </div>
          <div className="font-bold text-gray-800">{teacher.studentsCount}+</div>
          <div className="text-sm text-gray-500">طالب</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <BookOpen className="w-5 h-5 text-green-500" />
          </div>
          <div className="font-bold text-gray-800">{teacher.coursesCount}</div>
          <div className="text-sm text-gray-500">كورس</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">نبذة عن المدرس</h4>
        <p className="text-gray-600">{teacher.bio}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">الخبرات</h4>
        <p className="text-gray-600">خبرة في التدريس لمدة {teacher.experience}</p>
      </div>

      {teacher.socialLinks && (
        <div className="flex space-x-3">
          {teacher.socialLinks.facebook && (
            <a
              href={teacher.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          )}
          {teacher.socialLinks.youtube && (
            <a
              href={teacher.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
          )}
          {teacher.socialLinks.twitter && (
            <a
              href={teacher.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-lg hover:bg-sky-50 hover:text-sky-500 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {teacher.socialLinks.linkedin && (
            <a
              href={teacher.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}