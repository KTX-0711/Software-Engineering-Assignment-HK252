import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client';
import { PricingPolicy } from '../../types/domain';

const maxFee = 1000000;

function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN') + ' VND';
}

function validateFee(value: string, label: string) {
  if (!value.trim()) return `${label} là bắt buộc.`;
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return `${label} phải là số nguyên.`;
  if (parsed < 0 || parsed > maxFee) return `${label} không hợp lệ.`;
  return '';
}

function validateDiscount(value: string) {
  if (!value.trim()) return 'Tỷ lệ vé tháng là bắt buộc.';
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 'Tỷ lệ vé tháng phải là số.';
  if (parsed <= 0 || parsed > 1) return 'Tỷ lệ vé tháng phải lớn hơn 0 và không vượt quá 1.';
  return '';
}

export default function AdminPricingPolicyPage() {
  const [policy, setPolicy] = useState<PricingPolicy | null>(null);
  const [form, setForm] = useState({ guestPerVisitFee: '', studentPerVisitFee: '', monthlyDiscountRate: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const previewMonthlyFee = useMemo(() => {
    const studentFee = Number(form.studentPerVisitFee);
    const discount = Number(form.monthlyDiscountRate);
    if (!Number.isFinite(studentFee) || !Number.isFinite(discount)) return 0;
    return Math.round(studentFee * 30 * discount);
  }, [form]);

  const loadPolicy = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.get<PricingPolicy>('/admin/pricing-policy');
      setPolicy(data);
      setForm({
        guestPerVisitFee: String(data.guestPerVisitFee),
        studentPerVisitFee: String(data.studentPerVisitFee),
        monthlyDiscountRate: String(data.monthlyDiscountRate)
      });
    } catch (err: any) {
      setError(err.message || 'Không tải được chính sách giá.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolicy();
  }, []);

  const savePolicy = async () => {
    const validation =
      validateFee(form.guestPerVisitFee, 'Phí khách vãng lai') ||
      validateFee(form.studentPerVisitFee, 'Phí sinh viên') ||
      validateDiscount(form.monthlyDiscountRate);

    if (validation) {
      setError(validation);
      setSuccess('');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');
      const data = await api.put<PricingPolicy>('/admin/pricing-policy', {
        guestPerVisitFee: Number(form.guestPerVisitFee),
        studentPerVisitFee: Number(form.studentPerVisitFee),
        monthlyDiscountRate: Number(form.monthlyDiscountRate)
      });
      setPolicy(data);
      setForm({
        guestPerVisitFee: String(data.guestPerVisitFee),
        studentPerVisitFee: String(data.studentPerVisitFee),
        monthlyDiscountRate: String(data.monthlyDiscountRate)
      });
      setSuccess('Đã cập nhật chính sách giá.');
    } catch (err: any) {
      setError(err.message || 'Không cập nhật được chính sách giá.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Quản trị giá</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Chính sách phí gửi xe</h1>
          </div>

          <div className="rounded-3xl border border-[#80b4e5] bg-[#0a47c2] px-5 py-4 text-[#FEFEFE]">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d5e6f6]">Vé tháng hiện tại</div>
            <div className="mt-3 text-3xl font-bold text-[#FEFEFE]">{formatCurrency(policy?.monthlyFee || previewMonthlyFee)}</div>
          </div>
        </div>
      </section>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
      {success && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</div>}
      {loading && <div className="app-card text-sm text-app-muted">Đang tải chính sách giá...</div>}

      {!loading && (
        <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <section className="app-card">
            <div>
              <p className="app-section-title">Biểu phí</p>
              <h2 className="app-page-title text-[1.8rem]">Chỉnh sửa giá áp dụng</h2>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-app-text">Phí khách vãng lai / lượt</span>
                <input
                  value={form.guestPerVisitFee}
                  onChange={(event) => setForm((current) => ({ ...current, guestPerVisitFee: event.target.value }))}
                  className="app-input mt-2"
                  inputMode="numeric"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-app-text">Phí sinh viên / lượt</span>
                <input
                  value={form.studentPerVisitFee}
                  onChange={(event) => setForm((current) => ({ ...current, studentPerVisitFee: event.target.value }))}
                  className="app-input mt-2"
                  inputMode="numeric"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-app-text">Tỷ lệ vé tháng</span>
                <input
                  value={form.monthlyDiscountRate}
                  onChange={(event) => setForm((current) => ({ ...current, monthlyDiscountRate: event.target.value }))}
                  className="app-input mt-2"
                  inputMode="decimal"
                />
                <span className="mt-2 block text-sm text-app-muted">0.8 nghĩa là giảm 20% so với 30 lượt gửi xe sinh viên.</span>
              </label>
            </div>

            <button type="button" onClick={savePolicy} disabled={saving} className="app-button-primary mt-6 px-5 py-3 disabled:opacity-50">
              {saving ? 'Đang lưu...' : 'Lưu chính sách giá'}
            </button>
          </section>

          <section className="app-card h-fit">
            <p className="app-section-title">Tác động nghiệp vụ</p>
            <h2 className="app-page-title text-[1.5rem]">Giá hệ thống sẽ dùng</h2>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-sm text-app-muted">Khách vãng lai</div>
                <div className="mt-2 text-xl font-bold text-app-text">{formatCurrency(Number(form.guestPerVisitFee) || 0)} / lượt</div>
              </div>
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-sm text-app-muted">Sinh viên</div>
                <div className="mt-2 text-xl font-bold text-app-text">{formatCurrency(Number(form.studentPerVisitFee) || 0)} / lượt</div>
              </div>
              <div className="rounded-2xl bg-bk-snow px-4 py-4">
                <div className="text-sm text-app-muted">Giảng viên và hành chính nhà trường</div>
                <div className="mt-2 text-xl font-bold text-app-text">Miễn phí</div>
              </div>
              <div className="rounded-2xl bg-[#d5e6f6] px-4 py-4">
                <div className="text-sm font-semibold text-[#083691]">Vé tháng sinh viên</div>
                <div className="mt-2 text-2xl font-bold text-[#083691]">{formatCurrency(previewMonthlyFee)}</div>
                <div className="mt-2 text-sm text-[#083691]">Phí sinh viên x 30 x tỷ lệ vé tháng</div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
