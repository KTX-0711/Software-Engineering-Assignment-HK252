import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { IoTDevice, ParkingSpot } from '../types/domain';

type TargetStatus = ParkingSpot['status'];

const spotIds = ['A', 'B'].flatMap((area) => Array.from({ length: 40 }, (_, index) => `${area}${(index + 1).toString().padStart(2, '0')}`));

function statusLabel(status: TargetStatus) {
  if (status === 'Occupied') return 'Có xe';
  if (status === 'Maintenance') return 'Bảo trì';
  return 'Trống';
}

function deviceLabel(status?: IoTDevice['status']) {
  if (status === 'DATAERROR') return 'Lỗi dữ liệu';
  if (status === 'DATADELAY') return 'Trễ dữ liệu';
  if (status === 'OFFLINE') return 'Mất kết nối';
  return 'Hoạt động';
}

function spotTone(status: TargetStatus) {
  if (status === 'Occupied') return 'border-red-200 bg-red-50 text-red-700';
  if (status === 'Maintenance') return 'border-zinc-300 bg-zinc-100 text-zinc-700';
  return 'border-green-200 bg-green-50 text-green-700';
}

export default function DevControlPanel() {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [selectedSpotId, setSelectedSpotId] = useState('A01');
  const [targetStatus, setTargetStatus] = useState<TargetStatus>('Available');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedSpot = spots.find((spot) => spot.id === selectedSpotId);
  const selectedDevice = devices.find((device) => device.spotId === selectedSpotId);

  const counts = useMemo(() => ({
    available: spots.filter((spot) => spot.status === 'Available').length,
    occupied: spots.filter((spot) => spot.status === 'Occupied').length,
    maintenance: spots.filter((spot) => spot.status === 'Maintenance').length
  }), [spots]);

  const loadState = async () => {
    const [spotData, deviceData] = await Promise.all([
      api.get<ParkingSpot[]>('/parking/spots'),
      api.get<IoTDevice[]>('/mock/iot/devices')
    ]);
    setSpots(spotData);
    setDevices(deviceData);
  };

  useEffect(() => {
    loadState().catch((err: any) => setMessage(err.message || 'Không tải được trạng thái IoT.'));
  }, []);

  const applyStatus = async () => {
    const sensorId = `SENS_${selectedSpotId}`;
    try {
      setLoading(true);
      setMessage('');
      if (targetStatus === 'Maintenance') {
        await api.post('/mock/iot/fault', { sensorId, status: 'DATAERROR' });
      } else {
        await api.post('/mock/iot/trigger', { sensorId, detectObject: targetStatus === 'Occupied' });
      }
      await loadState();
      setMessage(`${selectedSpotId} đã chuyển sang ${statusLabel(targetStatus).toLowerCase()}.`);
    } catch (err: any) {
      setMessage(err.message || 'Không cập nhật được trạng thái IoT.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Điều khiển IoT</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Mô phỏng trạng thái vị trí</h1>
      </div>

      {message && <div className="mt-5 rounded-2xl bg-[#d5e6f6] px-4 py-3 text-sm font-semibold text-[#083691]">{message}</div>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
        <section className="app-card">
          <p className="app-section-title">Cập nhật cảm biến</p>
          <h2 className="app-page-title text-[1.7rem]">Chọn vị trí</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">Vị trí</label>
              <select className="app-input" value={selectedSpotId} onChange={(event) => setSelectedSpotId(event.target.value)}>
                {spotIds.map((spotId) => <option key={spotId} value={spotId}>{spotId}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">Trạng thái mới</label>
              <select className="app-input" value={targetStatus} onChange={(event) => setTargetStatus(event.target.value as TargetStatus)}>
                <option value="Available">Trống</option>
                <option value="Occupied">Có xe</option>
                <option value="Maintenance">Bảo trì</option>
              </select>
            </div>

            <div className={`rounded-2xl border px-4 py-4 text-sm ${spotTone(selectedSpot?.status || 'Available')}`}>
              <div className="font-bold">{selectedSpotId}</div>
              <div className="mt-1">Bãi xe: {statusLabel(selectedSpot?.status || 'Available')}</div>
              <div className="mt-1">IoT: {deviceLabel(selectedDevice?.status)}</div>
            </div>

            <button type="button" disabled={loading} onClick={applyStatus} className="app-button-primary w-full px-4 py-3 disabled:opacity-50">Cập nhật trạng thái</button>
          </div>
        </section>

        <section className="app-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="app-section-title">Dữ liệu hiện tại</p>
              <h2 className="app-page-title text-[1.7rem]">A01 - A40, B01 - B40</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-green-50 px-3 py-2 text-green-700">Trống {counts.available}</span>
              <span className="rounded-full bg-red-50 px-3 py-2 text-red-700">Có xe {counts.occupied}</span>
              <span className="rounded-full bg-zinc-100 px-3 py-2 text-zinc-700">Bảo trì {counts.maintenance}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {spotIds.map((spotId) => {
              const spot = spots.find((item) => item.id === spotId);
              return (
                <button
                  key={spotId}
                  type="button"
                  onClick={() => setSelectedSpotId(spotId)}
                  className={`h-11 rounded-xl border text-xs font-bold ${spotTone(spot?.status || 'Available')} ${selectedSpotId === spotId ? 'ring-2 ring-[#083691]' : ''}`}
                >
                  {spotId}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-8">
        <a href="/" className="text-app-accent underline">← Về trang chính</a>
      </div>
    </div>
  );
}
