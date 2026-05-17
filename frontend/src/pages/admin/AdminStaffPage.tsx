import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client';
import { Account, UserRole } from '../../types/domain';

type InternalRole = Extract<UserRole, 'ADMIN' | 'EMPLOYEE'>;
type FormState = {
  displayName: string;
  username: string;
  password: string;
  role: InternalRole;
};

const emptyForm: FormState = {
  displayName: '',
  username: '',
  password: '123',
  role: 'EMPLOYEE'
};

function roleLabel(role: InternalRole) {
  return role === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên bãi xe';
}

function accountCode(account: Account) {
  return account.id.replace('acc_', 'TK');
}

export default function AdminStaffPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | InternalRole>('ALL');
  const [editing, setEditing] = useState<Account | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.get<Account[]>('/admin/internal-accounts');
      setAccounts(data);
    } catch (err: any) {
      setError(err.message || 'Không tải được tài khoản nội bộ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const filtered = useMemo(() => {
    return accounts.filter((account) => {
      const matchRole = roleFilter === 'ALL' || account.role === roleFilter;
      const key = `${account.id} ${account.displayName} ${account.username}`.toLowerCase();
      const matchQuery = query.trim().length === 0 || key.includes(query.trim().toLowerCase());
      return matchRole && matchQuery;
    });
  }, [accounts, query, roleFilter]);

  const adminCount = accounts.filter((account) => account.role === 'ADMIN').length;
  const employeeCount = accounts.filter((account) => account.role === 'EMPLOYEE').length;

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const openEdit = (account: Account) => {
    setEditing(account);
    setForm({
      displayName: account.displayName,
      username: account.username,
      password: account.password || '',
      role: account.role as InternalRole
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!form.displayName.trim()) return 'Tên nhân viên là bắt buộc.';
    if (!form.username.trim()) return 'Username là bắt buộc.';
    if (!form.password.trim()) return 'Password là bắt buộc.';
    return '';
  };

  const saveAccount = async () => {
    const validation = validateForm();
    if (validation) {
      setError(validation);
      setSuccess('');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');
      const payload = {
        displayName: form.displayName.trim(),
        username: form.username.trim(),
        password: form.password.trim(),
        role: form.role
      };
      if (editing) {
        await api.put<Account>(`/admin/internal-accounts/${editing.id}`, payload);
        setSuccess('Đã cập nhật tài khoản nhân viên.');
      } else {
        await api.post<Account>('/admin/internal-accounts', payload);
        setSuccess('Đã thêm tài khoản nhân viên.');
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      await loadAccounts();
    } catch (err: any) {
      setError(err.message || 'Không lưu được tài khoản.');
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async (account: Account) => {
    if (!window.confirm(`Xóa tài khoản ${account.displayName}?`)) return;
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      await api.delete<{ success: boolean }>(`/admin/internal-accounts/${account.id}`);
      setSuccess('Đã xóa tài khoản nhân viên.');
      await loadAccounts();
    } catch (err: any) {
      setError(err.message || 'Không xóa được tài khoản.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Quản lý tài khoản</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Nhân viên và phân quyền</h1>
          </div>
          <button type="button" onClick={openCreate} className="rounded-2xl border border-[#80b4e5] bg-[#0a47c2] px-5 py-3 text-sm font-bold text-[#FEFEFE]">
            Thêm nhân viên
          </button>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
      {success && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</div>}

      <section className="grid gap-4 md:grid-cols-3">
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Tài khoản nội bộ</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{accounts.length}</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Admin</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{adminCount}</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Staff</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{employeeCount}</div>
        </div>
      </section>

      {showForm && (
        <section className="app-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="app-section-title">{editing ? 'Chỉnh sửa tài khoản' : 'Tài khoản mới'}</p>
              <h2 className="app-page-title text-[1.7rem]">{editing ? editing.displayName : 'Thêm nhân viên nội bộ'}</h2>
            </div>
            <button type="button" onClick={() => setShowForm(false)} className="app-button-secondary px-4 py-3">Đóng</button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-app-text">Họ tên</span>
              <input className="app-input mt-2" value={form.displayName} onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))} placeholder="Nguyễn Văn A" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-app-text">Username đăng nhập</span>
              <input className="app-input mt-2" value={form.username} onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))} placeholder="nguyenvana.staff" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-app-text">Password</span>
              <input className="app-input mt-2" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="123" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-app-text">Vai trò</span>
              <select className="app-input mt-2" value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value as InternalRole }))}>
                <option value="EMPLOYEE">Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" disabled={saving} onClick={saveAccount} className="app-button-primary px-5 py-3 disabled:opacity-50">
              {saving ? 'Đang lưu...' : editing ? 'Lưu thay đổi' : 'Thêm nhân viên'}
            </button>
            {editing && (
              <button type="button" disabled={saving} onClick={() => deleteAccount(editing)} className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-700 disabled:opacity-50">
                Xóa tài khoản
              </button>
            )}
          </div>
        </section>
      )}

      <section className="app-card">
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo tên hoặc username"
            className="app-input"
          />
          <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as 'ALL' | InternalRole)} className="app-input">
            <option value="ALL">Tất cả vai trò</option>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYEE">Staff</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-app-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-bk-snow text-xs uppercase tracking-[0.12em] text-app-muted">
              <tr>
                <th className="px-4 py-3">Mã TK</th>
                <th className="px-4 py-3">Họ tên</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3">Mật khẩu</th>
                <th className="px-4 py-3">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="px-4 py-8 text-sm text-app-muted" colSpan={6}>Đang tải tài khoản nội bộ...</td>
                </tr>
              )}
              {!loading && filtered.map((account) => (
                <tr key={account.id} className="border-t border-app-border">
                  <td className="px-4 py-3 font-semibold text-app-text">{accountCode(account)}</td>
                  <td className="px-4 py-3">{account.displayName}</td>
                  <td className="px-4 py-3 font-semibold text-app-text">{account.username}</td>
                  <td className="px-4 py-3"><span className="app-chip">{roleLabel(account.role as InternalRole)}</span></td>
                  <td className="px-4 py-3">{account.password || '--'}</td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => openEdit(account)} className="text-sm font-semibold text-app-accent">Chỉnh sửa</button>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-sm text-app-muted" colSpan={6}>Không có tài khoản phù hợp bộ lọc.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
