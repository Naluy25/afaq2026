import React, { useEffect, useState } from 'react';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setSubscriptions(user.subscriptions || []);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-8" dir="rtl">
      <div className="flex-1">
        <div className="max-w-2xl bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">إشتراكاتي</h2>
          {subscriptions.length === 0 ? (
            <div className="text-gray-500 text-center py-8">لا يوجد لديك اشتراكات بعد.</div>
          ) : (
            <ul className="space-y-4">
              {subscriptions.map((course, idx) => (
                <li key={idx} className="border-b pb-4">
                  <div className="font-bold text-lg text-sky-700">{course.name}</div>
                  <div className="text-gray-600">{course.teacher}</div>
                  <div className="text-gray-500 text-sm">تاريخ الاشتراك: {course.date}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 