import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api/client';
import { Invoice, ParkingSession } from '../../types/domain';

function formatDateTime(value?: string) {
  if (!value) return '--';
  return new Date(value).toLocaleString('vi-VN');
}

export default function HistoryDetailPage() {
  const { historyId } = useParams();
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
        setError(err.message || 'Không thể tải chi tiết lịch sử');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const detail = useMemo(() => {
    const session = sessions.find((item) => item.id === historyId);
    if (!session) return null;
    const invoice = invoices.find((item) => item.id === session.id || item.customerId === session.cardId);
    return { session, invoice };
  }, [historyId, invoices, sessions]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="app-section-title">Lịch sử chi tiết</p>
          <h2 className="app-page-title">Thông tin phiên gửi xe</h2>
        </div>
        <Link to="/customer/history" className="app-button-secondary px-4 py-2 text-sm">Quay lại danh sách</Link>
      </div>

      {loading && <div className="app-card text-sm text-app-muted">Đang tải chi tiết...</div>}
      {error && <div className="rounded-2xl bg-cobalt-blue-50 px-4 py-3 text-sm text-cobalt-blue-800">{error}</div>}

      {!loading && !detail && <div className="app-card text-sm text-app-muted">Không tìm thấy lượt gửi xe {historyId}.</div>}

      {!loading && detail && (
        <section className="app-card space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Mã lượt gửi</div>
              <div className="mt-2 text-lg font-bold text-app-text">{detail.session.id}</div>
            </div>
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Biển số</div>
              <div className="mt-2 text-lg font-bold text-app-text">{detail.session.licensePlate}</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm text-app-muted">Check-in</div>
              <div className="font-semibold text-app-text">{formatDateTime(detail.session.checkInTime)}</div>
            </div>
            <div>
              <div className="text-sm text-app-muted">Check-out</div>
              <div className="font-semibold text-app-text">{formatDateTime(detail.session.checkOutTime)}</div>
            </div>
            <div>
              <div className="text-sm text-app-muted">Trạng thái</div>
              <div className="font-semibold text-app-text">{detail.session.status}</div>
            </div>
            <div>
              <div className="text-sm text-app-muted">Phí</div>
              <div className="font-semibold text-app-text">{detail.session.fee.toLocaleString('vi-VN')} VND</div>
            </div>
          </div>

          <div className="rounded-2xl border border-app-border px-4 py-4">
            <div className="text-sm text-app-muted">Hóa đơn</div>
            {!detail.invoice && <div className="mt-2 text-sm text-app-muted">Chưa có hóa đơn.</div>}
            {detail.invoice && (
              <div className="mt-2 grid gap-2 text-sm">
                <div><span className="text-app-muted">ID:</span> <span className="font-semibold text-app-text">{detail.invoice.id}</span></div>
                <div><span className="text-app-muted">Trạng thái:</span> <span className="font-semibold text-app-text">{detail.invoice.status}</span></div>
                <div><span className="text-app-muted">Hạn:</span> <span className="font-semibold text-app-text">{new Date(detail.invoice.dueDate).toLocaleDateString('vi-VN')}</span></div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
