import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { Invoice, ParkingSession } from '../../types/domain';

function formatDateTime(value?: string) {
  if (!value) return '--';
  return new Date(value).toLocaleString('vi-VN');
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<ParkingSession[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [sessionData, invoiceData] = await Promise.all([
          api.get<ParkingSession[]>('/parking/sessions'),
          api.get<Invoice[]>('/payments/invoices')
        ]);
        setSessions(sessionData);
        setInvoices(invoiceData);
      } catch (err: any) {
        setError(err.message || 'Không thể tải lịch sử');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const items = useMemo(() => {
    const rows = sessions.map((session) => {
      const invoice = invoices.find((inv) => inv.id === session.id || inv.customerId === session.cardId);
      return {
        id: session.id,
        plate: session.licensePlate,
        checkInTime: session.checkInTime,
        checkOutTime: session.checkOutTime,
        sessionStatus: session.status,
        fee: session.fee,
        invoiceStatus: invoice?.status || 'Unpaid'
      };
    });
    return rows.sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime());
  }, [invoices, sessions]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Lịch sử</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Lịch sử gửi xe</h1>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-cobalt-blue-50 px-4 py-3 text-sm text-cobalt-blue-800">{error}</div>}

      <section className="app-card">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-app-muted">Các lượt gửi xe gần đây</p>
          <span className="app-chip">{items.length} lượt</span>
        </div>

        {loading && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Đang đồng bộ lịch sử...</div>}
        {!loading && items.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Chưa có dữ liệu lịch sử.</div>}

        {!loading && items.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-app-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-bk-snow text-xs uppercase tracking-[0.12em] text-app-muted">
                <tr>
                  <th className="px-4 py-3">Session</th>
                  <th className="px-4 py-3">Biển số</th>
                  <th className="px-4 py-3">Check-in</th>
                  <th className="px-4 py-3">Check-out</th>
                  <th className="px-4 py-3">Phí</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-app-border">
                    <td className="px-4 py-3 font-semibold text-app-text">{item.id}</td>
                    <td className="px-4 py-3">{item.plate}</td>
                    <td className="px-4 py-3">{formatDateTime(item.checkInTime)}</td>
                    <td className="px-4 py-3">{formatDateTime(item.checkOutTime)}</td>
                    <td className="px-4 py-3 font-semibold">{item.fee.toLocaleString('vi-VN')} VND</td>
                    <td className="px-4 py-3">
                      <span className={`app-chip ${item.invoiceStatus === 'Paid' ? 'status-paid' : 'status-unpaid'}`}>
                        {item.sessionStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/customer/history/${item.id}`} className="text-sm font-semibold text-app-accent">Xem</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
