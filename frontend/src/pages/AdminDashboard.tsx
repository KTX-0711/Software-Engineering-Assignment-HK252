import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { AuditLog, IoTDevice, ParkingSpot, PricingPolicy, Vehicle } from '../types/domain';

type AdminSummary = {
  activeSessions: number;
  pendingPayments: number;
  unpaidInvoices: number;
};

function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN') + ' VND';
}

function deviceLabel(status: IoTDevice['status']) {
  if (status === 'DATAERROR') return 'Lỗi dữ liệu';
  if (status === 'DATADELAY') return 'Trễ dữ liệu';
  if (status === 'OFFLINE') return 'Mất kết nối';
  return 'Hoạt động';
}

function deviceTone(status: IoTDevice['status']) {
  if (status === 'ACTIVE') return 'bg-green-50 text-green-700';
  if (status === 'DATADELAY') return 'bg-yellow-50 text-yellow-700';
  return 'bg-red-50 text-red-700';
}

function spotLabel(status: ParkingSpot['status']) {
  if (status === 'Occupied') return 'Có xe';
  if (status === 'Maintenance') return 'Bảo trì';
  return 'Trống';
}

export default function AdminDashboard() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [policy, setPolicy] = useState<PricingPolicy | null>(null);
  const [pendingVehicles, setPendingVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const [logData, deviceData, spotData, summaryData, policyData, vehicleData] = await Promise.all([
        api.get<AuditLog[]>('/admin/logs'),
        api.get<IoTDevice[]>('/iot/devices'),
        api.get<ParkingSpot[]>('/parking/spots'),
        api.get<AdminSummary>('/admin/summary'),
        api.get<PricingPolicy>('/admin/pricing-policy'),
        api.get<Vehicle[]>('/admin/vehicle-registrations?status=PENDING')
      ]);
      setLogs(logData);
      setDevices(deviceData);
      setSpots(spotData);
      setSummary(summaryData);
      setPolicy(policyData);
      setPendingVehicles(vehicleData);
    } catch (err: any) {
      setError(err.message || 'Không tải được dashboard quản trị.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const spotCounts = useMemo(() => ({
    available: spots.filter((spot) => spot.status === 'Available').length,
    occupied: spots.filter((spot) => spot.status === 'Occupied').length,
    maintenance: spots.filter((spot) => spot.status === 'Maintenance').length
  }), [spots]);

  const faultDevices = useMemo(() => devices.filter((device) => device.status !== 'ACTIVE'), [devices]);
  const latestLogs = useMemo(() => [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 6), [logs]);
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Quản trị hệ thống</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Tổng quan bãi xe</h1>
          </div>

          <button type="button" onClick={loadDashboard} disabled={loading} className="rounded-2xl border border-[#80b4e5] bg-[#0a47c2] px-5 py-3 text-sm font-bold text-[#FEFEFE] disabled:opacity-50">
            {loading ? 'Đang tải...' : 'Tải lại dữ liệu'}
          </button>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Chỗ trống</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{spotCounts.available}</div>
          <div className="mt-2 text-sm text-app-muted">Có thể nhận xe</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Có xe</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{spotCounts.occupied}</div>
          <div className="mt-2 text-sm text-app-muted">Theo cảm biến vị trí</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Bảo trì</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{spotCounts.maintenance}</div>
          <div className="mt-2 text-sm text-app-muted">{faultDevices.length} thiết bị cần kiểm tra</div>
        </div>
        <div className="app-card-muted rounded-2xl px-4 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Hồ sơ xe</div>
          <div className="mt-2 text-3xl font-bold text-app-text">{pendingVehicles.length}</div>
          <div className="mt-2 text-sm text-app-muted">Đang chờ duyệt</div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="app-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="app-section-title">Sức chứa</p>
              <h2 className="app-page-title text-[1.7rem]">Trạng thái vị trí</h2>
            </div>
            <Link to="/dev" className="app-button-secondary px-4 py-3">Điều khiển IoT</Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-green-50 px-4 py-4 text-green-700">
              <div className="text-sm font-semibold">Trống</div>
              <div className="mt-2 text-2xl font-bold">{spotCounts.available}</div>
            </div>
            <div className="rounded-2xl bg-red-50 px-4 py-4 text-red-700">
              <div className="text-sm font-semibold">Có xe</div>
              <div className="mt-2 text-2xl font-bold">{spotCounts.occupied}</div>
            </div>
            <div className="rounded-2xl bg-zinc-100 px-4 py-4 text-zinc-700">
              <div className="text-sm font-semibold">Bảo trì</div>
              <div className="mt-2 text-2xl font-bold">{spotCounts.maintenance}</div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {spots.map((spot) => (
              <div key={spot.id} title={`${spot.id} - ${spotLabel(spot.status)}`} className={`flex h-10 items-center justify-center rounded-xl text-xs font-bold ${spot.status === 'Available' ? 'bg-green-400 text-[#111112]' : spot.status === 'Occupied' ? 'bg-red-500 text-[#111112]' : 'bg-zinc-500 text-[#FEFEFE]'}`}>
                {spot.id}
              </div>
            ))}
          </div>
        </section>

        <section className="app-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="app-section-title">IoT</p>
              <h2 className="app-page-title text-[1.7rem]">Thiết bị cần chú ý</h2>
            </div>
            <span className="app-chip">{devices.length} thiết bị</span>
          </div>

          <div className="mt-5 space-y-3">
            {faultDevices.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-6 text-sm text-app-muted">Tất cả thiết bị đang hoạt động.</div>}
            {faultDevices.map((device) => (
              <div key={device.id} className="rounded-2xl border border-app-border bg-bk-white px-4 py-4 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-bold text-app-text">{device.spotId}</div>
                    <div className="mt-1 text-sm text-app-muted">{device.id} - pin {device.batteryLevel}%</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${deviceTone(device.status)}`}>{deviceLabel(device.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="app-card">
          <p className="app-section-title">Biểu phí</p>
          <h2 className="app-page-title text-[1.5rem]">Đang áp dụng</h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-sm text-app-muted">Khách vãng lai</div>
              <div className="mt-2 text-xl font-bold text-app-text">{formatCurrency(policy?.guestPerVisitFee || 0)}</div>
            </div>
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-sm text-app-muted">Sinh viên</div>
              <div className="mt-2 text-xl font-bold text-app-text">{formatCurrency(policy?.studentPerVisitFee || 0)}</div>
            </div>
            <div className="rounded-2xl bg-[#d5e6f6] px-4 py-4 text-[#083691]">
              <div className="text-sm font-semibold">Vé tháng</div>
              <div className="mt-2 text-2xl font-bold">{formatCurrency(policy?.monthlyFee || 0)}</div>
            </div>
          </div>
          <Link to="/admin/pricing" className="app-button-primary mt-5 block px-4 py-3 text-center">Chỉnh chính sách giá</Link>
        </section>

        <section className="app-card">
          <p className="app-section-title">Thanh toán</p>
          <h2 className="app-page-title text-[1.5rem]">Công nợ</h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-sm text-app-muted">Giao dịch chờ thanh toán</div>
              <div className="mt-2 text-2xl font-bold text-app-text">{summary?.pendingPayments ?? 0}</div>
            </div>
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-sm text-app-muted">Hóa đơn chưa thanh toán</div>
              <div className="mt-2 text-2xl font-bold text-app-text">{summary?.unpaidInvoices ?? 0}</div>
            </div>
          </div>
        </section>
      </div>

      <section className="app-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="app-section-title">Nhật ký</p>
            <h2 className="app-page-title text-[1.7rem]">Sự kiện gần đây</h2>
          </div>
          <Link to="/admin/logs" className="app-button-secondary px-4 py-3">Xem nhật ký</Link>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {latestLogs.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-6 text-sm text-app-muted">Chưa có sự kiện hệ thống.</div>}
          {latestLogs.map((log) => (
            <div key={log.id} className="rounded-2xl border border-app-border bg-bk-white px-4 py-4 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-app-text">{log.action}</div>
                  <div className="mt-1 text-xs text-app-muted">{new Date(log.timestamp).toLocaleString('vi-VN')}</div>
                </div>
                <span className="app-chip">{log.actor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
