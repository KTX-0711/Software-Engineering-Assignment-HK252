import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { ParkingSpot } from '../types/domain';

function spotTone(status: ParkingSpot['status']) {
  if (status === 'Occupied') return 'bg-red-500 text-[#111112]';
  if (status === 'Maintenance') return 'bg-zinc-500 text-[#FEFEFE]';
  return 'bg-green-400 text-[#111112]';
}

function createDemoSpot(id: string, status: ParkingSpot['status'] = 'Available'): ParkingSpot {
  return { id, floor: '1', status };
}

export default function ParkingMap() {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);

  const fetchSpots = async () => {
    try {
      const data = await api.get<ParkingSpot[]>('/parking/spots');
      setSpots(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSpots();
    const timer = setInterval(fetchSpots, 5000);
    return () => clearInterval(timer);
  }, []);

  const areas = useMemo(() => {
    const sorted = [...spots].sort((a, b) => a.id.localeCompare(b.id));
    const areaA = Array.from({ length: 40 }, (_, index) => sorted[index] || createDemoSpot(`A${(index + 1).toString().padStart(2, '0')}`, [0, 1, 3, 6, 8, 11, 13, 16, 18, 21, 23, 26, 28, 30, 33, 35, 37, 39].includes(index) ? 'Occupied' : 'Available'));
    const areaB = Array.from({ length: 40 }, (_, index) => sorted[index + 40] || createDemoSpot(`B${(index + 1).toString().padStart(2, '0')}`, [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26, 27, 29, 31, 33, 34, 36, 38, 39].includes(index) ? 'Occupied' : 'Available'));
    return [
      { name: 'Khu A', spots: areaA },
      { name: 'Khu B', spots: areaB }
    ];
  }, [spots]);

  const visibleSpots = areas.flatMap((area) => area.spots);
  const availableCount = visibleSpots.filter((spot) => spot.status === 'Available').length;
  const occupiedCount = visibleSpots.filter((spot) => spot.status === 'Occupied').length;
  const maintenanceCount = visibleSpots.filter((spot) => spot.status === 'Maintenance').length;

  return (
    <div className="rounded-[32px] border border-app-border bg-bk-white p-5 shadow-soft lg:p-6">
      <div className="flex flex-col gap-4 border-b border-app-border pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="app-section-title">Sơ đồ bãi xe</p>
          <h3 className="text-2xl font-bold text-app-text">Khu A và Khu B</h3>
          <p className="mt-2 text-sm text-app-muted">Khu A vào/ra bên trái. Khu B vào/ra bên phải.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-bk-snow px-4 py-3">
            <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Trống</div>
            <div className="mt-2 text-xl font-bold text-app-text">{availableCount}</div>
          </div>
          <div className="rounded-2xl bg-cobalt-blue-50 px-4 py-3">
            <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Có xe</div>
            <div className="mt-2 text-xl font-bold text-app-text">{occupiedCount}</div>
          </div>
          <div className="rounded-2xl bg-zinc-100 px-4 py-3">
            <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Bảo trì</div>
            <div className="mt-2 text-xl font-bold text-app-text">{maintenanceCount}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {areas.map((area) => {
          const isAreaB = area.name === 'Khu B';
          const topRows = [area.spots.slice(0, 10), area.spots.slice(10, 20)];
          const bottomRows = [area.spots.slice(20, 30), area.spots.slice(30, 40)];

          return (
            <section key={area.name} className="rounded-[28px] bg-bk-snow p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="text-lg font-bold text-app-text">{area.name}</h4>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-app-muted">40 vị trí</span>
              </div>

              <div className="space-y-2">
                {topRows.map((row, rowIndex) => (
                  <div key={`top-${rowIndex}`} className="grid grid-cols-10 gap-2">
                    {row.map((spot) => (
                      <div
                        key={spot.id}
                        title={`${spot.id} - ${spot.status}`}
                        className={`flex h-10 items-center justify-center rounded-lg text-[11px] font-bold shadow-sm sm:h-12 sm:text-xs ${spotTone(spot.status)}`}
                      >
                        {spot.id}
                      </div>
                    ))}
                  </div>
                ))}

                <div className={isAreaB ? 'grid grid-cols-[1fr_110px] gap-2' : 'grid grid-cols-[110px_1fr] gap-2'}>
                  {!isAreaB && <div className="flex h-9 items-center justify-center rounded-xl bg-[#083691] text-xs font-bold uppercase tracking-[0.16em] text-[#FEFEFE]">In / Out</div>}
                  <div className="flex h-9 items-center justify-center rounded-xl border border-dashed border-app-border bg-bk-white text-xs font-semibold uppercase tracking-[0.24em] text-app-muted">
                    Lối đi trung tâm
                  </div>
                  {isAreaB && <div className="flex h-9 items-center justify-center rounded-xl bg-[#083691] text-xs font-bold uppercase tracking-[0.16em] text-[#FEFEFE]">In / Out</div>}
                </div>

                {bottomRows.map((row, rowIndex) => (
                  <div key={`bottom-${rowIndex}`} className="grid grid-cols-10 gap-2">
                    {row.map((spot) => (
                      <div
                        key={spot.id}
                        title={`${spot.id} - ${spot.status}`}
                        className={`flex h-10 items-center justify-center rounded-lg text-[11px] font-bold shadow-sm sm:h-12 sm:text-xs ${spotTone(spot.status)}`}
                      >
                        {spot.id}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-sm text-app-muted">
        <div className="inline-flex items-center gap-2 rounded-full bg-bk-snow px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span>Chỗ trống</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-bk-snow px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span>Đã có xe</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-bk-snow px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
          <span>Bảo trì</span>
        </div>
      </div>
    </div>
  );
}
