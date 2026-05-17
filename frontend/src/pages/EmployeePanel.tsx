import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { ParkingSession } from '../types/domain';

const students = [
  { cardId: 'RFID_SV001', studentId: '2311301', accountName: 'Nguyễn Văn Hùng', licensePlate: '59-X1 123.45' },
  { cardId: 'RFID_SV003', studentId: '2313626', accountName: 'Trần Minh Trí', licensePlate: '59-X3 231.26' },
  { cardId: 'RFID_SV004', studentId: '2313638', accountName: 'Nguyễn Lưu Khánh Trình', licensePlate: '59-X3 231.38' },
  { cardId: 'RFID_SV002', studentId: '2313898', accountName: 'Nguyễn Tô Quốc Việt', licensePlate: '51-A1 999.99' },
  { cardId: 'RFID_SV005', studentId: '2313912', accountName: 'Lê Công Vinh', licensePlate: '59-X3 231.12' }
];

const guestCard = { cardId: 'RFID_GUEST_001', label: 'Parking Card #001' };
const studentIdPattern = /^\d{7}$/;

function formatCurrency(value: number) {
  return value.toLocaleString('vi-VN') + ' VND';
}

function formatDateTime(value?: string) {
  if (!value) return '--';
  return new Date(value).toLocaleString('vi-VN');
}

function statusLabel(status: ParkingSession['status']) {
  if (status === 'Active') return 'Đang gửi';
  if (status === 'ReadyToPay') return 'Chờ thu tiền';
  if (status === 'Completed') return 'Đã hoàn tất';
  return 'Đã hủy';
}

function statusClass(status: ParkingSession['status']) {
  if (status === 'Active') return 'bg-[#d5e6f6] text-[#083691]';
  if (status === 'ReadyToPay') return 'bg-yellow-100 text-yellow-800';
  if (status === 'Completed') return 'bg-green-100 text-green-700';
  return 'bg-red-100 text-red-700';
}

export default function EmployeePanel() {
  const [sessions, setSessions] = useState<ParkingSession[]>([]);
  const [studentId, setStudentId] = useState('');
  const [memberPlate, setMemberPlate] = useState('');
  const [guestPlate, setGuestPlate] = useState('');
  const [pendingCashSession, setPendingCashSession] = useState<ParkingSession | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedStudent = students.find((student) => student.studentId === studentId.trim());
  const activeSessions = useMemo(() => sessions.filter((session) => session.status === 'Active'), [sessions]);

  const loadSessions = async () => {
    const all = await api.get<ParkingSession[]>('/parking/sessions');
    setSessions(all);
  };

  useEffect(() => {
    loadSessions().catch((err: any) => setMessage(err.message || 'Không tải được phiên gửi xe.'));
  }, []);

  const runSessionAction = async (label: string, action: () => Promise<ParkingSession>) => {
    try {
      setLoading(true);
      setMessage('');
      await action();
      setMessage(label);
      await loadSessions();
    } catch (err: any) {
      setMessage(err.message || 'Thao tác thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const requireStudent = () => {
    if (!studentIdPattern.test(studentId.trim())) throw new Error('MSSV phải gồm 7 chữ số.');
    if (!selectedStudent) throw new Error('Không tìm thấy tài khoản sinh viên cho MSSV này.');
    return selectedStudent;
  };

  const memberGateIn = () => runSessionAction('Đã ghi nhận xe sinh viên vào bãi.', async () => {
    const student = requireStudent();
    return api.post<ParkingSession>('/mock/gate/in', { cardId: student.cardId, licensePlate: memberPlate.trim() });
  });

  const memberGateOut = () => runSessionAction('Đã ghi nhận xe sinh viên rời bãi.', async () => {
    const student = requireStudent();
    return api.post<ParkingSession>('/mock/gate/out', { cardId: student.cardId });
  });

  const guestGateIn = () => runSessionAction(`Đã cấp ${guestCard.label} và ghi nhận xe khách vào bãi.`, () => api.post<ParkingSession>('/mock/gate/in', { cardId: guestCard.cardId, licensePlate: guestPlate.trim() }));

  const previewGuestGateOut = async () => {
    try {
      setLoading(true);
      setMessage('');
      const session = await api.post<ParkingSession>('/mock/gate/out/preview', { cardId: guestCard.cardId });
      setPendingCashSession(session);
      await loadSessions();
    } catch (err: any) {
      setMessage(err.message || 'Không tìm thấy xe khách đang gửi bằng Parking Card này.');
    } finally {
      setLoading(false);
    }
  };

  const confirmGuestCheckout = async () => {
    if (!pendingCashSession) return;

    try {
      setLoading(true);
      const session = await api.post<ParkingSession>('/mock/gate/out', { cardId: guestCard.cardId });
      await api.post<{ success: boolean }>('/payments/cash-confirm', { sessionId: session.id });
      setPendingCashSession(null);
      setMessage('Đã thu tiền mặt và cho xe khách rời bãi.');
      await loadSessions();
    } catch (err: any) {
      setMessage(err.message || 'Không xác nhận được xe khách rời bãi.');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentIdChange = (value: string) => {
    const next = value.replace(/\D/g, '').slice(0, 7);
    setStudentId(next);
    const student = students.find((item) => item.studentId === next);
    if (student) setMemberPlate(student.licensePlate);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-[#083691] px-6 py-6 text-[#FEFEFE] shadow-soft lg:px-8 lg:py-7">
        <p className="text-sm uppercase tracking-[0.34em] text-[#d5e6f6]">Vận hành bãi xe</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#FEFEFE] lg:text-[2.4rem]">Quầy nhân viên</h1>
      </section>

      {message && <div className="rounded-2xl bg-[#d5e6f6] px-4 py-3 text-sm font-semibold text-[#083691]">{message}</div>}

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="app-card">
          <p className="app-section-title">Sinh viên</p>
          <h2 className="app-page-title text-[1.7rem]">Quét thẻ sinh viên</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">MSSV</label>
              <input className="app-input" value={studentId} onChange={(event) => handleStudentIdChange(event.target.value)} placeholder="2313898" inputMode="numeric" />
              {studentId && !studentIdPattern.test(studentId) && <p className="mt-2 text-xs font-semibold text-red-600">MSSV gồm 7 chữ số.</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">Biển số camera đọc</label>
              <input className="app-input" value={memberPlate} onChange={(event) => setMemberPlate(event.target.value.toUpperCase())} placeholder="59-X1 123.45" />
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-bk-snow px-4 py-4 text-sm text-app-muted">
            {selectedStudent ? (
              <>
                <div>Chủ xe: <span className="font-semibold text-app-text">{selectedStudent.accountName}</span></div>
                <div className="mt-1">MSSV: <span className="font-semibold text-app-text">{selectedStudent.studentId}</span></div>
              </>
            ) : (
              <div>Nhập MSSV để tra cứu tài khoản.</div>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" disabled={loading} onClick={memberGateIn} className="app-button-primary px-4 py-3 disabled:opacity-50">Xe vào</button>
            <button type="button" disabled={loading} onClick={memberGateOut} className="app-button-secondary px-4 py-3 disabled:opacity-50">Xe ra</button>
          </div>
        </section>

        <section className="app-card">
          <p className="app-section-title">Khách vãng lai</p>
          <h2 className="app-page-title text-[1.7rem]">Cấp Parking Card</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-app-muted">Parking Card</div>
              <div className="mt-2 text-xl font-bold text-app-text">{guestCard.label}</div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-app-text">Biển số khách</label>
              <input className="app-input" value={guestPlate} onChange={(event) => setGuestPlate(event.target.value.toUpperCase())} placeholder="59-X1 123.45" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" disabled={loading} onClick={guestGateIn} className="app-button-primary px-4 py-3 disabled:opacity-50">Cấp thẻ và cho vào</button>
            <button type="button" disabled={loading} onClick={previewGuestGateOut} className="app-button-secondary px-4 py-3 disabled:opacity-50">Quét thẻ ra</button>
          </div>
        </section>
      </div>

      <section className="app-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="app-section-title">Phiên gửi xe</p>
            <h2 className="app-page-title text-[1.7rem]">Đang xử lý</h2>
          </div>
          <span className="app-chip">{activeSessions.length} xe trong bãi</span>
        </div>

        <div className="mt-5 space-y-3">
          {sessions.length === 0 && <div className="rounded-2xl bg-bk-snow px-4 py-6 text-sm text-app-muted">Chưa có phiên gửi xe.</div>}
          {sessions.map((session) => (
            <div key={session.id} className="rounded-2xl border border-app-border bg-bk-white px-4 py-4 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-bold text-app-text">{session.licensePlate}</div>
                  <div className="mt-1 text-sm text-app-muted">{session.cardId} - {session.id}</div>
                  <div className="mt-1 text-sm text-app-muted">Vào: {formatDateTime(session.checkInTime)}</div>
                  {session.checkOutTime && <div className="mt-1 text-sm text-app-muted">Ra: {formatDateTime(session.checkOutTime)}</div>}
                </div>
                <div className="text-right">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(session.status)}`}>{statusLabel(session.status)}</span>
                  <div className="mt-3 text-lg font-bold text-app-text">{formatCurrency(session.fee)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {pendingCashSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-bk-white p-6 shadow-soft">
            <p className="app-section-title">Thu tiền khách vãng lai</p>
            <h3 className="mt-2 text-2xl font-bold text-app-text">{pendingCashSession.licensePlate}</h3>
            <div className="mt-5 rounded-2xl bg-bk-snow px-4 py-4">
              <div className="text-sm text-app-muted">Số tiền cần thu</div>
              <div className="mt-2 text-3xl font-bold text-[#083691]">{formatCurrency(pendingCashSession.fee)}</div>
              <div className="mt-2 text-sm text-app-muted">{guestCard.label} - {pendingCashSession.id}</div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" disabled={loading} onClick={() => setPendingCashSession(null)} className="app-button-secondary px-4 py-3 disabled:opacity-50">Hủy</button>
              <button type="button" disabled={loading} onClick={confirmGuestCheckout} className="app-button-primary px-4 py-3 disabled:opacity-50">Đã thu tiền</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
