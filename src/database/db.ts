import { SUPER_ADMIN_PHONE } from '../config/settings';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  secondary_phone?: string;
  governorate: string;
  grade: string;
  email: string;
  password: string;
  balance: number;
  role: 'student' | 'admin';
  subscriptions?: any[];
  tests?: any[];
  homeworks?: any[];
  videosWatched?: number;
  totalVideos?: number;
  lecturesTime?: number;
  walletLog: {
    timestamp: string;
    amount: number;
    type: string;
    details: string;
  }[];
}

interface Database {
  users: User[];
  lastUserId: number;
  lastBackup: string;
  changeLog: {
    timestamp: string;
    action: string;
    details: string;
    userId?: number;
  }[];
  settings: {
    autoBackup: boolean;
    backupInterval: number;
    maxBackups: number;
  };
}

// دالة لتحميل البيانات من localStorage
const loadData = () => {
  try {
    const data = localStorage.getItem('afaq_database');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};

// دالة لحفظ البيانات في localStorage
const saveData = (data: Database) => {
  try {
    localStorage.setItem('afaq_database', JSON.stringify(data));
    // إنشاء نسخة احتياطية
    if (data.settings.autoBackup) {
      createBackup(data);
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// دالة لإنشاء نسخة احتياطية
const createBackup = (data: Database) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupKey = `afaq_backup_${timestamp}`;
    localStorage.setItem(backupKey, JSON.stringify(data));
    
    // حذف النسخ القديمة إذا تجاوزت الحد الأقصى
    const backups = Object.keys(localStorage)
      .filter(key => key.startsWith('afaq_backup_'))
      .sort()
      .reverse();
    
    if (backups.length > data.settings.maxBackups) {
      backups.slice(data.settings.maxBackups).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  } catch (error) {
    console.error('Error creating backup:', error);
  }
};

// دالة لتسجيل التغييرات
const logChange = (action: string, details: string, userId?: number) => {
  database.changeLog.push({
    timestamp: new Date().toISOString(),
    action,
    details,
    userId
  });
  
  // حفظ آخر 100 تغيير فقط
  if (database.changeLog.length > 100) {
    database.changeLog = database.changeLog.slice(-100);
  }
  
  saveData(database);
};

// تهيئة قاعدة البيانات
const initializeDatabase = () => {
  let data = loadData();
  
  if (!data) {
    data = {
      users: [],
      lastUserId: 0,
      lastBackup: new Date().toISOString(),
      changeLog: [],
      settings: {
        autoBackup: true,
        backupInterval: 5, // دقائق
        maxBackups: 10
      }
    };
    
    // إنشاء حساب المشرف الرئيسي تلقائياً
    const superAdmin: Omit<User, 'id'> = {
      first_name: 'المشرف',
      last_name: 'الرئيسي',
      phone: SUPER_ADMIN_PHONE,
      governorate: 'القاهرة',
      grade: 'الصف الثالث الثانوي',
      email: 'admin@afaq-academy.com',
      password: 'admin123',
      balance: 0,
      role: 'admin',
      subscriptions: [],
      tests: [],
      homeworks: [],
      videosWatched: 0,
      totalVideos: 0,
      lecturesTime: 0,
      walletLog: []
    };
    
    data.users.push({ ...superAdmin, id: 1 });
    data.lastUserId = 1;
    // سجل التغيير مباشرة في changeLog المؤقت
    data.changeLog.push({
      timestamp: new Date().toISOString(),
      action: 'INITIALIZE',
      details: 'تم إنشاء قاعدة البيانات وحساب المشرف الرئيسي'
    });
    saveData(data);
  } else {
    // حذف الحساب القديم إذا كان موجوداً
    const userIndex = data.users.findIndex((u: User) => u.phone === '01011342972');
    if (userIndex !== -1) {
      const deletedUser = data.users[userIndex];
      data.users.splice(userIndex, 1);
      data.changeLog.push({
        timestamp: new Date().toISOString(),
        action: 'DELETE_USER',
        details: `تم حذف المستخدم: ${deletedUser.first_name} ${deletedUser.last_name}`,
        userId: deletedUser.id
      });
      saveData(data);
    }
  }
  
  return data;
};

// تهيئة قاعدة البيانات عند تحميل الملف
let database = initializeDatabase();

// تحديث قاعدة البيانات في localStorage عند تغيير الصفحة أو إغلاق المتصفح
window.addEventListener('beforeunload', () => {
  saveData(database);
});

// تحديث قاعدة البيانات كل فترة محددة
const getBackupInterval = () => {
  if (database && database.settings && typeof database.settings.backupInterval === 'number') {
    return database.settings.backupInterval;
  }
  return 5; // القيمة الافتراضية بالدقائق
};

setInterval(() => {
  if (database) {
    saveData(database);
  }
}, getBackupInterval() * 60 * 1000);

// دالة تصدير البيانات
export const exportDatabase = () => {
  const data = {
    ...database,
    changeLog: database.changeLog.slice(-50) // تصدير آخر 50 تغيير فقط
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `afaq_database_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// دالة استيراد البيانات
export const importDatabase = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (validateDatabase(importedData)) {
          database = importedData;
          saveData(database);
          logChange('IMPORT', 'تم استيراد قاعدة البيانات');
          resolve(true);
        } else {
          reject(new Error('Invalid database format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

// دالة التحقق من صحة البيانات المستوردة
const validateDatabase = (data: any): data is Database => {
  return (
    Array.isArray(data.users) &&
    typeof data.lastUserId === 'number' &&
    typeof data.lastBackup === 'string' &&
    Array.isArray(data.changeLog) &&
    typeof data.settings === 'object' &&
    typeof data.settings.autoBackup === 'boolean' &&
    typeof data.settings.backupInterval === 'number' &&
    typeof data.settings.maxBackups === 'number'
  );
};

// دالة استعادة نسخة احتياطية محددة
export const restoreSpecificBackup = (backupKey: string): boolean => {
  const backup = localStorage.getItem(backupKey);
  if (backup) {
    try {
      const backupData = JSON.parse(backup);
      if (validateDatabase(backupData)) {
        database = backupData;
        saveData(database);
        logChange('RESTORE', `تم استعادة النسخة الاحتياطية ${backupKey}`);
        return true;
      }
    } catch (error) {
      console.error('Error restoring backup:', error);
    }
  }
  return false;
};

// دالة الحصول على قائمة النسخ الاحتياطية
export const getBackupList = () => {
  return Object.keys(localStorage)
    .filter(key => key.startsWith('afaq_backup_'))
    .sort()
    .reverse()
    .map(key => ({
      key,
      date: new Date(key.replace('afaq_backup_', '').replace(/-/g, ':'))
    }));
};

// تعديل الدوال الموجودة لتسجيل التغييرات
export const addUser = (user: Omit<User, 'id'>) => {
  return new Promise((resolve, reject) => {
    try {
      // تحقق من تكرار رقم الهاتف أو البريد الإلكتروني
      const exists = database.users.some(
        (u: User) => u.phone === user.phone || u.email === user.email
      );
      if (exists) {
        return reject(new Error('رقم الهاتف أو البريد الإلكتروني مستخدم بالفعل'));
      }
      const newUser = {
        ...user,
        id: ++database.lastUserId,
        role: user.phone === SUPER_ADMIN_PHONE ? 'admin' : 'student',
        balance: 0,
        subscriptions: [],
        tests: [],
        homeworks: [],
        videosWatched: 0,
        totalVideos: 0,
        lecturesTime: 0,
        walletLog: []
      };
      database.users.push(newUser);
      logChange('ADD_USER', `تم إضافة مستخدم جديد: ${newUser.first_name} ${newUser.last_name}`, newUser.id);
      saveData(database);
      resolve(newUser);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllUsers = () => {
  return database.users;
};

export const getUserByPhone = (phone: string) => {
  return new Promise((resolve, reject) => {
    try {
      const user = database.users.find((u: User) => u.phone === phone);
      resolve(user || null);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateUser = (id: number, updates: Partial<User>) => {
  return new Promise((resolve, reject) => {
    try {
      const userIndex = database.users.findIndex((u: User) => u.id === id);
      if (userIndex === -1) {
        reject(new Error('User not found'));
        return;
      }
      
      if (database.users[userIndex].phone === SUPER_ADMIN_PHONE && updates.role === 'student') {
        reject(new Error('Cannot change super admin role'));
        return;
      }
      
      if (updates.role === 'admin' && database.users[userIndex].phone !== SUPER_ADMIN_PHONE) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (currentUser.phone !== SUPER_ADMIN_PHONE) {
          reject(new Error('Only super admin can assign admin role'));
          return;
        }
      }
      
      const oldUser = { ...database.users[userIndex] };
      database.users[userIndex] = { ...database.users[userIndex], ...updates };
      
      // تسجيل التغييرات
      const changes = Object.keys(updates)
        .map(key => `${key}: ${oldUser[key as keyof User]} -> ${updates[key as keyof User]}`)
        .join(', ');
      
      logChange('UPDATE_USER', `تم تحديث بيانات المستخدم ${id}: ${changes}`, id);
      saveData(database);
      resolve(database.users[userIndex]);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteUser = (id: number) => {
  const userIndex = database.users.findIndex((u: User) => u.id === id);
  if (userIndex !== -1 && database.users[userIndex].phone !== SUPER_ADMIN_PHONE) {
    const deletedUser = database.users[userIndex];
    database.users.splice(userIndex, 1);
    logChange('DELETE_USER', `تم حذف المستخدم: ${deletedUser.first_name} ${deletedUser.last_name}`, id);
    saveData(database);
  }
};

export const clearAllAccounts = () => {
  const userCount = database.users.length;
  database = {
    users: [],
    lastUserId: 0,
    lastBackup: new Date().toISOString(),
    changeLog: database.changeLog,
    settings: {
      autoBackup: true,
      backupInterval: 5,
      maxBackups: 10
    }
  };
  logChange('CLEAR_ALL', `تم حذف جميع الحسابات (${userCount} حساب)`);
  saveData(database);
  localStorage.removeItem('user');
};

// دالة الحصول على سجل التغييرات
export const getChangeLog = (limit: number = 50) => {
  return database.changeLog.slice(-limit);
};

// دالة تحديث إعدادات قاعدة البيانات
export const updateDatabaseSettings = (settings: Partial<Database['settings']>) => {
  database.settings = { ...database.settings, ...settings };
  saveData(database);
  logChange('UPDATE_SETTINGS', `تم تحديث إعدادات قاعدة البيانات: ${JSON.stringify(settings)}`);
};

export const deleteUserByPhone = (phone: string) => {
  const user = database.users.find((u: User) => u.phone === phone);
  if (user && user.phone !== SUPER_ADMIN_PHONE) {
    const userIndex = database.users.findIndex((u: User) => u.phone === phone);
    const deletedUser = database.users[userIndex];
    database.users.splice(userIndex, 1);
    logChange('DELETE_USER', `تم حذف المستخدم: ${deletedUser.first_name} ${deletedUser.last_name}`, deletedUser.id);
    saveData(database);
    return true;
  }
  return false;
};

// حذف الحساب مباشرة
deleteUserByPhone('01011342972'); 