import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../database/db';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [amounts, setAmounts] = useState<{[key: number]: number}>({});
  const [notes, setNotes] = useState<{[key: number]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setCurrentUser(user);
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      setUsers(getAllUsers());
    }
  }, [navigate]);

  useEffect(() => {
    const updateUsers = () => {
      setUsers(getAllUsers());
    };
    window.addEventListener('storage', updateUsers);
    return () => window.removeEventListener('storage', updateUsers);
  }, []);

  const getFilteredUsers = () => {
    if (!search.trim()) return users;
    return users.filter(
      u =>
        (u.first_name && u.first_name.toLowerCase().includes(search.toLowerCase())) ||
        (u.last_name && u.last_name.toLowerCase().includes(search.toLowerCase())) ||
        (u.phone && u.phone.includes(search)) ||
        (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
    );
  };

  // إضافة أموال لحساب
  const handleAddMoney = (id: number) => {
    const amount = amounts[id];
    const note = notes[id] || '';
    if (!amount || isNaN(amount) || amount <= 0) return;
    const updatedUsers = users.map(u =>
      u.id === id ? { ...u, balance: (u.balance || 0) + amount } : u
    );
    setUsers(updatedUsers);
    // تحديث في localStorage
    const userList = JSON.parse(localStorage.getItem('afaq_database') || '{}');
    if (userList && Array.isArray(userList.users)) {
      const idx = userList.users.findIndex((u: any) => u.id === id);
      if (idx !== -1) {
        const user = userList.users[idx];
        const oldBalance = user.balance || 0;
        const newBalance = oldBalance + amount;
        user.balance = newBalance;
        // إضافة سجل العملية في walletLog
        user.walletLog = user.walletLog || [];
        user.walletLog.push({
          amount: amount,
          oldBalance: oldBalance,
          newBalance: newBalance,
          note: note,
          admin: currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : '',
          date: new Date().toLocaleString('ar-EG')
        });
        userList.users[idx] = user;
        localStorage.setItem('afaq_database', JSON.stringify(userList));
        // إذا كان المستخدم الحالي هو نفسه الذي تم تعديل رصيده، حدث بياناته في localStorage
        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (localUser.id === id) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        setSuccessMsg(`تم إضافة ${amount} جنيه بنجاح إلى ${user.first_name} ${user.last_name}`);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    }
    setAmounts({ ...amounts, [id]: 0 });
    setNotes({ ...notes, [id]: '' });
  };

  // تحميل الجدول كـ CSV
  const handleExportCSV = () => {
    const header = ['#', 'الاسم', 'الهاتف', 'البريد الإلكتروني', 'الرصيد', 'النوع', 'الصف الدراسي', 'المحافظة'];
    const rows = getFilteredUsers().map((user, idx) => [
      idx + 1,
      `${user.first_name} ${user.last_name}`,
      user.phone,
      user.email,
      user.balance,
      user.role === 'admin' ? 'مشرف' : 'طالب',
      user.grade,
      user.governorate
    ]);
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 mt-8 px-2 md:px-8" dir="rtl">
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[80vh]">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center justify-between">
          <span>لوحة تحكم المشرفين - إدارة الحسابات</span>
          <button onClick={handleExportCSV} className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-200 transition text-sm">تحميل كـ Excel</button>
        </h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="بحث بالاسم أو الهاتف أو البريد..."
            className="p-3 border-b-2 border-gray-200 focus:border-blue-400 outline-none bg-transparent text-lg flex-1"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-right border-separate border-spacing-0">
            <thead>
              <tr className="text-gray-700 bg-[#F7F9FA] text-base">
                <th className="py-3 px-4 font-bold rounded-tr-2xl">#</th>
                <th className="py-3 px-4 font-bold">الاسم</th>
                <th className="py-3 px-4 font-bold">الهاتف</th>
                <th className="py-3 px-4 font-bold">البريد الإلكتروني</th>
                <th className="py-3 px-4 font-bold">الرصيد</th>
                <th className="py-3 px-4 font-bold">النوع</th>
                <th className="py-3 px-4 font-bold">الصف الدراسي</th>
                <th className="py-3 px-4 font-bold">المحافظة</th>
                <th className="py-3 px-4 font-bold">إضافة أموال</th>
                <th className="py-3 px-4 font-bold rounded-tl-2xl">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredUsers().length === 0 ? (
                <tr><td colSpan={10} className="text-center py-8 text-gray-400">لا يوجد حسابات</td></tr>
              ) : (
                getFilteredUsers().map((user, idx) => (
                  <tr key={user.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FA]'} style={{fontSize: '15px'}}>
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4">{user.first_name} {user.last_name}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 font-bold text-green-700">{user.balance} جنيه</td>
                    <td className="py-3 px-4 font-bold">{user.role === 'admin' ? 'مشرف' : 'طالب'}</td>
                    <td className="py-3 px-4">{user.grade}</td>
                    <td className="py-3 px-4">{user.governorate}</td>
                    <td className="py-3 px-4 flex gap-2 items-center">
                      <input
                        type="number"
                        min={1}
                        className="w-20 p-1 border rounded text-center"
                        value={amounts[user.id] || ''}
                        onChange={e => setAmounts({ ...amounts, [user.id]: Number(e.target.value) })}
                      />
                      <input
                        type="text"
                        placeholder="ملاحظة"
                        className="w-28 p-1 border rounded text-center"
                        value={notes[user.id] || ''}
                        onChange={e => setNotes({ ...notes, [user.id]: e.target.value })}
                      />
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold hover:bg-blue-600 text-xs transition"
                        onClick={() => handleAddMoney(user.id)}
                      >إضافة</button>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg hover:bg-yellow-200 text-xs font-bold transition">تعديل</button>
                      <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-xs font-bold transition">حذف</button>
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-xs font-bold transition">
                        {user.role === 'admin' ? 'إزالة صلاحية المشرف' : 'تعيين كمشرف'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showSuccess && (
        <Notification
          type="success"
          message={successMsg}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
} 