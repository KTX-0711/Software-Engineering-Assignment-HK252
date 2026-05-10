import { useEffect, useState } from 'react';
import { api } from '../../api/client';

type SubscriptionPolicy = {
  perVisitFee: number;
  guestPerVisitFee: number;
  monthlyFee: number;
  monthlyDays: number;
  monthlyDiscountRate: number;
  gateOpen: string;
  gateClose: string;
};

function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN') + ' VND';
}

export default function PolicyPage() {
  const [policy, setPolicy] = useState<SubscriptionPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await api.get<SubscriptionPolicy>('/subscriptions/my');
        setPolicy(data);
      } catch (err: any) {
        setError(err.message || 'Không tải được chính sách phí.');
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Chính sách</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Biểu phí đang áp dụng</h1>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
      {loading && <div className="app-card text-sm text-app-muted">Đang tải chính sách phí...</div>}

      {!loading && policy && (
        <section className="app-card">
          <div>
            <p className="app-section-title">Biểu phí</p>
            <h2 className="app-page-title text-[1.8rem]">Mức phí cho từng nhóm người dùng</h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-bk-snow px-4 py-5">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Sinh viên</div>
              <div className="mt-3 text-2xl font-bold text-app-text">{formatCurrency(policy.perVisitFee)}</div>
            </div>
            <div className="rounded-2xl bg-bk-snow px-4 py-5">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Khách vãng lai</div>
              <div className="mt-3 text-2xl font-bold text-app-text">{formatCurrency(policy.guestPerVisitFee)}</div>
            </div>
            <div className="rounded-2xl bg-bk-snow px-4 py-5">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Giảng viên, hành chính</div>
              <div className="mt-3 text-2xl font-bold text-app-text">Miễn phí</div>
            </div>
            <div className="rounded-2xl bg-[#d5e6f6] px-4 py-5">
              <div className="text-xs uppercase tracking-[0.18em] text-[#083691]">Vé tháng sinh viên</div>
              <div className="mt-3 text-2xl font-bold text-[#083691]">{formatCurrency(policy.monthlyFee)}</div>
              <div className="mt-2 text-sm text-[#083691]">{policy.monthlyDays} lượt quy đổi, giảm {Math.round((1 - policy.monthlyDiscountRate) * 100)}%.</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
