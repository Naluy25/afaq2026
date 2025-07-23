import { useState } from 'react';
import { Lecture } from '../types';
import { PlayCircle, FileText, CheckSquare, Download, ChevronDown, ChevronUp, Clock, Heart, BookOpen, Star } from 'lucide-react';

interface CourseContentProps {
  lectures: Lecture[];
}

export default function CourseContent({ lectures }: CourseContentProps) {
  const [activeLecture, setActiveLecture] = useState<number | null>(null);
  const [activeContent, setActiveContent] = useState<'video' | 'quiz' | 'homework' | null>(null);
  const [likedLectures, setLikedLectures] = useState<number[]>([]);

  const handleLectureClick = (lectureId: number) => {
    setActiveLecture(activeLecture === lectureId ? null : lectureId);
    setActiveContent(null);
  };

  const handleLikeClick = (lectureId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedLectures(prev => 
      prev.includes(lectureId) 
        ? prev.filter(id => id !== lectureId)
        : [...prev, lectureId]
    );
  };

  const renderContent = (lecture: Lecture) => {
    if (!lecture) return null;

    switch (activeContent) {
      case 'video':
        if (lecture.videoUrl) {
          const videoId = lecture.videoUrl.split('v=')[1];
          return (
            <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </div>
          );
        }
        break;

      case 'quiz':
      case 'homework':
        const url = activeContent === 'quiz' ? lecture.quizUrl : lecture.homeworkUrl;
        if (url) {
          return (
            <div className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src={url}
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
              >
                جاري تحميل النموذج...
              </iframe>
            </div>
          );
        }
        break;
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-sky-50 p-3 rounded-xl">
            <BookOpen className="w-6 h-6 text-sky-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">محتوى الكورس</h2>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>12 ساعة تعليمية</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.9 تقييم</span>
          </div>
        </div>
      </div>

      {lectures.map((lecture, index) => (
        <div 
          key={lecture.id} 
          className={`bg-white rounded-2xl transition-all duration-300 ${
            activeLecture === lecture.id ? 'shadow-lg' : 'hover:shadow-md'
          }`}
        >
          <button 
            className={`w-full p-6 text-right cursor-pointer transition-colors relative overflow-hidden group ${
              activeLecture === lecture.id ? 'bg-red-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleLectureClick(lecture.id)}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl text-gray-500 font-semibold">
                  {index + 1}
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">{lecture.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 ml-1" />
                      <span>{lecture.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 ml-1" />
                      <span>{lecture.filesCount} ملفات</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleLikeClick(lecture.id, e)}
                  className={`p-2 rounded-full transition-colors ${
                    likedLectures.includes(lecture.id) 
                      ? 'bg-red-100 text-red-500' 
                      : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedLectures.includes(lecture.id) ? 'fill-current' : ''}`} />
                </button>
                {activeLecture === lecture.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          </button>

          {activeLecture === lecture.id && (
            <div className="p-6 border-t border-gray-100">
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{lecture.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {lecture.videoUrl && (
                  <button 
                    onClick={() => setActiveContent(activeContent === 'video' ? null : 'video')}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                      activeContent === 'video' 
                        ? 'bg-red-50 border-2 border-red-500 shadow-lg' 
                        : 'bg-white border-2 border-gray-100 hover:border-red-500 hover:bg-red-50'
                    }`}
                  >
                    <PlayCircle className={`w-6 h-6 ${activeContent === 'video' ? 'text-red-500' : 'text-gray-500'}`} />
                    <span className={`mr-3 font-medium ${activeContent === 'video' ? 'text-red-700' : 'text-gray-700'}`}>
                      مشاهدة المحاضرة
                    </span>
                  </button>
                )}
                {lecture.quizUrl && (
                  <button
                    onClick={() => setActiveContent(activeContent === 'quiz' ? null : 'quiz')}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                      activeContent === 'quiz' 
                        ? 'bg-green-50 border-2 border-green-500 shadow-lg' 
                        : 'bg-white border-2 border-gray-100 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    <CheckSquare className={`w-6 h-6 ${activeContent === 'quiz' ? 'text-green-500' : 'text-gray-500'}`} />
                    <span className={`mr-3 font-medium ${activeContent === 'quiz' ? 'text-green-700' : 'text-gray-700'}`}>
                      اختبار المحاضرة
                    </span>
                  </button>
                )}
                {lecture.homeworkUrl && (
                  <button
                    onClick={() => setActiveContent(activeContent === 'homework' ? null : 'homework')}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                      activeContent === 'homework' 
                        ? 'bg-orange-50 border-2 border-orange-500 shadow-lg' 
                        : 'bg-white border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    <FileText className={`w-6 h-6 ${activeContent === 'homework' ? 'text-orange-500' : 'text-gray-500'}`} />
                    <span className={`mr-3 font-medium ${activeContent === 'homework' ? 'text-orange-700' : 'text-gray-700'}`}>
                      الواجب المنزلي
                    </span>
                  </button>
                )}
                {lecture.downloadUrl && (
                  <a 
                    href={lecture.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
                  >
                    <Download className="w-6 h-6 text-gray-500 group-hover:text-purple-500" />
                    <span className="text-gray-700 mr-3 font-medium">ملفات إضافية</span>
                  </a>
                )}
              </div>
              {renderContent(lecture)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}