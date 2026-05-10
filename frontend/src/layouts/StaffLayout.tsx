import { LogOut, Wrench } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import type { ComponentType } from 'react';
import logo from '../assets/logo.png';

interface StaffLayoutProps {
  title: string;
  navItems: Array<{ to: string; label: string; icon?: ComponentType<{ className?: string }> }>;
  portalLabel: string;
}

export default function StaffLayout({ title, navItems, portalLabel }: StaffLayoutProps) {
  const location = useLocation();
  const displayName = localStorage.getItem('displayName') || title;

  return (
    <div className="h-screen overflow-hidden bg-app-bg text-app-text">
      <div className="mx-auto flex h-screen max-w-[1600px] overflow-hidden">
        <aside className="hidden h-screen w-[280px] flex-col bg-[#083691] px-6 py-7 text-[#FEFEFE] lg:flex">
          <Link to={navItems[0]?.to || '/'} className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FEFEFE] p-2 shadow-soft">
              <img src={logo} alt="BK TP.HCM" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-xl font-bold leading-tight text-[#FEFEFE]">HCMUT-SPMS</div>
              <div className="mt-1 text-sm text-[#d5e6f6]">{title}</div>
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
                  {item.icon ? <item.icon className="h-[18px] w-[18px]" /> : null}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-[#80b4e5]/45 pt-5">
            <div className="rounded-2xl border border-[#80b4e5]/55 bg-[#0a47c2]/70 px-4 py-3 text-sm text-[#eaf3fb] shadow-[0_10px_28px_rgba(3,18,48,0.14)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d5e6f6]">{portalLabel}</p>
              <p className="mt-1 truncate font-semibold text-[#FEFEFE]">{displayName}</p>
            </div>
          </div>
        </aside>

        <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <header className="z-20 shrink-0 border-b border-app-border bg-bk-white px-5 py-4 lg:px-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-app-muted">{portalLabel}</p>
                <h1 className="text-xl font-bold">{title}</h1>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/dev" className="inline-flex items-center gap-2 rounded-full border border-app-border px-4 py-2 text-sm font-semibold hover:bg-app-card">
                  <Wrench className="h-4 w-4" />
                  Dev panel
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-app-accent px-4 py-2 text-sm font-semibold text-bk-white shadow-soft"
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
