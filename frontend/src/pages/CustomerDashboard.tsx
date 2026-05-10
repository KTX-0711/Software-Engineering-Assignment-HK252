import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { ParkingSpot, ParkingPlanType } from '../types/domain';

type SubscriptionState = {
  planType: ParkingPlanType;
  planActivatedAt?: string;
  planExpiresAt?: string;
  monthlyFee: number;
  monthlyDays: number;
  gateOpen: string;
  gateClose: string;
};

type AreaStatus = {
  name: string;
  total: number;
  available: number;
  percent: number;
};

function formatDate(value?: string) {
  if (!value) return 'Chưa kích hoạt';
  return new Date(value).toLocaleDateString('vi-VN');
}

function planName(planType?: ParkingPlanType) {
  return planType === 'MONTH' ? 'Vé tháng' : 'Gửi xe theo lượt';
}

function areaStatus(name: string, spots: ParkingSpot[]): AreaStatus {
  const total = spots.length;
  const available = spots.filter((spot) => spot.status === 'Available').length;
  return {
    name,
    total,
    available,
    percent: total ? Math.round((available / total) * 100) : 0
  };
}

export default function CustomerDashboard() {
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const name = localStorage.getItem('displayName') || 'Thành viên';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [subscriptionData, spotData] = await Promise.all([
          api.get<SubscriptionState>('/subscriptions/my'),
          api.get<ParkingSpot[]>('/parking/spots')
        ]);
        setSubscription(subscriptionData);
        setSpots(spotData);
      } catch (err: any) {
        setError(err.message || 'Không thể tải trang chủ.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const areas = useMemo(() => {
    const areaA = spots.filter((spot) => spot.id.startsWith('A') || spot.floor === 'A');
    const areaB = spots.filter((spot) => spot.id.startsWith('B') || spot.floor === 'B');
    return [areaStatus('Khu A', areaA), areaStatus('Khu B', areaB)];
  }, [spots]);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Trang chủ</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.6rem]">Xin chào, {name}</h1>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
      {loading && <div className="app-card text-sm text-app-muted">Đang tải dữ liệu trang chủ...</div>}

      {!loading && (
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <section className="app-card">
            <p className="app-section-title">Gói gửi xe</p>
            <h2 className="app-page-title text-[1.8rem]">Thông tin sử dụng</h2>

            <div className="mt-6 rounded-[28px] bg-bk-snow px-5 py-5">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Gói hiện tại</div>
              <div className="mt-3 text-3xl font-bold text-app-text">{planName(subscription?.planType)}</div>
              <div className="mt-3 text-sm leading-7 text-app-muted">
                {subscription?.planType === 'MONTH'
                  ? `Hiệu lực đến ${formatDate(subscription.planExpiresAt)}.`
                  : 'Thanh toán theo từng lượt gửi xe.'}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Mở cửa</div>
                <div className="mt-2 text-lg font-bold text-app-text">{subscription?.gateOpen || '06:30'}</div>
              </div>
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Đóng cửa</div>
                <div className="mt-2 text-lg font-bold text-app-text">{subscription?.gateClose || '18:00'}</div>
              </div>
            </div>
          </section>

          <section className="app-card">
            <p className="app-section-title">Tình trạng bãi đỗ</p>
            <h2 className="app-page-title text-[1.8rem]">Chỗ trống theo khu</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {areas.map((area) => (
                <div key={area.name} className="rounded-[28px] border border-app-border bg-bk-white px-5 py-5 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-bold text-app-text">{area.name}</div>
                      <div className="mt-2 text-sm text-app-muted">Còn {area.available}/{area.total} vị trí</div>
                    </div>
                    <div className="text-4xl font-bold text-[#083691]">{area.percent}%</div>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-bk-snow">
                    <div className="h-full rounded-full bg-[#1f8fd6]" style={{ width: `${area.percent}%` }} />
                  </div>

                  <div className="mt-3 text-sm text-app-muted">
                    {area.percent >= 50 ? 'Còn nhiều chỗ trống.' : area.percent > 0 ? 'Chỗ trống đang giảm.' : 'Khu này hiện đã đầy.'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
