# Hướng Dẫn Chiến Lược Giả Lập Dữ Liệu (Mock Data) Cho Dự Án IoT-SPMS

Tài liệu này mô tả chi tiết cách giả lập (mock) toàn bộ dữ liệu và luồng sự kiện cho hệ thống Quản lý Bãi đỗ xe thông minh (IoT-SPMS) trong giai đoạn phát triển, khi bạn không có sẵn phần cứng thật (cảm biến, thẻ RFID, barie) cũng như không có quyền truy cập vào hệ thống thật của trường (HCMUT_SSO, HCMUT_DATACORE, BKPay).

## 1. Giả lập Các Hệ Thống Ngoại Vi (Boundary Classes)

Thay vì gọi API thực tế của trường, ta sẽ viết lại các class Boundary trả về dữ liệu cứng (hardcode) hoặc đọc từ file JSON tĩnh.

### 1.1. Giả lập `HCMUTSSOConnector` (Xác thực đăng nhập)
Tạo một danh sách tài khoản hợp lệ sẵn trong bộ nhớ (In-memory Dictionary/Map).
* **Logic giả lập:** Khi hàm `authenticateUser(user, pass)` được gọi, không gọi HTTP Request ra ngoài mà so sánh trực tiếp với danh sách hardcode.
* **Dữ liệu mẫu:**
    ```json
    [
      {"username": "hung.nguyen2311301", "password": "password123", "accountID": "SV001"},
      {"username": "admin.baixe", "password": "adminpassword", "accountID": "AD001"},
      {"username": "staff.nguyenvan", "password": "staffpassword", "accountID": "NV001"}
    ]
    ```

### 1.2. Giả lập `HCMUTDataCoreConnector` (Lấy vai trò và thông tin)
* **Logic giả lập:** Khi hàm `fetchUserRole(accountID)` được gọi, hệ thống nội bộ sẽ dựa vào tiền tố của `accountID` để cấp quyền (RoleEnum).
    * Tiền tố `SV` hoặc `CB` -> Trả về role `CUSTOMER`.
    * Tiền tố `NV` -> Trả về role `EMPLOYEE`.
    * Tiền tố `AD` -> Trả về role `ADMIN`.

### 1.3. Giả lập Cổng Thanh Toán `BKPay`
* **Logic giả lập:** Không gọi API của ngân hàng. Tạo một API nội bộ tên là `/api/mock/bkpay-webhook`. Khi khách hàng (MemberCustomer) gọi hàm `payInvoice()`, hệ thống giả lập sẽ chờ 2 giây (sleep) rồi tự động gọi ngược lại API Webhook này với payload thành công để đổi trạng thái `Transaction` từ `Unpaid` sang `Paid`.

---

## 2. Khởi tạo Dữ Liệu Gốc (Database Seeding)

Khi hệ thống khởi động (chạy server), cần có một Script tự động "bơm" (seed) dữ liệu giả vào Database (hoặc danh sách In-memory) để có cái test ngay.

### 2.1. Dữ liệu Bãi xe & Thiết bị IoT
* **Phải tạo đủ 1 cặp `ParkingSpot` đi kèm với `IoTDevice`**.
* **Mẫu tạo 10 vị trí đỗ xe:** Chạy vòng lặp từ 1 đến 10.
    * `ParkingSpot`: `spotID` = "A01", `status` = `Available`.
    * `IoTDevice`: `sensorId` = "SENS_A01", `slotId` = "A01", `status` = `ACTIVE`, `batteryLevel` = 100.0.

### 2.2. Dữ liệu Thẻ RFID (`RFIDCard`)
Tạo sẵn 2 loại thẻ dựa theo Enum `CardType`:
* **Thẻ sinh viên (REGISTERED):** `cardID`: "RFID_SV001", `isAssigned`: true (Gắn với Account SV001).
* **Thẻ khách vãng lai (TEMPORARY):** `cardID`: "RFID_GUEST_01", `cardID`: "RFID_GUEST_02", `isAssigned`: false. Trữ sẵn tại trạm bảo vệ.

### 2.3. Dữ liệu Phương tiện (`Vehicle`)
Gắn một số xe mặc định cho sinh viên:
* `vehicleID`: "VEH_01", `customerID`: "SV001", `licensePlate`: "59-X1 123.45".

---

## 3. Giả Lập Luồng Sự Kiện Phần Cứng & Giao Thông

Bởi vì bạn không có xe máy thật chạy ra/vào và cũng không có cảm biến quét vật cản, bạn cần tạo một **"Màn hình Control Panel dành riêng cho Developer"** hoặc dùng **Postman** để bắn API giả lập sự kiện.

### 3.1. Giả lập xe chạy qua cổng (Quẹt thẻ)
Tạo 2 API ẩn (chỉ dùng cho Dev/Test):
* `POST /api/mock/gate/in`: Bắn payload `{"rfidCardID": "RFID_SV001", "licensePlate_Camera": "59-X1 123.45"}`.
    * *Hệ thống sẽ chạy logic:* Gọi `ParkingSession.processAutoCheckIn()`.
* `POST /api/mock/gate/out`: Bắn payload `{"rfidCardID": "RFID_SV001"}`.
    * *Hệ thống sẽ chạy logic:* Gọi `ParkingSession.processAutoCheckOut()` và tính tiền.

### 3.2. Giả lập cảm biến IoT (`detectVehicle` và `sendData`)
Thay vì cảm biến vật lý tự phát hiện, bạn tạo một API để "kích hoạt" cảm biến:
* `POST /api/mock/iot/trigger`: Payload `{"sensorId": "SENS_A01", "detectObject": true}`
    * Khi gọi API này, hệ thống giả lập gọi hàm `IoTDevice.sendData()`, đẩy trạng thái "Occupied" về Server. Server gọi tiếp `ParkingSpot.updateState()` để đổi màu bãi xe trên UI.
* **Mẹo:** Để test UI thời gian thực (Dashboard), hãy viết một script nhỏ bằng Python hoặc JS chạy ngầm, cứ mỗi 30 giây lại random chọn 1 vị trí đỗ xe trống và bắn API giả lập có xe vào đỗ.

### 3.3. Giả lập mất kết nối mạng của IoT
* Chuyển trạng thái `IoTDevice_Status` của "SENS_A02" sang `DATAERROR` hoặc tắt ping đi.
* Kiểm tra xem hệ thống có tự động báo động trên màn hình Admin không. Kích hoạt thử hàm `storeLocally()` lưu file text tạm ở máy tính Dev thay vì thẻ nhớ EEPROM, sau đó gọi `syncToServer()` đọc file text đó đẩy lên.

---

## 4. Giả Lập Trục Thời Gian (Time Travel) Để Tính Tiền

Một trong những phần khó nhất là test logic tính tiền (`ParkingSession.calculateFee()`) và xuất hóa đơn tháng (`Invoice.generateInvoice()`). Bạn không thể đợi 1 tháng để xem code có chạy đúng không.

### 4.1. Giả lập thời gian phiên gửi xe
Sửa đổi API `/api/mock/gate/out` để có thể nhận thêm biến `mockCheckOutTime`.
* Xe vào lúc: `08:00 AM hôm nay`.
* Gửi lệnh Out: `{"rfidCardID": "RFID_SV001", "mockCheckOutTime": "20:00 PM cùng ngày"}`.
* Hệ thống sẽ dùng `mockCheckOutTime` để trừ đi `checkInTime` ra 12 tiếng -> Test xem logic giá tiền ngày/đêm có đúng không.

### 4.2. Giả lập Cron Job (Hóa đơn cuối tháng)
Hệ thống thật sẽ chạy Job vào 23:59 ngày cuối tháng.
* Tạo một API `POST /api/mock/jobs/generate-monthly-invoice`.
* Khi bạn bấm gọi API này, hệ thống lập tức gom tất cả `ParkingSession` chưa thanh toán trong DB, tạo `Invoice`, set `dueDate` là 5 ngày sau và gửi thông báo, bỏ qua kiểm tra ngày tháng thực tế.

---

## 5. Kịch Bản Test (Test Scenarios) Tự Động Gợi Ý

Để chắc chắn Class Diagram và Logic của bạn đúng, hãy dùng Postman chạy theo chuỗi sau:

1.  **Kịch bản Khách Thành Viên:**
    * Gọi Auth: Đăng nhập `SV001`.
    * Gọi Gate IN: Quẹt thẻ `RFID_SV001`. (Session tạo ra -> Status Đang trong bãi).
    * Gọi IoT Trigger: Báo có xe đỗ tại ô `A01`. (UI hiện ô đỏ).
    * Gọi IoT Trigger: Báo xe dời đi ô `A01`. (UI hiện ô xanh).
    * Gọi Gate OUT: Quẹt thẻ `RFID_SV001` giả lập thời gian qua 1 đêm.
    * Kiểm tra DB: `ParkingSession` đã có `fee` > 0.
2.  **Kịch bản Khách Vãng Lai:**
    * Gọi Mock Nhân Viên: Gọi hàm `Employee.issueTemporaryCard()`. Hệ thống lấy `RFID_GUEST_01` ra khởi tạo.
    * ... (xe đỗ, xe ra)
    * Gọi Mock Nhân Viên: Khách trả tiền mặt, gọi `Employee.confirmManualCheckout()` -> Kết thúc phiên.

## 6. Lời khuyên Kiến trúc
Để code không bị rác bởi các dòng code giả lập, hãy sử dụng **Dependency Injection (DI)** hoặc **Interface**.
Ví dụ: Tạo Interface `IAuthenticationService`.
* Trong môi trường `Production`: Class `HCMUTSSOConnector` implement Interface này và gọi HTTP thật.
* Trong môi trường `Development/Mock`: Class `MockSSOConnector` implement Interface này và trả về dữ liệu hardcode (như mục 1.1).
* Chỉ cần đổi cấu hình khởi chạy, bạn có thể chuyển từ môi trường giả lập sang môi trường thật mà không cần sửa code logic.