import React, { useEffect, useState } from 'react';
import { User2 } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div className="text-center py-16 text-gray-500">لا يوجد بيانات مستخدم.</div>;
  }

  // إحصائيات الكورسات
  const subscriptions = user.subscriptions || [];
  const tests = user.tests || [];
  const homeworks = user.homeworks || [];
  const videosWatched = user.videosWatched || 0;
  const totalVideos = user.totalVideos || 0;
  const lecturesTime = user.lecturesTime || 0;

  // حساب النسب
  const watchedPercent = totalVideos > 0 ? Math.round((videosWatched / totalVideos) * 100) : 0;
  const testsCount = tests.length;
  const homeworksCount = homeworks.length;
  const avgTestResult = testsCount > 0 ? Math.round(tests.reduce((acc: number, t: any) => acc + (t.result || 0), 0) / testsCount) : 0;
  const notStartedPercent = totalVideos > 0 ? Math.round(((totalVideos - videosWatched) / totalVideos) * 100) : 0;
  const fastStartPercent = testsCount > 0 ? Math.round((tests.filter((t: any) => t.result > 80).length / testsCount) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-8 px-2 md:px-8" dir="rtl">
      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow p-8 flex flex-col items-center md:items-start min-h-[80vh]">
        {/* بيانات المستخدم */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-start">
            <div className="bg-gray-100 rounded-xl flex items-center justify-center p-6" style={{minWidth: 140, minHeight: 140}}>
              <User2 className="w-28 h-28 text-black" />
            </div>
            <div className="flex flex-col gap-2 text-center md:text-right">
              <div className="text-2xl font-bold text-gray-800">{user.first_name} {user.last_name}</div>
              <div className="text-gray-700 text-lg flex items-center gap-2 justify-center md:justify-start">
                <span className="inline-block">{user.phone}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.45h12.2a1 1 0 00.9-1.45L17 13M7 13V6h10v7" /></svg>
              </div>
              <div className="text-gray-700 text-lg flex items-center gap-2 justify-center md:justify-start">
                <span className="inline-block">{user.email}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1" /></svg>
              </div>
            </div>
          </div>
        </div>
        {/* زر استعلام الرصيد */}
        <div className="w-full flex justify-center mb-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow">
            استعلم من هنا عن الرصيد الخاص بك بعد شحن الكود
          </button>
        </div>
        {/* إحصائيات كورساتك */}
        <div className="w-full border-t-2 border-blue-100 my-8 pt-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            <span className="text-cyan-400 mx-2">★</span>
            <span className="text-pink-500">احصائيات كورساتك</span>
            <span className="text-cyan-400 mx-2">★</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {/* متوسط النتائج */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-gray-200" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                  <path className="text-purple-500" d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831`} fill="none" strokeWidth="3" strokeDasharray={`${avgTestResult},100`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-purple-600">{avgTestResult}%</span>
              </div>
              <div className="text-sm font-bold">في أحسن!</div>
              <div className="text-xs text-gray-500">متوسط النتائج اللي جبتها</div>
            </div>
            {/* نسبة الاختبارات السريعة */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-gray-200" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                  <path className="text-cyan-500" d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831`} fill="none" strokeWidth="3" strokeDasharray={`${fastStartPercent},100`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-cyan-600">{fastStartPercent}%</span>
              </div>
              <div className="text-sm font-bold">ابدأ بسرعة!</div>
              <div className="text-xs text-gray-500">عدد الاختبارات اللي خلصتها</div>
              <div className="text-xs text-cyan-700 mt-1">{testsCount} اختبارات</div>
            </div>
            {/* نسبة لم يبدأ */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-gray-200" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                  <path className="text-pink-500" d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831`} fill="none" strokeWidth="3" strokeDasharray={`${notStartedPercent},100`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-pink-600">{notStartedPercent}%</span>
              </div>
              <div className="text-sm font-bold">بلا بداية!</div>
              <div className="text-xs text-gray-500">عدد الفيديوهات شوفنها</div>
              <div className="text-xs text-pink-700 mt-1">{videosWatched} من {totalVideos}</div>
            </div>
          </div>
        </div>
        {/* إحصائيات عامة على المنصة */}
        <div className="w-full border-t-2 border-blue-100 my-8 pt-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            <span className="text-cyan-400 mx-2">★</span>
            <span className="text-pink-500">احصائياتك على المنصة</span>
            <span className="text-cyan-400 mx-2">★</span>
          </h3>
          <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <span className="bg-pink-200 text-pink-700 px-4 py-1 rounded-full font-bold text-lg">{lecturesTime ? `${lecturesTime} ساعة` : 'لا يوجد بيانات'}</span>
              <span className="font-bold">إجمالي مدة فتح المحاضرات على الموقع</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-bold text-lg">{videosWatched ? `${videosWatched} مرة` : 'لا يوجد بيانات'}</span>
              <span className="font-bold">إجمالي عدد مرات مشاهدة الفيديوهات على الموقع</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full font-bold text-lg">{testsCount ? `${testsCount} مرات` : 'لا يوجد بيانات'}</span>
              <span className="font-bold">إجمالي عدد مرات فتح الاختبار</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-bold text-lg">{homeworksCount ? `${homeworksCount} مرات` : 'لا يوجد بيانات'}</span>
              <span className="font-bold">إجمالي عدد مرات إنهاء الاختبارات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 