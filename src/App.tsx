import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import GradesList from './components/GradesList';
import SubjectsList from './components/SubjectsList';
import CoursesList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import BookStores from './pages/BookStores';
import Subscriptions from './pages/Subscriptions';
import Forum from './pages/Forum';
import ChargeCode from './pages/ChargeCode';
import Sidebar from './components/Sidebar';
import AdminUsers from './pages/AdminUsers';
import DeleteUser from './pages/DeleteUser';

function InternalLayout() {
  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-2 md:px-8">
      <Sidebar />
      <div className="flex-1 min-h-[80vh]">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <main className="w-full px-4 py-8 pt-24">
          <Routes>
            {/* صفحات عامة بدون سلايدر */}
            <Route path="/" element={<><Hero /><GradesList /></>} />
            <Route path="/grades" element={<GradesList />} />
            <Route path="/grade/:gradeId" element={<SubjectsList />} />
            <Route path="/subject/:subjectId" element={<CoursesList />} />
            <Route path="/course/:courseId" element={<CourseDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* صفحات داخلية مع السلايدر */}
            <Route element={<InternalLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/store" element={<BookStores />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/charge-code" element={<ChargeCode />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/settings" element={<Dashboard />} />
              <Route path="/delete-user" element={<DeleteUser />} />
            </Route>

            {/* أي مسار غير معرف */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;