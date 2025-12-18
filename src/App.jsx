// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/features/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
// Public Pages
import { Home } from './pages/Home';
import { AllContests } from './pages/AllContests';
import { ContestDetails } from './pages/ContestDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
// User Dashboard
import { ParticipatedContests } from './pages/dashboard/user/ParticipatedContests';
import { WinningContests } from './pages/dashboard/user/WinningContests';
import { Profile } from './pages/dashboard/user/Profile';
// Creator Dashboard
import { AddContest } from './pages/dashboard/creator/AddContest';
import { MyContests } from './pages/dashboard/creator/MyContests';
import { Submissions } from './pages/dashboard/creator/Submissions';
import { EditContest } from './pages/dashboard/creator/EditContest';
// Admin Dashboard
import { ManageUsers } from './pages/dashboard/admin/ManageUsers';
import { ManageContests } from './pages/dashboard/admin/ManageContests';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export function App() {
  return <QueryClientProvider client={queryClient}>
     <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/all-contests" element={<AllContests />} />
          <Route path="/contest/:id" element={<ProtectedRoute><ContestDetails /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>}>
            {/* Default redirect based on role is handled in Navbar/DashboardLayout,
             but we need a default index route just in case */}
            <Route index element={<Navigate to="user/participated" replace />} />

            {/* User Routes */}
            <Route path="user/participated" element={<ParticipatedContests />} />
            <Route path="user/winning" element={<WinningContests />} />
            <Route path="user/profile" element={<Profile />} />

            {/* Creator Routes */}
            <Route path="creator/add" element={<ProtectedRoute allowedRoles={['creator', 'admin']}>
                  <AddContest />
                </ProtectedRoute>} />
            <Route path="creator/contests" element={<ProtectedRoute allowedRoles={['creator', 'admin']}>
                  <MyContests />
                </ProtectedRoute>} />
            <Route path="creator/submissions" element={<ProtectedRoute allowedRoles={['creator', 'admin']}>
                  <Submissions />
                </ProtectedRoute>} />
            <Route path="creator/edit/:id" element={<ProtectedRoute allowedRoles={['creator', 'admin']}>
                  <EditContest />
                </ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="admin/users" element={<ProtectedRoute allowedRoles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>} />
            <Route path="admin/contests" element={<ProtectedRoute allowedRoles={['admin']}>
                  <ManageContests />
                </ProtectedRoute>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    <ToastContainer />
    </AuthProvider>
  </QueryClientProvider>;
}