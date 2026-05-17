import { useEffect, useState } from 'react';
import { Bell, Car, ClipboardList, CreditCard, FileText, Home, Landmark, LogOut } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { api } from '../api/client';
import logo from '../assets/logo.png';
import { Notification } from '../types/domain';

const navItems = [
  { to: '/customer/home', label: 'Trang chủ', icon: Home },
  { to: '/customer/parking', label: 'Bãi xe', icon: Car },
  { to: '/customer/vehicles/register', label: 'Đăng ký biển số', icon: ClipboardList },
  { to: '/customer/subscription', label: 'Đăng ký gói', icon: Landmark },
  { to: '/customer/payment', label: 'Thanh toán', icon: CreditCard },
  { to: '/customer/history', label: 'Lịch sử', icon: FileText },
  { to: '/customer/notices', label: 'Thông báo', icon: Bell }
];

export default function CustomerLayout() {
  const location = useLocation();
  const displayName = localStorage.getItem('displayName') || 'Khách hàng';
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadUnread = async () => {
      try {
        const data = await api.get<Notification[]>('/notifications/my');
        setUnreadCount(data.filter((item) => !item.read).length);
      } catch {
        setUnreadCount(0);
      }
    };

    loadUnread();
    const timer = window.setInterval(loadUnread, 15000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-app-bg text-app-text">
      <div className="mx-auto flex h-screen max-w-[1600px] overflow-hidden">
        <aside className="hidden h-screen w-[290px] flex-col overflow-y-auto bg-[#083691] px-6 py-7 text-[#FEFEFE] lg:flex">
          <Link to="/customer/home" className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FEFEFE] p-2 shadow-soft">
              <img src={logo} alt="BK TP.HCM" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-xl font-bold leading-tight text-[#FEFEFE]">HCMUT-SPMS</div>
              <div className="mt-1 text-sm text-[#d5e6f6]">Khách hàng</div>
            </div>
          </Link>

          <div className="my-8 h-px bg-[#80b4e5]/45" />

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    active ? 'border-[#80b4e5]/45 bg-[#1f8fd6] text-[#FEFEFE] shadow-[0_10px_24px_rgba(3,18,48,0.14)]' : 'border-transparent text-[#FEFEFE] hover:border-[#80b4e5]/30 hover:bg-[#0a47c2] hover:text-[#FEFEFE]'
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-[#80b4e5]/45 pt-5">
            <div className="rounded-2xl border border-[#80b4e5]/55 bg-[#0a47c2]/70 px-4 py-3 text-[#FEFEFE] shadow-[0_10px_28px_rgba(3,18,48,0.14)]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d5e6f6]">Tài khoản</div>
              <div className="mt-1 truncate text-sm font-semibold text-[#FEFEFE]">{displayName}</div>
            </div>
          </div>
        </aside>

        <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <header className="z-20 shrink-0 border-b border-app-border bg-bk-white px-5 py-4 lg:px-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-app-muted">Khách hàng</p>
                <h1 className="text-xl font-bold">Tài khoản HCMUT</h1>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/customer/notices" className="relative inline-flex items-center gap-2 rounded-full border border-app-border px-4 py-2 text-sm font-semibold text-app-text hover:bg-app-card">
                  <Bell className="h-4 w-4" />
                  Thông báo
                  {unreadCount > 0 && <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{unreadCount}</span>}
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-app-accent px-4 py-2 text-sm font-semibold text-bk-white shadow-soft hover:opacity-95"
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 lg:px-10 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
