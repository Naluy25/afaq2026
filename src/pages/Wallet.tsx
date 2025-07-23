import React, { useEffect, useState } from 'react';

export default function Wallet() {
  const [walletLog, setWalletLog] = useState<any[]>([]);

  useEffect(() => {
    const updateWallet = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setWalletLog(user.walletLog || []);
      }
    };
    updateWallet();
    window.addEventListener('storage', updateWallet);
    return () => window.removeEventListener('storage', updateWallet);
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-8" dir="rtl">
      <div className="flex-1">
        <div className="max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">محفظتي</h2>
          {walletLog.length === 0 ? (
            <div className="text-gray-500 text-center py-8">لا يوجد عمليات إضافة أموال بعد.</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl">
              <table className="w-full text-right border-separate border-spacing-0">
                <thead>
                  <tr className="text-gray-700 bg-[#F7F9FA] text-base">
                    <th className="py-3 px-4 font-bold rounded-tr-2xl">التسلسل</th>
                    <th className="py-3 px-4 font-bold">المبلغ المتغير</th>
                    <th className="py-3 px-4 font-bold">الرصيد قبل التغيير</th>
                    <th className="py-3 px-4 font-bold">الرصيد بعد التغيير</th>
                    <th className="py-3 px-4 font-bold">ملاحظة</th>
                    <th className="py-3 px-4 font-bold">اسم الإداري</th>
                    <th className="py-3 px-4 font-bold rounded-tl-2xl">وقت الإنشاء</th>
                  </tr>
                </thead>
                <tbody>
                  {walletLog.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FA]'} style={{fontSize: '15px'}}>
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-green-600">{item.amount} جنيه</td>
                      <td className="py-3 px-4">{item.oldBalance} جنيه</td>
                      <td className="py-3 px-4">{item.newBalance} جنيه</td>
                      <td className="py-3 px-4">{item.note || '-'}</td>
                      <td className="py-3 px-4">{item.admin || '-'}</td>
                      <td className="py-3 px-4">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 