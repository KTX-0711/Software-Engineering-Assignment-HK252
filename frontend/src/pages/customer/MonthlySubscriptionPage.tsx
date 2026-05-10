import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { ParkingPlanType } from '../../types/domain';

type SubscriptionState = {
  planType: ParkingPlanType;
  planActivatedAt?: string;
  planExpiresAt?: string;
  perVisitFee: number;
  guestPerVisitFee: number;
  monthlyFee: number;
  monthlyDays: number;
  monthlyDiscountRate: number;
  monthlyAvailable: boolean;
  gateOpen: string;
  gateClose: string;
  unpaidAmount: number;
};

function planCards(subscription: SubscriptionState | null): Array<{ code: ParkingPlanType; name: string; price: string; desc: string }> {
  const perVisitFee = formatCurrency(subscription?.perVisitFee || 3000);
  const monthlyFee = formatCurrency(subscription?.monthlyFee || 72000);
  const monthlyDays = subscription?.monthlyDays || 30;

  return [
    {
      code: 'PAYG',
      name: 'Gửi xe theo lượt',
      price: `${perVisitFee} / lượt`,
      desc: 'Phù hợp khi bạn gửi xe không thường xuyên. Phí được cộng vào hóa đơn và có thể thanh toán sau.'
    },
    {
      code: 'MONTH',
      name: 'Vé tháng',
      price: `${monthlyFee} / ${monthlyDays} ngày`,
      desc: 'Dành cho nhu cầu gửi xe hằng ngày. Thanh toán một lần cho cả chu kỳ, không tính thêm phí từng lượt.'
    }
  ];
}

function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN') + ' VND';
}

function formatDate(value?: string) {
  if (!value) return 'Chưa kích hoạt';
  return new Date(value).toLocaleDateString('vi-VN');
}

function isActiveMonth(subscription: SubscriptionState | null) {
  return subscription?.planType === 'MONTH' && !!subscription.planExpiresAt && new Date(subscription.planExpiresAt) > new Date();
}

export default function MonthlySubscriptionPage() {
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [selected, setSelected] = useState<ParkingPlanType>('PAYG');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const activeMonth = isActiveMonth(subscription);

  const loadSubscription = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.get<SubscriptionState>('/subscriptions/my');
      setSubscription(data);
      setSelected(data.planType);
    } catch (err: any) {
      setError(err.message || 'Không tải được gói gửi xe.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscription();
  }, []);

  const updatePlan = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      const data = await api.put<SubscriptionState>('/subscriptions/my', { planType: selected });
      setSubscription(data);
      setSelected(data.planType);
      setSuccess(selected === 'MONTH' ? 'Đã tạo khoản thanh toán vé tháng. Vui lòng thanh toán qua BKPay để kích hoạt gói.' : 'Đã cập nhật lựa chọn.');
    } catch (err: any) {
      setError(err.message || 'Không cập nhật được gói gửi xe.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Dịch vụ gửi xe</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Chọn gói gửi xe</h1>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="app-card">
          <div>
            <p className="app-section-title">Gói dịch vụ</p>
            <h2 className="app-page-title text-[1.9rem]">Gói phù hợp với nhu cầu gửi xe của bạn</h2>
          </div>

          {error && <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
          {success && <div className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</div>}
          {loading && <div className="mt-5 rounded-2xl bg-bk-snow px-4 py-3 text-sm text-app-muted">Đang tải gói hiện tại...</div>}

          <div className="mt-6 grid gap-4">
            {planCards(subscription).map((plan) => {
              const disabled = activeMonth || (subscription?.monthlyAvailable === false && plan.code === 'MONTH');

              return (
                <button
                  type="button"
                  key={plan.code}
                  disabled={disabled}
                  onClick={() => setSelected(plan.code)}
                  className={`rounded-[24px] border px-5 py-5 text-left transition disabled:cursor-not-allowed disabled:opacity-70 ${
                    selected === plan.code ? 'border-app-accent bg-[#d5e6f6]' : 'border-app-border bg-bk-white hover:bg-bk-snow'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold text-app-text">{plan.name}</div>
                      <div className="mt-2 max-w-2xl text-sm leading-6 text-app-muted">{plan.desc}</div>
                      {activeMonth && <div className="mt-3 text-sm font-semibold text-[#083691]">Bạn đang sử dụng gói tháng rồi. Gói hiện tại còn hiệu lực đến {formatDate(subscription?.planExpiresAt)}.</div>}
                      {subscription?.monthlyAvailable === false && plan.code === 'MONTH' && <div className="mt-3 text-sm font-semibold text-[#083691]">Tài khoản của bạn được miễn phí gửi xe, không cần đăng ký vé tháng.</div>}
                    </div>
                    <div className="text-xl font-bold text-app-text">{plan.price}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="app-card">
          <div>
            <p className="app-section-title">Tài khoản của bạn</p>
            <h2 className="app-page-title text-[1.6rem]">Thông tin sử dụng</h2>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Đang sử dụng</div>
              <div className="mt-2 text-xl font-bold text-app-text">{subscription?.planType === 'MONTH' ? 'Vé tháng' : 'Gửi xe theo lượt'}</div>
              <div className="mt-2 text-sm text-app-muted">Bãi xe mở cửa từ {subscription?.gateOpen || '06:30'} đến {subscription?.gateClose || '18:00'}</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Gửi theo lượt</div>
                <div className="mt-2 text-lg font-bold text-app-text">{formatCurrency(subscription?.perVisitFee || 3000)}</div>
              </div>
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Vé tháng</div>
                <div className="mt-2 text-lg font-bold text-app-text">{formatCurrency(subscription?.monthlyFee || 72000)}</div>
              </div>
            </div>

            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Hiệu lực vé tháng</div>
              <div className="mt-2 text-sm text-app-muted">Bắt đầu: <span className="font-semibold text-app-text">{formatDate(subscription?.planActivatedAt)}</span></div>
              <div className="mt-1 text-sm text-app-muted">Kết thúc: <span className="font-semibold text-app-text">{formatDate(subscription?.planExpiresAt)}</span></div>
            </div>

            <div className="rounded-2xl bg-[#d5e6f6] px-4 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[#083691]">Số tiền cần thanh toán</div>
              <div className="mt-2 text-2xl font-bold text-[#083691]">{formatCurrency(subscription?.unpaidAmount || 0)}</div>
            </div>

            <button type="button" onClick={updatePlan} disabled={loading || saving || activeMonth || selected === subscription?.planType || (subscription?.monthlyAvailable === false && selected === 'MONTH')} className="app-button-primary w-full py-3 disabled:opacity-50">
              {saving ? 'Đang cập nhật...' : 'Cập nhật lựa chọn'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
