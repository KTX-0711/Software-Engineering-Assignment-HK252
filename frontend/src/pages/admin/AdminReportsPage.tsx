import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client';
import { AuditLog, Invoice, ParkingSpot, Transaction } from '../../types/domain';

type ReportType = 'parking' | 'revenue' | 'occupancy' | 'staff';
type ReportRow = Record<string, string | number>;

const reportOptions: { value: ReportType; label: string }[] = [
  { value: 'parking', label: 'Lượt gửi xe' },
  { value: 'revenue', label: 'Doanh thu' },
  { value: 'occupancy', label: 'Tình trạng bãi đỗ' },
  { value: 'staff', label: 'Hoạt động nhân viên' }
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN') + ' VND';
}

function inRange(value: string, fromDate: string, toDate: string) {
  const time = new Date(value).getTime();
  const from = new Date(`${fromDate}T00:00:00`).getTime();
  const to = new Date(`${toDate}T23:59:59`).getTime();
  return time >= from && time <= to;
}

function downloadCsv(fileName: string, rows: ReportRow[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [headers.join(','), ...rows.map((row) => headers.map((header) => escape(row[header])).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminReportsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [reportType, setReportType] = useState<ReportType>('parking');
  const [fromDate, setFromDate] = useState(today());
  const [toDate, setToDate] = useState(today());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [logData, txData, invoiceData, spotData] = await Promise.all([
          api.get<AuditLog[]>('/admin/logs'),
          api.get<Transaction[]>('/payments/transactions'),
          api.get<Invoice[]>('/payments/invoices'),
          api.get<ParkingSpot[]>('/parking/spots')
        ]);
        setLogs(logData);
        setTransactions(txData);
        setInvoices(invoiceData);
        setSpots(spotData);
      } catch (err: any) {
        setError(err.message || 'Không thể tải dữ liệu báo cáo.');
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

  const rows = useMemo<ReportRow[]>(() => {
    if (validation) return [];

    if (reportType === 'parking') {
      return logs
        .filter((log) => inRange(log.timestamp, fromDate, toDate))
        .filter((log) => log.action === 'GATE_IN' || log.action === 'GATE_OUT')
        .map((log) => ({
          'Thời gian': new Date(log.timestamp).toLocaleString('vi-VN'),
          'Loại sự kiện': log.action === 'GATE_IN' ? 'Xe vào' : 'Xe ra',
          'Người/Thẻ': log.actor,
          'Biển số': log.payload?.licensePlate || '--',
          'Phí': log.payload?.fee ? formatCurrency(log.payload.fee) : '--'
        }));
    }

    if (reportType === 'revenue') {
      return transactions
        .filter((tx) => inRange(tx.timestamp, fromDate, toDate))
        .map((tx) => ({
          'Thời gian': new Date(tx.timestamp).toLocaleString('vi-VN'),
          'Mã giao dịch': tx.id,
          'Phương thức': tx.method,
          'Trạng thái': tx.status,
          'Số tiền': formatCurrency(tx.amount)
        }));
    }

    if (reportType === 'occupancy') {
      const areas = ['A', 'B'];
      return areas.map((area) => {
        const areaSpots = spots.filter((spot) => spot.id.startsWith(area));
        return {
          'Khu vực': `Khu ${area}`,
          'Tổng chỗ': areaSpots.length,
          'Trống': areaSpots.filter((spot) => spot.status === 'Available').length,
          'Có xe': areaSpots.filter((spot) => spot.status === 'Occupied').length,
          'Bảo trì': areaSpots.filter((spot) => spot.status === 'Maintenance').length
        };
      });
    }

    const staffActions = ['INTERNAL_ACCOUNT_CREATED', 'INTERNAL_ACCOUNT_UPDATED', 'INTERNAL_ACCOUNT_DELETED', 'GATE_IN', 'GATE_OUT', 'CASH_PAYMENT_CONFIRMED'];
    return logs
      .filter((log) => inRange(log.timestamp, fromDate, toDate))
      .filter((log) => staffActions.includes(log.action))
      .map((log) => ({
        'Thời gian': new Date(log.timestamp).toLocaleString('vi-VN'),
        'Người thực hiện': log.actor,
        'Hành động': log.action,
        'Chi tiết': log.payload ? JSON.stringify(log.payload) : '--'
      }));
  }, [reportType, logs, transactions, spots, fromDate, toDate, validation]);

  const totalRevenue = transactions.filter((tx) => tx.status === 'Paid').reduce((sum, tx) => sum + tx.amount, 0);
  const unpaidAmount = invoices.filter((invoice) => invoice.status === 'Unpaid').reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const paidTransactions = transactions.filter((tx) => tx.status === 'Paid').length;

  const selectedLabel = reportOptions.find((item) => item.value === reportType)?.label || 'Báo cáo';
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Báo cáo</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Xuất báo cáo</h1>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
      {validation && <div className="rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-700">{validation}</div>}

      <section className="grid gap-4 md:grid-cols-3">
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Doanh thu đã thu</div>
          <div className="mt-2 text-2xl font-bold text-app-text">{formatCurrency(totalRevenue)}</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Giao dịch đã thanh toán</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{paidTransactions}</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Công nợ</div>
          <div className="mt-2 text-2xl font-bold text-app-text">{formatCurrency(unpaidAmount)}</div>
        </div>
      </section>

      <section className="app-card">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px_180px]">
          <label className="block">
            <span className="text-sm font-semibold text-app-text">Loại báo cáo</span>
            <select className="app-input mt-2" value={reportType} onChange={(event) => setReportType(event.target.value as ReportType)}>
              {reportOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
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
            <button type="button" disabled={rows.length === 0} onClick={() => downloadCsv(`bao-cao-${reportType}.csv`, rows)} className="app-button-primary w-full px-4 py-3 disabled:opacity-50">Tải CSV</button>
          </div>
        </div>
      </section>

      <section className="app-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="app-section-title">Preview</p>
            <h2 className="app-page-title text-[1.7rem]">{selectedLabel}</h2>
          </div>
          <span className="app-chip">{rows.length} dòng</span>
        </div>

        {loading && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Đang tổng hợp dữ liệu báo cáo...</div>}
        {!loading && rows.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-8 text-sm text-app-muted">Không có dữ liệu trong khoảng thời gian đã chọn.</div>}

        {!loading && rows.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-app-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-bk-snow text-xs uppercase tracking-[0.12em] text-app-muted">
                <tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-t border-app-border">
                    {headers.map((header) => <td key={header} className="px-4 py-3">{row[header]}</td>)}
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
