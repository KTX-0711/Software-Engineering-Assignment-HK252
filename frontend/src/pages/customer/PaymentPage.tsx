import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client';
import { Invoice } from '../../types/domain';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('vi-VN');
}

function invoiceLabel(invoice: Invoice) {
  return invoice.sessionIds?.length ? 'Gửi xe theo lượt' : 'Vé tháng';
}

export default function PaymentPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError('');
      const invoiceData = await api.get<Invoice[]>('/payments/invoices');
      setInvoices(invoiceData);
      setSelectedIds((current) => current.filter((id) => invoiceData.some((invoice) => invoice.id === id && invoice.status === 'Unpaid')));
    } catch (err: any) {
      setError(err.message || 'Không thể tải dữ liệu thanh toán.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const unpaid = useMemo(() => invoices.filter((item) => item.status === 'Unpaid'), [invoices]);
  const selectedInvoices = useMemo(() => invoices.filter((invoice) => selectedIds.includes(invoice.id)), [invoices, selectedIds]);
  const selectedTotal = useMemo(() => selectedInvoices.reduce((sum, item) => sum + item.totalAmount, 0), [selectedInvoices]);
  const totalUnpaid = useMemo(() => unpaid.reduce((sum, item) => sum + item.totalAmount, 0), [unpaid]);

  const toggleInvoice = (invoice: Invoice) => {
    if (invoice.status !== 'Unpaid') return;
    setSuccess('');
    setSelectedIds((current) => current.includes(invoice.id) ? current.filter((id) => id !== invoice.id) : [...current, invoice.id]);
  };

  const paySelected = async () => {
    try {
      setPaying(true);
      setError('');
      setSuccess('');
      await api.post('/payments/invoices/pay', { invoiceIds: selectedIds });
      setSelectedIds([]);
      setSuccess('Thanh toán thành công qua BKPay.');
      await loadInvoices();
    } catch (err: any) {
      setError(err.message || 'Không thể thanh toán qua BKPay.');
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Thanh toán</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Hóa đơn của bạn</h1>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
      {success && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</div>}

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="app-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="app-section-title">Khoản thanh toán</p>
              <h2 className="app-page-title text-[1.9rem]">Danh sách hóa đơn</h2>
            </div>
            <span className="app-chip status-unpaid">{unpaid.length} khoản chưa thanh toán</span>
          </div>

          <div className="mt-5 space-y-3">
            {loading && <div className="rounded-2xl bg-bk-snow px-4 py-6 text-sm text-app-muted">Đang tải hóa đơn...</div>}
            {!loading && invoices.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-6 text-sm text-app-muted">Bạn chưa có khoản thanh toán nào.</div>}
            {!loading && invoices.map((invoice) => {
              const selectable = invoice.status === 'Unpaid';
              const checked = selectedIds.includes(invoice.id);

              return (
                <button
                  type="button"
                  key={invoice.id}
                  onClick={() => toggleInvoice(invoice)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${checked ? 'border-app-accent bg-[#d5e6f6]' : 'border-app-border bg-bk-snow hover:bg-bk-white'} ${!selectable ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!selectable}
                      onChange={() => toggleInvoice(invoice)}
                      onClick={(event) => event.stopPropagation()}
                      className="mt-1 h-4 w-4 rounded border-app-border"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-app-text">{invoiceLabel(invoice)}</div>
                          <div className="mt-1 text-sm text-app-muted">Mã hóa đơn: {invoice.id}</div>
                          <div className="mt-1 text-sm text-app-muted">Đến hạn {formatDate(invoice.dueDate)}</div>
                        </div>
                        <span className={`app-chip ${invoice.status === 'Paid' ? 'status-paid' : 'status-unpaid'}`}>{invoice.status === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
                      </div>
                      <div className="mt-3 text-xl font-bold text-app-text">{invoice.totalAmount.toLocaleString('vi-VN')} VND</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="app-card h-fit">
          <div>
            <p className="app-section-title">BKPay</p>
            <h2 className="app-page-title text-[1.6rem]">Tóm tắt thanh toán</h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-sm text-app-muted">Tổng chưa thanh toán</div>
              <div className="mt-2 text-2xl font-bold text-app-text">{totalUnpaid.toLocaleString('vi-VN')} VND</div>
              <div className="mt-2 text-sm text-app-muted">{unpaid.length} khoản đang mở</div>
            </div>

            <div className="rounded-2xl bg-[#d5e6f6] px-4 py-4">
              <div className="text-sm font-semibold text-[#083691]">Đã chọn {selectedInvoices.length} khoản</div>
              <div className="mt-2 text-3xl font-bold text-[#083691]">{selectedTotal.toLocaleString('vi-VN')} VND</div>
            </div>

            <button type="button" onClick={paySelected} disabled={selectedIds.length === 0 || paying} className="app-button-primary w-full py-3 disabled:opacity-50">
              {paying ? 'Đang thanh toán...' : 'Thanh toán qua BKPay'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
