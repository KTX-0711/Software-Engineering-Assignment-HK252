import React, { useEffect, useState } from 'react';
import { Building2, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { api } from '../api/client';
import loginBackground from '../assets/hcmut_login.jpeg';
import logo from '../assets/logo.png';

type LoginType = 'HCMUT' | 'ADMIN';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<LoginType | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setLoginType(null);
      setUsername('');
      setPassword('');
      setResetMode(false);
      setResetUsername('');
      setResetPassword('');
      setResetConfirmPassword('');
      setError('');
      setSuccess('');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const selectLoginType = (type: LoginType) => {
    setLoginType(type);
    setUsername('');
    setPassword('');
    setResetMode(false);
    setResetUsername('');
    setResetPassword('');
    setResetConfirmPassword('');
    setError('');
    setSuccess('');
    window.history.pushState({ loginType: type }, '', window.location.href);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!loginType) {
      setError('Vui lòng chọn loại tài khoản.');
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu.');
      return;
    }

    setLoading(true);

    try {
      const res: any = await api.post('/auth/login', { username: username.trim(), password });

      if (loginType === 'HCMUT' && res.role !== 'CUSTOMER') {
        setError('Tài khoản nội bộ không thể đăng nhập qua cổng HCMUT.');
        setLoading(false);
        return;
      }

      if (loginType === 'ADMIN' && !['ADMIN', 'EMPLOYEE'].includes(res.role)) {
        setError('Chỉ tài khoản nội bộ được dùng cổng này.');
        setLoading(false);
        return;
      }

      localStorage.setItem('userId', res.userId);
      localStorage.setItem('role', res.role);
      localStorage.setItem('displayName', res.displayName);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message?.startsWith('{') || err.message?.startsWith('[') ? 'Tên đăng nhập hoặc mật khẩu không hợp lệ.' : err.message || 'Không thể đăng nhập.');
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!resetUsername.trim() || !resetPassword.trim() || !resetConfirmPassword.trim()) {
      setError('Vui lòng nhập đủ thông tin.');
      return;
    }

    if (resetPassword !== resetConfirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', { username: resetUsername.trim(), password: resetPassword });
      setUsername(resetUsername.trim());
      setPassword('');
      setResetMode(false);
      setResetPassword('');
      setResetConfirmPassword('');
      setSuccess('Đã đổi mật khẩu. Bạn có thể đăng nhập bằng mật khẩu mới.');
    } catch (err: any) {
      setError(err.message || 'Không đổi được mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#031230] px-4 py-6"
    >
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat blur-sm"
        style={{
          backgroundImage: `url(${loginBackground})`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#083691]/42 via-[#052461]/48 to-[#031230]/66" />
      <div className="relative w-full max-w-[470px] rounded-[28px] bg-[#FEFEFE] p-6 shadow-[0_28px_70px_rgba(3,18,48,0.34),0_6px_18px_rgba(3,18,48,0.18)] ring-1 ring-white/80 sm:p-8">
        <div className="mb-7 flex flex-col items-center text-center">
          <img src={logo} alt="BK TP.HCM" className="h-20 w-20 object-contain drop-shadow-[0_10px_18px_rgba(8,54,145,0.18)]" />
          <p className="mt-3 text-sm font-semibold text-[#083691]">HCMUT-SPMS</p>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-app-muted">Xác thực tài khoản</p>
            <h1 className="mt-2 text-[29px] font-bold leading-tight text-app-text">Đăng nhập bằng tài khoản của bạn</h1>
          </div>

          {!loginType ? (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => selectLoginType('HCMUT')}
                className="flex w-full items-center gap-4 rounded-2xl border border-[#aacdee] bg-[#f1f3f3] px-4 py-4 text-left shadow-[0_8px_20px_rgba(8,54,145,0.08)] transition hover:-translate-y-0.5 hover:border-[#0a47c2] hover:bg-[#e7eefe] hover:shadow-[0_14px_28px_rgba(8,54,145,0.14)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0a47c2] text-[#FEFEFE] shadow-[0_12px_24px_rgba(10,71,194,0.25)]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-app-text">Tài khoản HCMUT</div>
                  <div className="mt-1 text-sm leading-6 text-app-muted">Dành cho người dùng gửi xe có định danh trường.</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => selectLoginType('ADMIN')}
                className="flex w-full items-center gap-4 rounded-2xl border border-[#aacdee] bg-[#f1f3f3] px-4 py-4 text-left shadow-[0_8px_20px_rgba(8,54,145,0.08)] transition hover:-translate-y-0.5 hover:border-[#0a47c2] hover:bg-[#e7eefe] hover:shadow-[0_14px_28px_rgba(8,54,145,0.14)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#083691] text-[#FEFEFE] shadow-[0_12px_24px_rgba(8,54,145,0.25)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-app-text">Quản trị viên</div>
                  <div className="mt-1 text-sm leading-6 text-app-muted">Dành cho quản trị viên và nhân viên bãi xe.</div>
                </div>
              </button>

              {error && <div className="rounded-2xl bg-[#e7eefe] px-4 py-3 text-sm text-[#052461]">{error}</div>}
            </div>
          ) : resetMode ? (
            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div className="rounded-2xl bg-[#e7eefe] px-4 py-3 text-sm font-semibold text-[#052461]">Đổi mật khẩu HCMUT</div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-app-text">Tên đăng nhập</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" />
                  <input className="app-input h-12 pl-10" placeholder="nguyenvanhung@hcmut.edu.vn" value={resetUsername} onChange={(e) => setResetUsername(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-app-text">Mật khẩu mới</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" />
                  <input type="password" className="app-input h-12 pl-10" placeholder="••••••••" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-app-text">Nhập lại mật khẩu mới</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" />
                  <input type="password" className="app-input h-12 pl-10" placeholder="••••••••" value={resetConfirmPassword} onChange={(e) => setResetConfirmPassword(e.target.value)} />
                </div>
              </div>

              {error && <div className="rounded-2xl bg-[#e7eefe] px-4 py-3 text-sm text-[#052461]">{error}</div>}
              {success && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

              <button disabled={loading} className="w-full rounded-2xl bg-[#0a47c2] px-5 py-3.5 text-base font-semibold text-[#FEFEFE] transition hover:bg-[#083691] disabled:bg-[#aacdee] disabled:text-[#083691]">
                {loading ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
              </button>
              <button type="button" onClick={() => { setResetMode(false); setError(''); setSuccess(''); }} className="w-full rounded-2xl border border-app-border px-5 py-3.5 text-base font-semibold text-app-text transition hover:bg-app-card">
                Quay lại đăng nhập
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="rounded-2xl bg-[#e7eefe] px-4 py-3 text-sm font-semibold text-[#052461]">
                {loginType === 'HCMUT' ? 'Đăng nhập tài khoản HCMUT' : 'Đăng nhập nội bộ'}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-app-text">Tên đăng nhập</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" />
                  <input className="app-input h-12 pl-10" placeholder={loginType === 'HCMUT' ? 'nguyenvanhung@hcmut.edu.vn' : 'phamhoangnam.admin'} value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-app-text">Mật khẩu</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" />
                  <input type="password" className="app-input h-12 pl-10" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

              {error && <div className="rounded-2xl bg-[#e7eefe] px-4 py-3 text-sm text-[#052461]">{error}</div>}
              {success && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

              <button disabled={loading} className="w-full rounded-2xl bg-[#0a47c2] px-5 py-3.5 text-base font-semibold text-[#FEFEFE] transition hover:bg-[#083691] disabled:bg-[#aacdee] disabled:text-[#083691]">
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
              {loginType === 'HCMUT' && (
                <button type="button" onClick={() => { setResetMode(true); setResetUsername(username); setError(''); setSuccess(''); }} className="w-full text-sm font-semibold text-[#0a47c2]">
                  Quên mật khẩu?
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
