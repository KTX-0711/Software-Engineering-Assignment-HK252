import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client';
import { AuditLog } from '../../types/domain';

type LogGroup = 'ALL' | 'PARKING' | 'PAYMENT' | 'PRICING' | 'AUTH' | 'STAFF' | 'IOT';

const groups: { value: LogGroup; label: string }[] = [
  { value: 'ALL', label: 'Tất cả sự kiện' },
  { value: 'PARKING', label: 'Ra vào bãi xe' },
  { value: 'PAYMENT', label: 'Thanh toán' },
  { value: 'PRICING', label: 'Chính sách giá' },
  { value: 'AUTH', label: 'Đăng nhập' },
  { value: 'STAFF', label: 'Tài khoản nhân viên' },
  { value: 'IOT', label: 'Thiết bị IoT' }
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function classify(action: string): LogGroup {
  if (action.includes('GATE')) return 'PARKING';
  if (action.includes('PAYMENT') || action.includes('INVOICE') || action.includes('BKPAY')) return 'PAYMENT';
  if (action.includes('PRICING')) return 'PRICING';
  if (action.includes('LOGIN') || action.includes('AUTH')) return 'AUTH';
  if (action.includes('INTERNAL_ACCOUNT')) return 'STAFF';
  if (action.includes('IOT')) return 'IOT';
  return 'ALL';
}

function inRange(value: string, fromDate: string, toDate: string) {
  const time = new Date(value).getTime();
  const from = new Date(`${fromDate}T00:00:00`).getTime();
  const to = new Date(`${toDate}T23:59:59`).getTime();
  return time >= from && time <= to;
}

function downloadCsv(rows: AuditLog[]) {
  if (rows.length === 0) return;
  const headers = ['timestamp', 'actor', 'action', 'payload'];
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const csv = [
    headers.join(','),
    ...rows.map((row) => [
      row.timestamp,
      row.actor,
      row.action,
      row.payload ? JSON.stringify(row.payload) : ''
    ].map(escape).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'nhat-ky-he-thong.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<LogGroup>('ALL');
  const [fromDate, setFromDate] = useState(today());
  const [toDate, setToDate] = useState(today());
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await api.get<AuditLog[]>('/admin/logs');
        setLogs(data);
      } catch (err: any) {
        setError(err.message || 'Không thể tải nhật ký hệ thống.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validation = useMemo(() => {
    if (!fromDate || !toDate) return 'Cần chọn đủ khoảng thời gian.';
    if (new Date(fromDate).getTime() > new Date(toDate).getTime()) return 'Ngày bắt đầu không được lớn hơn ngày kết thúc.';
    return '';
  }, [fromDate, toDate]);

  const filtered = useMemo(() => {
    if (validation) return [];
    const key = query.trim().toLowerCase();
    return [...logs]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .filter((item) => inRange(item.timestamp, fromDate, toDate))
      .filter((item) => group === 'ALL' || classify(item.action) === group)
      .filter((item) => !key || `${item.actor} ${item.action} ${JSON.stringify(item.payload || {})}`.toLowerCase().includes(key));
  }, [logs, query, group, fromDate, toDate, validation]);

  const counts = useMemo(() => ({
    parking: logs.filter((log) => classify(log.action) === 'PARKING').length,
    payment: logs.filter((log) => classify(log.action) === 'PAYMENT').length,
    staff: logs.filter((log) => classify(log.action) === 'STAFF').length,
    iot: logs.filter((log) => classify(log.action) === 'IOT').length
  }), [logs]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Nhật ký hệ thống</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Sự kiện hệ thống</h1>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
      {validation && <div className="rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-700">{validation}</div>}

      <section className="grid gap-4 md:grid-cols-4">
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Ra vào</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{counts.parking}</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Thanh toán</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{counts.payment}</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Nhân viên</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{counts.staff}</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">IoT</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{counts.iot}</div>
        </div>
      </section>

      <section className="app-card">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_170px_170px_150px]">
          <label className="block">
            <span className="text-sm font-semibold text-app-text">Tìm kiếm</span>
            <input className="app-input mt-2" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Actor, action hoặc dữ liệu" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-app-text">Loại sự kiện</span>
            <select className="app-input mt-2" value={group} onChange={(event) => setGroup(event.target.value as LogGroup)}>
              {groups.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-app-text">Từ ngày</span>
            <input className="app-input mt-2" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-app-text">Đến ngày</span>
            <input className="app-input mt-2" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
          </label>
          <div className="flex items-end">
            <button type="button" disabled={filtered.length === 0} onClick={() => downloadCsv(filtered)} className="app-button-primary w-full px-4 py-3 disabled:opacity-50">Xuất CSV</button>
          </div>
        </div>
      </section>

      <section className="app-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="app-section-title">Kết quả lọc</p>
            <h2 className="app-page-title text-[1.7rem]">Nhật ký mới nhất</h2>
          </div>
          <span className="app-chip">{filtered.length} log</span>
        </div>

        {loading && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Đang tải nhật ký...</div>}
        {!loading && filtered.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Không tìm thấy nhật ký phù hợp với điều kiện lọc.</div>}

        {!loading && filtered.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-app-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-bk-snow text-xs uppercase tracking-[0.12em] text-app-muted">
                <tr>
                  <th className="px-4 py-3">Thời gian</th>
                  <th className="px-4 py-3">Người thực hiện</th>
                  <th className="px-4 py-3">Loại</th>
                  <th className="px-4 py-3">Hành động</th>
                  <th className="px-4 py-3">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-app-border">
                    <td className="px-4 py-3">{new Date(item.timestamp).toLocaleString('vi-VN')}</td>
                    <td className="px-4 py-3 font-semibold text-app-text">{item.actor}</td>
                    <td className="px-4 py-3"><span className="app-chip">{groups.find((entry) => entry.value === classify(item.action))?.label || 'Khác'}</span></td>
                    <td className="px-4 py-3">{item.action}</td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => setSelectedLog(item)} className="text-sm font-semibold text-app-accent">Xem chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-[28px] bg-bk-white p-6 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="app-section-title">Chi tiết nhật ký</p>
                <h3 className="mt-2 text-2xl font-bold text-app-text">{selectedLog.action}</h3>
              </div>
              <button type="button" onClick={() => setSelectedLog(null)} className="app-button-secondary px-4 py-3">Đóng</button>
            </div>
            <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-app-muted">Thời gian</div>
                <div className="mt-1 font-semibold text-app-text">{new Date(selectedLog.timestamp).toLocaleString('vi-VN')}</div>
              </div>
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-app-muted">Người thực hiện</div>
                <div className="mt-1 font-semibold text-app-text">{selectedLog.actor}</div>
              </div>
            </div>
            <pre className="mt-4 max-h-[360px] overflow-auto rounded-2xl bg-bk-snow p-4 text-xs text-app-text">
              {selectedLog.payload ? JSON.stringify(selectedLog.payload, null, 2) : 'Không có payload.'}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
