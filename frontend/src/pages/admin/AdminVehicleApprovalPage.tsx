import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Vehicle } from '../../types/domain';

function VehicleImage({ label, name, src }: { label: string; name: string; src?: string }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-app-text">{label}</div>
      {src ? (
        <img src={src} alt={label} className="h-44 w-full rounded-2xl border border-app-border object-cover" />
      ) : (
        <div className="flex h-44 items-center justify-center rounded-2xl border border-dashed border-app-border bg-bk-snow px-3 text-center text-xs font-semibold text-app-muted">
          {name}
        </div>
      )}
    </div>
  );
}

export default function AdminVehicleApprovalPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.get<Vehicle[]>('/admin/vehicle-registrations?status=PENDING');
      setVehicles(data);
    } catch (err: any) {
      setError(err.message || 'Không tải được hồ sơ chờ duyệt.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const reviewVehicle = async (vehicle: Vehicle, decision: 'APPROVE' | 'REJECT') => {
    const reason = reasons[vehicle.id]?.trim();
    if (decision === 'REJECT' && !reason) {
      setError('Cần nhập lý do từ chối.');
      return;
    }

    try {
      setError('');
      await api.put<Vehicle>(`/admin/vehicle-registrations/${vehicle.id}/review`, {
        decision,
        reason
      });
      await loadVehicles();
    } catch (err: any) {
      setError(err.message || 'Không cập nhật được hồ sơ.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Hồ sơ xe</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Duyệt đăng ký xe</h1>
      </section>

      <section className="app-card space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="app-section-title">Hàng đợi duyệt</p>
            <h2 className="app-page-title mt-2">Hồ sơ đang chờ xác nhận</h2>
          </div>
          <button type="button" onClick={loadVehicles} className="app-button-secondary px-4 py-3">
            Tải lại
          </button>
        </div>

        {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
        {loading && <div className="rounded-2xl bg-bk-snow px-4 py-3 text-sm text-app-muted">Đang tải hồ sơ...</div>}

        {!loading && vehicles.length === 0 && (
          <div className="rounded-[24px] bg-bk-snow p-5 text-sm font-semibold text-app-muted">
            Không có hồ sơ xe đang chờ duyệt.
          </div>
        )}

        {!loading && vehicles.length > 0 && (
          <div className="grid gap-4 xl:grid-cols-2">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-[24px] border border-app-border bg-bk-white p-5 shadow-soft">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-xl font-bold text-app-text">{vehicle.licensePlate}</div>
                    <div className="mt-1 text-sm text-app-muted">Xe máy - {vehicle.color}</div>
                  </div>
                  <span className="rounded-full bg-[#d5e6f6] px-3 py-1 text-xs font-bold text-[#083691]">Đang chờ</span>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <VehicleImage label="Ảnh biển số" name={vehicle.licensePlateImageName} src={vehicle.licensePlateImageData} />
                  <VehicleImage label="Ảnh cà vẹt" name={vehicle.vehicleRegistrationImageName} src={vehicle.vehicleRegistrationImageData} />
                </div>

                <div className="mt-4 grid gap-2 text-sm text-app-muted md:grid-cols-2">
                  <div>Chủ xe: <span className="font-semibold text-app-text">{vehicle.ownerName}</span></div>
                  <div>SĐT: <span className="font-semibold text-app-text">{vehicle.phone}</span></div>
                  <div>Customer ID: <span className="font-semibold text-app-text">{vehicle.customerId}</span></div>
                  <div>Ngày gửi: <span className="font-semibold text-app-text">{new Date(vehicle.createdAt).toLocaleString('vi-VN')}</span></div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-app-text">Lý do từ chối</label>
                  <input
                    className="app-input"
                    value={reasons[vehicle.id] || ''}
                    onChange={(e) => setReasons({ ...reasons, [vehicle.id]: e.target.value })}
                    placeholder="Nhập nếu từ chối hồ sơ"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => reviewVehicle(vehicle, 'APPROVE')} className="app-button-primary px-4 py-3">
                    Duyệt
                  </button>
                  <button type="button" onClick={() => reviewVehicle(vehicle, 'REJECT')} className="app-button-secondary px-4 py-3">
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
