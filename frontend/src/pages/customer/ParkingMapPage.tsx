import ParkingMap from '../../components/ParkingMap';

export default function ParkingMapPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Bãi xe</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Tình trạng chỗ đỗ</h1>
          </div>
        </div>
      </section>

      <ParkingMap />
    </div>
  );
}
