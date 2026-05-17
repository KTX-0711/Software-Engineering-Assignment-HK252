import React from 'react';
import { BarChart3, CarFront, ClipboardList, CreditCard, Home, LayoutDashboard, Users } from 'lucide-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import CustomerLayout from './layouts/CustomerLayout';
import StaffLayout from './layouts/StaffLayout';
import LoginPage from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import EmployeePanel from './pages/EmployeePanel';
import AdminDashboard from './pages/AdminDashboard';
import DevControlPanel from './pages/DevControlPanel';
import VehicleRegistrationPage from './pages/customer/VehicleRegistrationPage';
import MonthlySubscriptionPage from './pages/customer/MonthlySubscriptionPage';
import PaymentPage from './pages/customer/PaymentPage';
import HistoryPage from './pages/customer/HistoryPage';
import HistoryDetailPage from './pages/customer/HistoryDetailPage';
import NoticesPage from './pages/customer/NoticesPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminLogsPage from './pages/admin/AdminLogsPage';
import AdminVehicleApprovalPage from './pages/admin/AdminVehicleApprovalPage';
import AdminPricingPolicyPage from './pages/admin/AdminPricingPolicyPage';
import ParkingMapPage from './pages/customer/ParkingMapPage';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  if (!userId) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role || '')) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function HomeRedirect() {
  const role = localStorage.getItem('role');
  if (!role) return <Navigate to="/login" replace />;
  if (role === 'CUSTOMER') return <Navigate to="/customer/home" replace />;
  if (role === 'EMPLOYEE') return <Navigate to="/employee/home" replace />;
  if (role === 'ADMIN') return <Navigate to="/admin/home" replace />;
  return <Navigate to="/login" replace />;
}

const employeeNavItems = [
  { to: '/employee/home', label: 'Trang chủ', icon: Home }
];

const adminNavItems = [
  { to: '/admin/home', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/staff', label: 'Tài khoản NV', icon: Users },
  { to: '/admin/vehicles/approval', label: 'Duyệt xe', icon: CarFront },
  { to: '/admin/pricing', label: 'Chính sách giá', icon: CreditCard },
  { to: '/admin/reports', label: 'Báo cáo', icon: BarChart3 },
  { to: '/admin/logs', label: 'Nhật ký', icon: ClipboardList }
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['CUSTOMER']}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<CustomerDashboard />} />
          <Route path="parking" element={<ParkingMapPage />} />
          <Route path="vehicles/register" element={<VehicleRegistrationPage />} />
          <Route path="subscription" element={<MonthlySubscriptionPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="history/:historyId" element={<HistoryDetailPage />} />
          <Route path="notices" element={<NoticesPage />} />
        </Route>

        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
              <StaffLayout title="Quầy nhân viên" navItems={employeeNavItems} portalLabel="Nhân viên" />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<EmployeePanel />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <StaffLayout title="Quản trị" navItems={adminNavItems} portalLabel="Admin" />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<AdminDashboard />} />
          <Route path="staff" element={<AdminStaffPage />} />
          <Route path="vehicles/approval" element={<AdminVehicleApprovalPage />} />
          <Route path="pricing" element={<AdminPricingPolicyPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="logs" element={<AdminLogsPage />} />
        </Route>

        <Route
          path="/dev"
          element={
            <ProtectedRoute allowedRoles={['EMPLOYEE', 'ADMIN']}>
              <DevControlPanel />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
