import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  exportDatabase, 
  importDatabase, 
  getBackupList, 
  restoreSpecificBackup, 
  getChangeLog,
  updateDatabaseSettings,
  deleteUserByPhone
} from '../database/db';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const [backups, setBackups] = useState<any[]>([]);
  const [changes, setChanges] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupInterval: 5,
    maxBackups: 10
  });
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setBackups(getBackupList());
    setChanges(getChangeLog(50));
  }, []);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importDatabase(file);
        alert('تم استيراد البيانات بنجاح');
        window.location.reload();
      } catch (error) {
        alert('حدث خطأ أثناء استيراد البيانات');
      }
    }
  };

  const handleRestore = (backupKey: string) => {
    if (window.confirm('هل أنت متأكد من استعادة هذه النسخة؟')) {
      if (restoreSpecificBackup(backupKey)) {
        alert('تم استعادة النسخة بنجاح');
        window.location.reload();
      } else {
        alert('حدث خطأ أثناء استعادة النسخة');
      }
    }
  };

  const handleSettingsUpdate = () => {
    updateDatabaseSettings(settings);
    alert('تم تحديث الإعدادات بنجاح');
  };

  const handleDeleteUser = () => {
    if (!phone) {
      setMessage('الرجاء إدخال رقم الهاتف');
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
      if (deleteUserByPhone(phone)) {
        setMessage('تم حذف الحساب بنجاح');
        setPhone('');
      } else {
        setMessage('لم يتم العثور على الحساب أو لا يمكن حذفه');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-8 px-2 md:px-8" dir="rtl">
      <Sidebar />
      <div className="flex-1 bg-white rounded-xl shadow p-8 min-h-[80vh]">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">إعدادات قاعدة البيانات</h2>
        
        {/* إعدادات النسخ الاحتياطي */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">إعدادات النسخ الاحتياطي</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={e => setSettings({ ...settings, autoBackup: e.target.checked })}
                className="w-5 h-5"
              />
              <span>تفعيل النسخ الاحتياطي التلقائي</span>
            </div>
            <div className="flex items-center gap-4">
              <span>فترة النسخ الاحتياطي (بالدقائق):</span>
              <input
                type="number"
                value={settings.backupInterval}
                onChange={e => setSettings({ ...settings, backupInterval: parseInt(e.target.value) })}
                className="w-20 p-2 border rounded"
                min="1"
              />
            </div>
            <div className="flex items-center gap-4">
              <span>عدد النسخ الاحتياطية المسموح بها:</span>
              <input
                type="number"
                value={settings.maxBackups}
                onChange={e => setSettings({ ...settings, maxBackups: parseInt(e.target.value) })}
                className="w-20 p-2 border rounded"
                min="1"
              />
            </div>
            <button
              onClick={handleSettingsUpdate}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              حفظ الإعدادات
            </button>
          </div>
        </div>

        {/* تصدير واستيراد البيانات */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">تصدير واستيراد البيانات</h3>
          <div className="flex gap-4">
            <button
              onClick={exportDatabase}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
            >
              تصدير قاعدة البيانات
            </button>
            <div className="relative">
              <input
                type="file"
                onChange={handleImport}
                accept=".json"
                className="hidden"
                id="import-file"
              />
              <label
                htmlFor="import-file"
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-700 transition cursor-pointer"
              >
                استيراد قاعدة البيانات
              </label>
            </div>
          </div>
        </div>

        {/* النسخ الاحتياطية */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">النسخ الاحتياطية</h3>
          <div className="space-y-2">
            {backups.map(backup => (
              <div key={backup.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span>{backup.date.toLocaleString()}</span>
                <button
                  onClick={() => handleRestore(backup.key)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  استعادة
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* سجل التغييرات */}
        <div>
          <h3 className="text-xl font-bold mb-4">سجل التغييرات</h3>
          <div className="space-y-2">
            {changes.map((change, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{new Date(change.timestamp).toLocaleString()}</span>
                  <span className="font-bold">{change.action}</span>
                </div>
                <p>{change.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">حذف حساب</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">رقم الهاتف</label>
              <input
                type="tel"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="مثال: 01011342972"
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-center ${
                message.includes('نجاح') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <button
              onClick={handleDeleteUser}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              حذف الحساب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 