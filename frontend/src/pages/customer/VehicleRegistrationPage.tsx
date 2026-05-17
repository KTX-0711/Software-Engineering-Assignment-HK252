import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client';
import { Vehicle } from '../../types/domain';

type WizardData = {
  ownerName: string;
  phone: string;
  licensePlate: string;
  color: string;
  licensePlateImage: File | null;
  vehicleRegistrationImage: File | null;
  agreeTerms: boolean;
};

const steps = ['Thông tin chủ xe', 'Thông tin phương tiện', 'Xác nhận'];
const ownerNamePattern = /^[A-Za-zÀ-ỹ\s]{2,}$/;
const phonePattern = /^(0|\+84)(\d{9})$/;

const emptyForm: WizardData = {
  ownerName: '',
  phone: '',
  licensePlate: '',
  color: '',
  licensePlateImage: null,
  vehicleRegistrationImage: null,
  agreeTerms: false
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Khong doc duoc file anh'));
    reader.readAsDataURL(file);
  });
}

function VehicleImage({ label, name, src }: { label: string; name: string; src?: string }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-app-text">{label}</div>
      {src ? (
        <img src={src} alt={label} className="h-36 w-full rounded-2xl border border-app-border object-cover" />
      ) : (
        <div className="flex h-36 items-center justify-center rounded-2xl border border-dashed border-app-border bg-bk-snow px-3 text-center text-xs font-semibold text-app-muted">
          {name}
        </div>
      )}
    </div>
  );
}

function statusLabel(status: Vehicle['status']) {
  if (status === 'APPROVED') return 'Đã duyệt';
  if (status === 'REJECTED') return 'Bị từ chối';
  return 'Đang chờ xác nhận';
}

function statusTone(status: Vehicle['status']) {
  if (status === 'APPROVED') return 'bg-green-100 text-green-700';
  if (status === 'REJECTED') return 'bg-red-100 text-red-700';
  return 'bg-[#d5e6f6] text-[#083691]';
}

export default function VehicleRegistrationPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WizardData>(emptyForm);

  const ownerNameValid = ownerNamePattern.test(form.ownerName.trim().replace(/\s+/g, ' '));
  const phoneValid = phonePattern.test(form.phone.trim());
  const canAddVehicle = vehicles.length < 3;
  const hasPendingVehicle = vehicles.some((vehicle) => vehicle.status === 'PENDING');

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.get<Vehicle[]>('/vehicles/my');
      setVehicles(data);
      setShowWizard(data.length === 0);
    } catch (err: any) {
      setError(err.message || 'Không tải được danh sách xe.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const canNext = useMemo(() => {
    if (step === 0) return ownerNameValid && phoneValid;
    if (step === 1) {
      return form.licensePlate.trim().length >= 6 &&
        form.color.trim().length > 0 &&
        form.licensePlateImage !== null &&
        form.vehicleRegistrationImage !== null;
    }
    if (step === 2) return form.agreeTerms;
    return true;
  }, [form, ownerNameValid, phoneValid, step]);

  const startWizard = () => {
    setForm(emptyForm);
    setStep(0);
    setError('');
    setShowWizard(true);
  };

  const submitRegistration = async () => {
    try {
      setSubmitting(true);
      setError('');
      const licensePlateImageData = form.licensePlateImage ? await fileToDataUrl(form.licensePlateImage) : '';
      const vehicleRegistrationImageData = form.vehicleRegistrationImage ? await fileToDataUrl(form.vehicleRegistrationImage) : '';

      await api.post<Vehicle>('/vehicles', {
        ownerName: form.ownerName,
        phone: form.phone,
        licensePlate: form.licensePlate,
        color: form.color,
        licensePlateImageName: form.licensePlateImage?.name || '',
        licensePlateImageData,
        vehicleRegistrationImageName: form.vehicleRegistrationImage?.name || '',
        vehicleRegistrationImageData
      });
      setShowWizard(false);
      setForm(emptyForm);
      setStep(0);
      await loadVehicles();
    } catch (err: any) {
      setError(err.message || 'Không gửi được hồ sơ xe.');
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }
    submitRegistration();
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const deleteVehicle = async (vehicle: Vehicle) => {
    if (!window.confirm(`Xóa hồ sơ xe ${vehicle.licensePlate}?`)) return;

    try {
      setError('');
      await api.delete<{ ok: boolean }>(`/vehicles/${vehicle.id}`);
      await loadVehicles();
    } catch (err: any) {
      setError(err.message || 'Không xóa được hồ sơ xe.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Xe của tôi</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Đăng ký biển số xe máy</h1>
          </div>
        </div>
      </section>

      <section className="app-card space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="app-section-title">Hồ sơ xe</p>
            <h2 className="app-page-title mt-2">Danh sách xe đã đăng ký</h2>
          </div>
          {canAddVehicle && !showWizard && !hasPendingVehicle && (
            <button type="button" onClick={startWizard} className="app-button-primary px-4 py-3">
              Thêm xe
            </button>
          )}
        </div>

        {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
        {loading && <div className="rounded-2xl bg-bk-snow px-4 py-3 text-sm text-app-muted">Đang tải hồ sơ xe...</div>}

        {!loading && vehicles.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-[24px] border border-app-border bg-bk-white p-4 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-bold text-app-text">{vehicle.licensePlate}</div>
                    <div className="mt-1 text-sm text-app-muted">Xe máy - {vehicle.color}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone(vehicle.status)}`}>{statusLabel(vehicle.status)}</span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <VehicleImage label="Ảnh biển số" name={vehicle.licensePlateImageName} src={vehicle.licensePlateImageData} />
                  <VehicleImage label="Ảnh cà vẹt" name={vehicle.vehicleRegistrationImageName} src={vehicle.vehicleRegistrationImageData} />
                </div>

                <div className="mt-4 space-y-2 text-sm text-app-muted">
                  <div>Chủ xe: <span className="font-semibold text-app-text">{vehicle.ownerName}</span></div>
                  <div>SĐT: <span className="font-semibold text-app-text">{vehicle.phone}</span></div>
                  {vehicle.status === 'REJECTED' && (
                    <div className="rounded-2xl bg-red-50 px-3 py-2 font-semibold text-red-700">
                      Lý do từ chối: {vehicle.rejectionReason}
                    </div>
                  )}
                </div>

                <button type="button" onClick={() => deleteVehicle(vehicle)} className="mt-4 app-button-secondary px-4 py-2">
                  Xóa hồ sơ
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && !canAddVehicle && (
          <div className="rounded-2xl bg-bk-snow px-4 py-3 text-sm font-semibold text-app-muted">Bạn đã đạt giới hạn 3 xe.</div>
        )}

        {!loading && hasPendingVehicle && !showWizard && (
          <div className="rounded-2xl bg-[#d5e6f6] px-4 py-3 text-sm font-semibold text-[#083691]">
            Hồ sơ đang chờ duyệt.
          </div>
        )}

        {!loading && canAddVehicle && !showWizard && vehicles.length === 0 && (
          <button type="button" onClick={startWizard} className="app-button-primary px-4 py-3">
            Đăng ký xe đầu tiên
          </button>
        )}

        {showWizard && canAddVehicle && (
          <div className="rounded-[28px] border border-app-border bg-bk-snow p-5">
            <div className="flex flex-wrap items-center gap-2">
              {steps.map((label, idx) => (
                <div key={label} className={`rounded-full px-3 py-2 text-xs font-semibold ${idx <= step ? 'bg-[#0a47c2] text-[#FEFEFE]' : 'bg-bk-white text-app-muted'}`}>
                  {idx + 1}. {label}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] bg-bk-white p-5">
              {step === 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-app-text">Họ tên chủ xe</label>
                    <input className="app-input" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} placeholder="Nguyen Van A" />
                    {form.ownerName && !ownerNameValid && <p className="mt-2 text-xs font-semibold text-red-600">Họ tên chỉ gồm chữ cái và khoảng trắng, tối thiểu 2 ký tự.</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-app-text">Số điện thoại</label>
                    <input className="app-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0912345678" />
                    {form.phone && !phoneValid && <p className="mt-2 text-xs font-semibold text-red-600">Số điện thoại phải có dạng 0xxxxxxxxx hoặc +84xxxxxxxxx.</p>}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-app-text">Biển số</label>
                    <input className="app-input" value={form.licensePlate} onChange={(e) => setForm({ ...form, licensePlate: e.target.value.toUpperCase() })} placeholder="59-X1 123.45" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-app-text">Màu xe</label>
                    <input className="app-input" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="Đen" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-app-text">Ảnh biển số xe</label>
                    <input className="app-input" type="file" accept="image/*" onChange={(e) => setForm({ ...form, licensePlateImage: e.target.files?.[0] ?? null })} />
                    {form.licensePlateImage && <p className="mt-2 text-xs font-semibold text-app-muted">Đã chọn: {form.licensePlateImage.name}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-app-text">Ảnh cà vẹt xe</label>
                    <input className="app-input" type="file" accept="image/*" onChange={(e) => setForm({ ...form, vehicleRegistrationImage: e.target.files?.[0] ?? null })} />
                    {form.vehicleRegistrationImage && <p className="mt-2 text-xs font-semibold text-app-muted">Đã chọn: {form.vehicleRegistrationImage.name}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-app-text">Thông tin xác nhận</div>
                  <div className="grid gap-2 text-sm text-app-muted md:grid-cols-2">
                    <div>Chủ xe: <span className="font-semibold text-app-text">{form.ownerName}</span></div>
                    <div>SĐT: <span className="font-semibold text-app-text">{form.phone}</span></div>
                    <div>Biển số: <span className="font-semibold text-app-text">{form.licensePlate}</span></div>
                    <div>Loại xe: <span className="font-semibold text-app-text">Xe máy</span></div>
                    <div>Màu: <span className="font-semibold text-app-text">{form.color}</span></div>
                    <div>Ảnh biển số: <span className="font-semibold text-app-text">{form.licensePlateImage?.name}</span></div>
                    <div>Ảnh cà vẹt: <span className="font-semibold text-app-text">{form.vehicleRegistrationImage?.name}</span></div>
                    <div>Phương thức quét: <span className="font-semibold text-app-text">Thẻ sinh viên</span></div>
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm text-app-muted">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-app-border"
                      checked={form.agreeTerms}
                      onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                    />
                    <span>Tôi xác nhận thông tin đúng.</span>
                  </label>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button type="button" onClick={back} disabled={step === 0 || submitting} className="app-button-secondary px-4 py-3 disabled:opacity-50">
                Quay lại
              </button>
              <div className="flex gap-3">
                {vehicles.length > 0 && (
                  <button type="button" onClick={() => setShowWizard(false)} disabled={submitting} className="app-button-secondary px-4 py-3 disabled:opacity-50">
                    Hủy
                  </button>
                )}
                <button type="button" onClick={next} disabled={!canNext || submitting} className="app-button-primary px-4 py-3 disabled:opacity-50">
                  {step === 2 ? (submitting ? 'Đang gửi...' : 'Gửi duyệt') : 'Tiếp tục'}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
