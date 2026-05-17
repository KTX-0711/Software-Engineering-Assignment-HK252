import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { Notification } from '../../types/domain';

function levelLabel(level: Notification['level']) {
  if (level === 'ERROR') return 'Cần xử lý';
  if (level === 'WARNING') return 'Nhắc hạn';
  if (level === 'SUCCESS') return 'Hoàn tất';
  return 'Thông tin';
}

function levelClass(level: Notification['level']) {
  if (level === 'ERROR') return 'status-overdue';
  if (level === 'WARNING') return 'status-unpaid';
  if (level === 'SUCCESS') return 'status-paid';
  return '';
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notification[]>([]);
  const [activeId, setActiveId] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNotices = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.get<Notification[]>('/notifications/my');
      setNotices(data);
      setActiveId((current) => current || data[0]?.id || '');
    } catch (err: any) {
      setError(err.message || 'Không tải được thông báo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const filtered = useMemo(() => showUnreadOnly ? notices.filter((item) => !item.read) : notices, [notices, showUnreadOnly]);
  const active = filtered.find((item) => item.id === activeId) || filtered[0];

  const selectNotice = async (notice: Notification) => {
    setActiveId(notice.id);
    if (notice.read) return;

    setNotices((current) => current.map((item) => item.id === notice.id ? { ...item, read: true } : item));
    try {
      await api.put<Notification>(`/notifications/${notice.id}/read`, {});
    } catch (err: any) {
      setError(err.message || 'Không cập nhật được trạng thái thông báo.');
      await loadNotices();
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Thông báo</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Thông báo của bạn</h1>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}

      <section className="app-card">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="app-chip">{filtered.length} thông báo</span>
          <button onClick={() => setShowUnreadOnly((value) => !value)} className="app-button-secondary px-4 py-2 text-sm">
            {showUnreadOnly ? 'Hiện tất cả' : 'Chỉ hiện chưa đọc'}
          </button>
        </div>

        {loading && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Đang tải thông báo...</div>}

        {!loading && notices.length === 0 && (
          <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Bạn chưa có thông báo nào.</div>
        )}

        {!loading && notices.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => selectNotice(item)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${active?.id === item.id ? 'border-app-accent bg-bk-sky' : 'border-app-border bg-bk-snow hover:bg-bk-white'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-app-text">{item.title}</div>
                      <div className="mt-1 text-xs text-app-muted">{new Date(item.createdAt).toLocaleString('vi-VN')}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-[#083691]" />}
                      <span className={`app-chip ${levelClass(item.level)}`}>{levelLabel(item.level)}</span>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-app-muted">{item.message}</p>
                </button>
              ))}
              {filtered.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Không còn thông báo chưa đọc.</div>}
            </div>

            <div className="rounded-2xl border border-app-border bg-bk-white px-5 py-5">
              {!active && <div className="text-sm text-app-muted">Chọn thông báo để xem chi tiết.</div>}
              {active && (
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-app-text">{active.title}</h3>
                    <span className={`app-chip ${levelClass(active.level)}`}>{levelLabel(active.level)}</span>
                  </div>
                  <p className="mt-2 text-sm text-app-muted">{new Date(active.createdAt).toLocaleString('vi-VN')}</p>
                  <p className="mt-5 text-sm leading-7 text-app-text">{active.message}</p>
                  {active.link && <Link to={active.link} className="app-button-primary mt-5 inline-flex px-4 py-2 text-sm">Mở liên quan</Link>}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
