import React, { useState } from 'react';

export default function ChargeCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  // الأكواد يجب أن تكون محفوظة في localStorage تحت "codesList"
  // مثال: [{code: 'ABC123', value: 100, used: false, maxUses: 1, usedBy: []}]

  const handleCharge = () => {
    const codesList = JSON.parse(localStorage.getItem('codesList') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const found = codesList.find((c: any) => c.code === code);
    if (!found) {
      setMessage('الكود غير صحيح');
      return;
    }
    if (found.maxUses && found.usedBy && found.usedBy.includes(user.phone)) {
      setMessage('لقد استخدمت هذا الكود من قبل');
      return;
    }
    if (found.maxUses && found.usedBy && found.usedBy.length >= found.maxUses) {
      setMessage('تم استخدام الكود للحد الأقصى');
      return;
    }
    // إضافة الرصيد
    user.balance = (user.balance || 0) + found.value;
    // سجل العملية في walletLog
    user.walletLog = user.walletLog || [];
    user.walletLog.push({ amount: found.value, date: new Date().toLocaleDateString(), admin: 'كود سنتر' });
    // تحديث المستخدم
    localStorage.setItem('user', JSON.stringify(user));
    // تحديث الكود
    found.usedBy = found.usedBy || [];
    found.usedBy.push(user.phone);
    localStorage.setItem('codesList', JSON.stringify(codesList));
    setMessage('تم شحن الكود بنجاح!');
    setCode('');
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-8" dir="rtl">
      <div className="flex-1">
        <div className="max-w-xl bg-white rounded-xl shadow p-8 mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">شحن كود سنتر</h2>
          <p className="mb-4 text-gray-600">اكتب الكود المكون من الأرقام/الحروف على كارت السنتر الخاص بك لشحنه في حسابك.</p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="flex-1 p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent text-lg"
              placeholder="كود السنتر الخاص بك"
            />
            <button
              onClick={handleCharge}
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-cyan-600 transition"
            >
              شحن الكود
            </button>
          </div>
          {message && <div className="mt-4 text-center text-lg text-blue-700 font-bold">{message}</div>}
        </div>
      </div>
    </div>
  );
} 