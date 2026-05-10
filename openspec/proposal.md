# Proposal: IoT-SPMS MVP demo

## Why

Dự án IoT-SPMS trong `docs/main.md` có phạm vi đầy đủ như một hệ thống bãi xe thông minh, nhưng nhóm cần MVP chạy được trong 1 ngày để demo use-case cốt lõi. Proposal này cắt hệ thống về phiên bản tối giản: có frontend để thao tác, backend để giữ nghiệp vụ, dữ liệu được lưu bằng file JSON tĩnh, toàn bộ hệ thống ngoài được mock.

## Goal

Xây dựng MVP chứng minh được luồng nghiệp vụ chính của IoT-SPMS:
- Đăng nhập theo role demo: `CUSTOMER`, `EMPLOYEE`, `ADMIN`.
- Xe thành viên vào/ra bãi bằng RFID và biển số.
- Khách vãng lai dùng thẻ tạm và thanh toán tiền mặt.
- IoT mock cập nhật trạng thái chỗ đỗ.
- BKPay mock đổi trạng thái hóa đơn/giao dịch.
- Admin xem dashboard, log, báo cáo tối giản, trạng thái cảm biến.

## MVP Scope

### Must-have trong 1 ngày

1. **Frontend demo UI**
   - Login page.
   - Customer dashboard: trạng thái phiên gửi xe, hóa đơn/giao dịch.
   - Employee panel: cấp thẻ khách, checkout thủ công, trigger gate in/out.
   - Admin dashboard: map bãi xe 10 slot, sensor status, logs, report summary, pricing setting tối giản.
   - Dev control panel: nút trigger mock gate, IoT, BKPay, monthly invoice.

2. **Backend API**
   - Auth mock bằng account hardcode/static JSON.
   - Parking session service.
   - RFID/vehicle/card/spot/device service.
   - Payment/invoice service.
   - Admin/report/log service.
   - `/api/mock/*` endpoints chỉ trigger event, không chứa business logic chính.

3. **Static JSON file storage**
   - Dùng JSON files trong `data/` thay vì DB thật.
   - Seed deterministic: accounts, RFID cards, vehicles, 10 parking spots, 10 sensors, pricing policy.
   - Ghi state trực tiếp vào file JSON để demo qua restart ngắn vẫn thấy dữ liệu.

4. **Mock external systems**
   - `MockSSOConnector`.
   - `MockDataCoreConnector`.
   - `MockBKPayService`.
   - Mock RFID/camera/IoT qua API hoặc control panel.

5. **Demo verification**
   - Member flow: login -> gate in -> IoT occupied -> gate out -> fee generated.
   - Guest flow: issue temporary card -> gate in/out -> cash payment -> session closed.
   - BKPay flow: unpaid invoice -> mock webhook -> paid.
   - IoT failure flow: sensor `DATAERROR`/`DATADELAY` visible on admin dashboard.
   - Monthly invoice flow: unpaid sessions -> invoice generated -> due date + reminder.

## Out of Scope

- Real HCMUT_SSO, HCMUT_DATACORE, BKPay integration.
- Real IoT hardware, gateway, firmware.
- AI license plate recognition.
- Real relational persistence, ORM, Docker/Kubernetes, CI/CD, monitoring stack.
- Full production security. MVP chỉ cần route guard demo-mode cho `/api/mock/*`.

## Proposed Stack

### Frontend

- **React + Vite + TypeScript**: setup nhanh, UI demo đủ tốt, ít ceremony.
- **Tailwind CSS**: dựng dashboard/control panel nhanh, không tốn design system.
- **React Router**: chia trang theo role.
- **TanStack Query hoặc fetch wrapper đơn giản**: nếu thời gian gấp, dùng `fetch` wrapper.

### Backend

- **Node.js + Express + TypeScript**: nhanh nhất cho MVP, API rõ, ít boilerplate hơn Spring Boot.
- **JSON file storage**: `fs/promises`, lưu ở `data/*.json`.
- **Zod**: validate request payload ở API boundary nếu có thời gian; nếu quá gấp, validate thủ công payload chính.

### Data

- `data/accounts.json`
- `data/rfidCards.json`
- `data/vehicles.json`
- `data/parkingSpots.json`
- `data/iotDevices.json`
- `data/parkingSessions.json`
- `data/transactions.json`
- `data/invoices.json`
- `data/logs.json`
- `data/pricingPolicy.json`

## FE/BE Boundary

- Frontend chỉ hiển thị state và gửi commands.
- Backend giữ business logic: tạo session, tính phí, đổi trạng thái spot, tạo invoice, ghi log.
- Mock route chỉ đóng vai trò simulation harness.
- Static JSON là persistence layer đơn giản, không để frontend đọc trực tiếp.

## Success Criteria

- Chạy được frontend và backend local.
- Demo được 5 flow chính bằng UI hoặc curl.
- State sau mỗi thao tác lưu trong JSON file.
- Admin dashboard nhìn thấy parking map, sensor lỗi, logs, report summary.
- Không cần production-grade completeness; chỉ cần đủ thuyết phục yêu cầu trong `docs/main.md`.
