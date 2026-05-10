ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH
TRƯỜNG ĐẠI HỌC BÁCH KHOA
KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH
BÁO CÁO BTL LẦN 2
CÔNG NGHỆ PHẦN MỀM (CO3001)
Lớp: A01 - Nhóm 1
GVHD: Mai Đức Trung
STT Họ và tên MSSV Tên lớp Tên ngành
1 Nguyễn Văn Hùng 2311301 A01 Kỹ thuật máy tính
2 Trần Minh Trí 2313626 A01 Kỹ thuật máy tính
3 Nguyễn Lưu Khánh Trình 2313638 A01 Kỹ thuật máy tính
4 Nguyễn Tô Quốc Việt 2313898 A01 Kỹ thuật máy tính
5 Lê Công Vinh 2313912 A01 Kỹ thuật máy tính
THÀNH PHỐ HỒ CHÍ MINH, THÁNG 4 NĂM 2026

|     | Trường | Đại học  | Bách | Khoa Tp. | Hồ  | Chí Minh |                |
| --- | ------ | -------- | ---- | -------- | --- | -------- | -------------- |
|     | Khoa   | Khoa học | và   | Kỹ thuật | Máy | tính     |                |
|     | BẢNG   | PHÂN     | CHIA | CÔNG     |     | VIỆC     |                |
| STT |        | Họvàtên  | MSSV | Đónggóp  |     |          | Côngviệccánhân |
1 NguyễnVănHùng 2311301 100% Scenariochonhómthanhtoánvàcácdiagramtươngứng
2 TrầnMinhTrí 2313626 100% Scenariochonhómtiệníchbãixevàcácdiagramtươngứng
3 NguyễnLưuKhánhTrình 2313638 100% Scenariochonhómcácchứcnăngquảnlýtàikhoảnvàcácdiagramtươngứng
4 NguyễnTôQuốcViệt 2313898 100% ScenariochonhómAdminvàcácdiagramtươngứng
5 LêCôngVinh 2313912 100% ScenariochonhómIoTvàcácdiagramtươngứng
Trang 1/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
Mục lục
Danh sách hình vẽ 5
1 Tổng quan dự án 7
1.1 Bối cảnh dự án . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
1.2 Mục tiêu dự án . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
1.3 Stakeholders . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
1.4 Phạm vi dự án . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
1.5 Quy trình nghiệp vụ cốt lõi . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
2 Tổng quan chức năng và ranh giới hệ thống 10
2.1 Tổng quan chức năng . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
2.1.1 Nhóm chức năng hướng người dùng . . . . . . . . . . . . . . . . . . 11
2.1.2 Nhóm chức năng hướng vận hành . . . . . . . . . . . . . . . . . . . 11
3 Ranh giới hệ thống 12
3.0.1 Bên trong ranh giới hệ thống . . . . . . . . . . . . . . . . . . . . . . 12
3.0.2 Bên ngoài ranh giới hệ thống . . . . . . . . . . . . . . . . . . . . . . 12
4 Screnario và các diagram cho các nhóm chức năng 13
4.1 Nhóm chức năng quản lý tài khoản . . . . . . . . . . . . . . . . . . . . . . 13
4.1.1 Use-case U1.1: Đăng nhập vào hệ thống xác thực tập trung (SSO) . 13
4.2 Nhóm tiện ích bãi xe . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16
4.2.1 Use-case U2.1: Xác nhận và ghi nhận ra vào tự động . . . . . . . . . 16
4.2.2 Use-case U2.2: Xác nhận ra vào thủ công . . . . . . . . . . . . . . . 19
4.2.3 Use-case U2.3: Đăng ký biển số xe . . . . . . . . . . . . . . . . . . . 22
4.2.4 Use-case U2.4: Đăng ký / Gia hạn gói theo tháng . . . . . . . . . . . 25
4.3 Nhóm thanh toán . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
4.3.1 Use-case U3.1: Xem lịch sử giao dịch cá nhân . . . . . . . . . . . . . 28
4.3.2 Use-case U3.2: Thanh toán hóa đơn . . . . . . . . . . . . . . . . . . 30
4.3.3 Use-case U3.3: Thanh toán thủ công . . . . . . . . . . . . . . . . . . 32
4.4 Nhóm IoT . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 34
4.4.1 Use-case U4.1: Cập nhật trạng thái vị trí đỗ . . . . . . . . . . . . . 34
4.4.2 Use-case U4.2: Hiển thị trạng thái bãi xe . . . . . . . . . . . . . . . 36
4.4.3 Use-case U4.3: Thông báo cảm biến lỗi . . . . . . . . . . . . . . . . 38
4.5 Nhóm Admin . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
4.5.1 Use-case 5.2: Quản lý tài khoản nhân viên . . . . . . . . . . . . . . . 40
4.5.2 Use-case 5.3: Xuất báo cáo . . . . . . . . . . . . . . . . . . . . . . . 44
4.5.3 Use-case 5.4: Thay đổi chính sách giá . . . . . . . . . . . . . . . . . 48
4.5.4 Use-case 5.5: Truy cập nhật ký hệ thống . . . . . . . . . . . . . . . . 52
4.5.5 Use-case 5.6: Giám sát tình trạng bãi đỗ xe . . . . . . . . . . . . . . 56
4.6 Một số state chart cho toàn hệ thống . . . . . . . . . . . . . . . . . . . . . 62
Trang 2/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
4.7 Development / Implementation View . . . . . . . . . . . . . . . . . . . . . 63
4.7.1 Component Diagram . . . . . . . . . . . . . . . . . . . . . . . . . . 63
4.8 Cấu trúc mã nguồn và Tổ chức Package . . . . . . . . . . . . . . . . . . . . 63
4.8.1 Cấu trúc Backend Core (Spring Boot / Node.js) . . . . . . . . . . . 63
4.8.2 Cấu trúc Frontend (React) . . . . . . . . . . . . . . . . . . . . . . . 64
4.8.3 Quản lý phụ thuộc và Thư viện sử dụng . . . . . . . . . . . . . . . . 64
4.9 Deployment View . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
4.10 Deployment View . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 65
4.10.1 Mô tả các thực thể và Các thành phần . . . . . . . . . . . . . . . . 65
4.10.2 Giao thức giao tiếp (Communication Protocols) . . . . . . . . . . . . 66
5 UI design 67
5.1 Giao diện bắt đầu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 67
5.2 Giao diện đăng ký biển số xe . . . . . . . . . . . . . . . . . . . . . . . . . . 68
5.3 Các giao diện cho các tiện ích khác của người dùng . . . . . . . . . . . . . 70
5.4 Các giao diện cho Admin . . . . . . . . . . . . . . . . . . . . . . . . . . . . 71
6 Các non-interactive functional requirement 71
7 Các non-functional requirement 72
8 Danh sách các Method và Class Diagram 73
8.1 Các Enumeration trong Class Diagram . . . . . . . . . . . . . . . . . . . . 73
8.2 Các Class trong Class Diagram . . . . . . . . . . . . . . . . . . . . . . . . . 75
8.2.1 Lớp thực thể: Account (Tài khoản) . . . . . . . . . . . . . . . . . . . 75
8.2.2 Lớp thực thể: UserSession (Phiên làm việc) . . . . . . . . . . . . . . 75
8.2.3 Lớp điều khiển: AuthenticationController . . . . . . . . . . . . . . . 76
8.2.4 Lớp biên: MockSSOConnector và MockDataCoreConnector . . . . 76
8.2.5 Lớp thực thể: ParkingSession (Phiên gửi xe) . . . . . . . . . . . . . 76
8.2.6 Lớp thực thể: ParkingSpot (Vị trí đỗ xe) . . . . . . . . . . . . . . . 77
8.2.7 Lớp thực thể: Vehicle (Phương tiện) . . . . . . . . . . . . . . . . . . 78
8.2.8 Lớp thực thể: RFIDCard (Thẻ từ) . . . . . . . . . . . . . . . . . . . 78
8.2.9 Lớp điều khiển: Employee (Nhân viên vận hành) . . . . . . . . . . . 78
8.2.10 Lớp điều khiển: GuestCustomer (Khách vãng lai) . . . . . . . . . . . 79
8.2.11 Lớp điều khiển: MemberCustomer (Khách thành viên) . . . . . . . . 79
8.2.12 Lớp Invoice . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 80
8.2.13 Lớp Transaction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 80
8.2.14 Lớp IoTDevice . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 81
8.2.15 Lớp ParkingSpot (Vị trí đỗ xe) . . . . . . . . . . . . . . . . . . . . . 82
9 Testcase 83
9.1 U3.1 – Xem lịch sử giao dịch cá nhân . . . . . . . . . . . . . . . . . . . . . 83
9.2 U3.2 – Thanh toán hóa đơn . . . . . . . . . . . . . . . . . . . . . . . . . . 84
9.3 U3.3 – Thanh toán thủ công . . . . . . . . . . . . . . . . . . . . . . . . . . 85
Trang 3/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
9.4 U2.1 — Xác nhận và ghi nhận ra vào tự động . . . . . . . . . . . . . . . . 85
Trang 4/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
Danh sách hình vẽ
1 Use-case Diagram dành cho toàn bộ dự án này. . . . . . . . . . . . . . . . . . . 10
2 Sequence diagram cho Use-case U1.1: Đăng nhập vào hệ thống xác thực tập
trung (SSO) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14
3 Activity diagram cho Use-case U1.1: Đăng nhập vào hệ thống xác thực tập trung
(SSO) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
4 Activity Diagram — U2.1: Xác nhận và ghi nhận ra vào tự động . . . . . . . . . 17
5 Sequence Diagram — U2.1: Xác nhận và ghi nhận ra vào tự động . . . . . . . . 18
6 Activity Diagram — U2.2: Xác nhận ra vào thủ công . . . . . . . . . . . . . . . 20
7 Sequence Diagram — U2.2: Xác nhận ra vào thủ công . . . . . . . . . . . . . . . 21
8 Activity Diagram — U2.3: Đăng ký biển số xe . . . . . . . . . . . . . . . . . . . 23
9 Sequence Diagram — U2.3: Đăng ký biển số xe . . . . . . . . . . . . . . . . . . 24
10 Activity Diagram — U2.4: Đăng ký gói theo tháng . . . . . . . . . . . . . . . . 26
11 Sequence Diagram — U2.4: Đăng ký gói theo tháng . . . . . . . . . . . . . . . . 27
12 Sequence diagram cho Use-case U3.1: Xem lịch sử giao dịch cá nhân . . . . . . . 29
13 Activity diagram cho Use-case U3.1: Xem lịch sử giao dịch cá nhân . . . . . . . 29
14 Sequence diagram cho Use-case U3.2: Thanh toán hóa đơn . . . . . . . . . . . . 31
15 Activity diagram cho Use-case U3.2: Thanh toán hóa đơn . . . . . . . . . . . . . 31
16 Sequence diagram cho Use-case U3.3: Thanh toán thủ công . . . . . . . . . . . . 33
17 Activity diagram cho Use-case U3.3: Thanh toán thủ công . . . . . . . . . . . . 33
18 Sequence Diagram — U4.1: Cập nhật trạng thái vị trí đỗ . . . . . . . . . . . . . 35
19 Activity Diagram — U4.1: Cập nhật trạng thái vị trí đỗ . . . . . . . . . . . . . 35
20 Sequence Diagram — U4.2: Hiển thị trạng thái bãi xe . . . . . . . . . . . . . . . 37
21 Activity Diagram — U4.2: Hiển thị trạng thái bãi xe . . . . . . . . . . . . . . . 37
22 Sequence Diagram — U4.3: Thông báo cảm biến lỗi . . . . . . . . . . . . . . . . 39
23 Activity Diagram — U4.3: Thông báo cảm biến lỗi . . . . . . . . . . . . . . . . 39
24 Sequence Diagram — UC5.2: Quản lý tài khoản nhân viên . . . . . . . . . . . . 42
25 Activity Diagram — UC5.2: Quản lý tài khoản nhân viên . . . . . . . . . . . . . 43
26 Sequence Diagram — UC5.3: Xuất báo cáo . . . . . . . . . . . . . . . . . . . . . 46
27 Activity Diagram — UC5.3: Xuất báo cáo . . . . . . . . . . . . . . . . . . . . . 47
28 Sequence Diagram — UC5.4: Thay đổi chính sách giá . . . . . . . . . . . . . . . 50
29 Activity Diagram — UC5.4: Thay đổi chính sách giá . . . . . . . . . . . . . . . 51
30 Sequence Diagram — UC5.5: Truy cập nhật ký hệ thống . . . . . . . . . . . . . 54
31 Activity Diagram — UC5.5: Truy cập nhật ký hệ thống . . . . . . . . . . . . . . 55
32 Sequence Diagram — UC5.6: Giám sát tình trạng bãi đỗ xe . . . . . . . . . . . 60
33 Activity Diagram — UC5.6: Giám sát tình trạng bãi đỗ xe . . . . . . . . . . . . 61
34 Các State Chart trong hệ thống . . . . . . . . . . . . . . . . . . . . . . . . . . . 62
35 Deployment Diagram của hệ thống IoT-SPMS . . . . . . . . . . . . . . . . . . . 67
Trang 5/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
36 Ảnh chụp màn hình đăng nhập . . . . . . . . . . . . . . . . . . . . . . . . . . . 67
37 Giao diện trang chủ web . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 68
38 Tổng hợp giao diện cho các bước đăng ký biển số xe . . . . . . . . . . . . . . . . 68
39 Giao diện xét duyệt đăng ký biển số bên phía nhân viên . . . . . . . . . . . . . 69
40 Tổng hợp các giao diện cho các tiện ích khác của người dùng . . . . . . . . . . . 70
41 Tổng hợp các giao diện cho các chức năng của Admin . . . . . . . . . . . . . . . 71
42 Class diagram cho toàn bộ hệ thống . . . . . . . . . . . . . . . . . . . . . . . . . 73
Trang 6/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
1 Tổng quan dự án
1.1 Bối cảnh dự án
Trường Đại học Bách khoa - ĐHQG TP.HCM mỗi ngày phục vụ một lượng lớn phương tiện
của sinh viên, học viên cao học, nghiên cứu sinh, giảng viên, cán bộ - nhân viên và khách vãng
lai. Trong bối cảnh mật độ phương tiện ngày càng tăng trong khi sức chứa bãi xe có hạn, hệ
thống quản lý hiện tại đang gặp nhiều khó khăn như tình trạng ùn tắc tại cổng ra/vào vào giờ
cao điểm và việc khai thác chỗ đậu xe chưa được tối ưu.
1.2 Mục tiêu dự án
Nhằm giải quyết các vấn đề trên, dự án này sẽ xây dựng Hệ thống Quản lý Bãi đỗ xe Thông
minh dựa trên IoT (IoT-based Smart Parking Management System – IoT-SPMS). Hệ thống
này được thiết kế để tự động hóa kiểm soát ra/vào, giám sát trạng thái chỗ đậu xe, điều hướng
giao thông nội bộ thông qua bảng điện tử, cũng như tích hợp cơ chế tính phí, thanh toán và
tích hợp với hạ tầng công nghệ. Hơn nữa, hệ thống phải đảm bảo hoạt động ổn định trong các
điều kiện thực tế như số lượng người dùng đồng thời lớn, kết nối mạng có thể gián đoạn, dữ
liệu IoT có thể bị trễ hoặc không nhất quán, và phải phục vụ nhiều nhóm người dùng với các
chính sách khác nhau.
1.3 Stakeholders
• Nhóm người gửi xe:
– Sinh viên, học viên, nghiên cứu sinh, giảng viên, cán bộ: Sử dụng thẻ sinh viên/cán
bộ để ra/vào bãi xe; có thể đăng ký tài khoản trong ứng dụng để hưởng một số
quyền lợi phí gửi xe được cộng dồn theo chu kỳ và thanh toán qua BKPay (có thể
trả sau) và đăng ký các gói gửi xe theo tháng. Kỳ vọng: vào/ra nhanh chóng, không
gặp ùn tắc và chi phí được minh bạch.
– Khách vãng lai: Do không có thẻ sinh viên/cán bộ nên không thế không có tài khoản
nên sẽ không thể sử dụng các tiện ích của ứng dụng, thay vào đó sẽ nhận thẻ gửi xe
tạm thời tại cổng và thanh toán thủ công bằng tiền mặt khi ra khỏi bãi khi ra khỏi
bãi. Tuy nhiên phải đảm bảo kỳ vọng của họ là tương tự với các người gửi xe khác.
• Nhân viên vận hành bãi xe: Hỗ trợ xác thực thủ công trong các trường hợp ngoại lệ,
quản lý thẻ tạm thời và xử lý sự cố tại cổng. Kỳ vọng: một giao diện dễ sử dụng, cho
phép thao tác nhanh và giảm thiểu sai sót.
• Admin: Phụ trách các công việc như cấu hình chính sách giá, phân quyền người dùng,
giám sát hạ tầng, xuất báo cáo, thống kê và theo dõi nhật ký hệ thống. Kỳ vọng: hệ
Trang 7/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
thống phải cho phép quản lý và cấu hình linh hoạt một cách ổn định và bảo mật.
• Các hệ thống bên ngoài:
– Mock HCMUT_SSO: Xác thực người dùng nội bộ bằng tài khoản demo.
– Mock HCMUT_DATACORE: Đồng bộ thông tin cá nhân và vai trò ở chế độ giả lập.
– Mock BKPay: Mô phỏng xử lý thanh toán phí gửi xe.
– Mock IoT Sensors & Gateway: Mô phỏng cảm biến trạng thái chỗ đậu và luồng truyền dữ liệu.
1.4 Phạm vi dự án
Trong phạm vi phát triển, hệ thống bao gồm các chức năng chính để đảm bảo vận hành
toàn diện. Chức năng kiểm soát ra/vào hỗ trợ ghi nhận tự động bằng thẻ định danh, cấp thẻ
tạm cho khách hoặc các trường hợp ngoại lệ, và cho phép xác thực thủ công khi cần thiết. Chức
năng quản lý chỗ đậu xe cung cấp khả năng cập nhật trạng thái chỗ đậu theo thời gian thực,
phát hiện lỗi cảm biến và hiện thị trạng thái bãi xe như còn chỗ, gần đầy, hoặc đầy. Đối với việc
thanh toán, hệ thống sẽ tự động tính phí theo chu kỳ, gửi yêu cầu thanh toán qua BKPay và hỗ
trợ thanh toán tiền mặt cho khách vãng lai. Hệ thống cũng quản lý tài khoản và phân quyền
thông qua cơ chế mock HCMUT_SSO, đồng bộ dữ liệu role từ mock HCMUT_DATACORE. Cuối cùng,
chức năng báo cáo và truy vết đảm bảo lưu toàn bộ hoạt động, phục vụ việc xuất báo cáo tài
chính và vận hành.
Ngược lại, dự án cũng xác định rõ các yếu tố ngoài phạm vi triển khai. Những hạng mục
này bao gồm việc phát triển phần cứng IoT thực tế, phát triển một hệ thống thanh toán riêng
để thay thế BKPay, triển khai quy mô toàn thành phố, cũng như việc tích hợp các công nghệ
AI nâng cao như nhận diện biển số bằng deep learning.
1.5 Quy trình nghiệp vụ cốt lõi
Định nghĩa Phiên gửi xe:
Phiên gửi xe là một chuỗi hành động và trạng thái liên tục của một phương tiện từ khi tiến
vào bãi đỗ cho đến khi rời đi và hoàn tất nghĩa vụ tài chính. Vòng đời của một phiên gửi xe
dành cho người dùng có tài khoản được chia thành 4 giai đoạn chính:
• Giai đoạn 1 - Khởi tạo phiên: Khách hàng quẹt thẻ RFID (hoặc thẻ định danh) tại
cổng vào. Hệ thống xác thực danh tính, đối chiếu biển số xe qua camera và khởi tạo một
"Phiên gửi xe"mới trên cơ sở dữ liệu với trạng thái Đang hoạt động, ghi nhận thời điểm
bắt đầu.
• Giai đoạn 2 - Cập nhật vị trí và Tính giờ đỗ: Sau khi qua cổng, khách hàng di
chuyển xe đến vị trí đỗ. Cảm biến IoT tại vị trí đỗ phát hiện có xe và gửi tín hiệu về
Trang 8/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
Gateway. Hệ thống trung tâm liên kết vị trí đỗ này với phiên gửi xe vừa khởi tạo, đồng
thời duy trì trạng thái đỗ để làm cơ sở tính toán thời gian thực tế.
• Giai đoạn 3 - Kết thúc phiên: Khách hàng di chuyển xe ra cổng và quẹt thẻ. Hệ thống
đối chiếu dữ liệu cổng ra với cổng vào, xác nhận hợp lệ và đóng phiên gửi xe. Trạng thái
phiên chuyển sang Đã hoàn tất, đồng thời ghi nhận thời điểm kết thúc.
• Giai đoạn 4 - Xử lý hậu kỳ: Dựa trên tổng thời gian của phiên đỗ xe và chính sách
giá đã thiết lập, hệ thống tự động tính toán chi phí cho phiên này. Chi phí này được
cộng dồn vào tài khoản ghi nợ của khách hàng. Lúc này, phiên gửi xe sẽ được chuyển
sang trạng thái Chờ thanh toán. Sau khi khách hàng hoàn tất nghĩa vụ tài chính vào cuối
tháng, phiên sẽ chính thức khép lại với trạng thái Đã thanh toán.
• Giai đoạn ngoại lệ: Trong quá trình hoạt động, nếu xảy ra sự cố (khách mất thẻ, xe
lưu bãi quá thời gian quy định, lỗi cảm biến, ...), phiên gửi xe sẽ bị treo ở trạng thái
Ngoại lệ. Lúc này, cần sự can thiệp thủ công của nhân viên vận hành để xác minh và
đóng phiên hợp lệ.
Trang 9/87

| Trường   | Đại học Bách | Khoa        | Tp. Hồ Chí | Minh          |               |
| -------- | ------------ | ----------- | ---------- | ------------- | ------------- |
| Khoa     | Khoa học và  | Kỹ thuật    | Máy tính   |               |               |
| 2 Tổng   | quan chức    |             | năng và    | ranh giới     | hệ thống      |
| 2.1 Tổng | quan chức    | năng        |            |               |               |
|          | Hình         | 1: Use-case | Diagram    | dành cho toàn | bộ dự án này. |
Trang 10/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
Hệ thống IoT-SPMS được thiết kế nhằm tối ưu hóa quy trình quản lý bãi xe thông qua việc
phân tách rõ ràng các nhóm chức năng. Để đảm bảo tính toàn diện, các chức năng được chia
thành hai hướng tiếp cận chính: hướng người dùng cuối và hướng vận hành hệ thống.
2.1.1 Nhóm chức năng hướng người dùng
Nhóm chức năng này tập trung vào việc cung cấp trải nghiệm thuận tiện và nhanh chóng
cho sinh viên, cán bộ và khách vãng lai.
• Quản lý định danh và tài khoản: Hỗ trợ đăng nhập qua hệ thống xác thực tập trung
HCMUT_SSO và đồng bộ thông tin cá nhân từ DATACORE.
• Tiện ích gửi xe cá nhân: Cho phép người dùng tự đăng ký biển số xe trực tuyến, đăng
ký các gói gửi xe theo tháng và theo dõi sơ đồ vị trí trống trong bãi xe theo thời gian
thực.
• Tương tác ra/vào bãi: Thực hiện quy trình quẹt thẻ và xác thực biển số xe tự động
tại các cổng kiểm soát.
• Thanh toán và tra cứu: Người dùng có thể xem lại toàn bộ lịch sử giao dịch cá nhân
và thực hiện thanh toán hóa đơn điện tử thông qua cổng BKPay.
2.1.2 Nhóm chức năng hướng vận hành
Nhóm chức năng này phục vụ đội ngũ nhân viên và Admin nhằm đảm bảo hệ thống luôn
hoạt động ổn định và minh bạch.
• Hỗ trợ vận hành trực tiếp: Cung cấp giao diện cho nhân viên bãi xe thực hiện xác
nhận ra/vào thủ công, cấp phát thẻ tạm cho khách vãng lai và xử lý các tình huống ngoại
lệ tại cổng.
• Giám sát hạ tầng IoT: Theo dõi trạng thái hoạt động (online/offline) của các cảm
biến và Gateway; tự động tiếp nhận thông báo cảnh báo khi có thiết bị gặp sự cố hoặc
gửi dữ liệu bất thường.
• Quản trị chính sách và nhân sự: Cho phép Admin cấu hình linh hoạt chính sách giá
gửi xe theo khung giờ và đối tượng; quản lý và phân quyền tài khoản cho đội ngũ nhân
viên vận hành.
• Kiểm soát và báo cáo tài chính: Hệ thống tự động tổng hợp phí gửi xe, tạo hóa đơn
định kỳ và hỗ trợ xuất các báo cáo thống kê doanh thu, lưu lượng xe phục vụ công tác
hậu kiểm.
• Truy vết hệ thống: Cung cấp khả năng truy cập nhật ký raw (Logs) để điều tra sự cố
và kiểm toán các hành động thay đổi dữ liệu trong hệ thống.
Trang 11/87

| Trường | Đại học  | Bách Khoa Tp. | Hồ Chí Minh |     |
| ------ | -------- | ------------- | ----------- | --- |
| Khoa   | Khoa học | và Kỹ thuật   | Máy tính    |     |
| 3 Ranh | giới     | hệ thống      |             |     |
Ranh giới hệ thống xác định giới hạn mà phần mềm IoT-SPMS trực tiếp quản lý và xử lý
dữ liệu, phân tách với các tác nhân con người và các hệ thống ngoại vi. Cụ thể được phân định
như sau:
| 3.0.1 Bên | trong ranh | giới hệ thống |     |     |
| --------- | ---------- | ------------- | --- | --- |
• Logic xử lý nghiệp vụ: Bao gồm việc khởi tạo và quản lý phiên gửi xe, tự động hóa
quy trình kiểm soát ra/vào và tính toán chi phí dựa trên các chính sách giá đã thiết lập.
•
Quản lý dữ liệu tập trung: Lưu trữ và xử lý thông tin biển số xe đã đăng ký, trạng
thái chiếm dụng chỗ đỗ theo thời gian thực, lịch sử giao dịch và nhật ký hệ thống phục
| vụ kiểm | toán. |     |     |     |
| ------- | ----- | --- | --- | --- |
• Giao diện người dùng: Cung cấp các màn hình chức năng cho người dùng như xem sơ
đồ bãi xe, lịch sử thanh toán và Dashboard quản trị cho Admin để giám sát thiết bị IoT,
| xuất | báo cáo thống | kê. |     |     |
| ---- | ------------- | --- | --- | --- |
• Hệ thống thông báo: Tự động tạo và gửi các cảnh báo khi phát hiện lỗi cảm biến hoặc
| gửi       | nhắc nhở thanh | toán hóa      | đơn cho người | dùng. |
| --------- | -------------- | ------------- | ------------- | ----- |
| 3.0.2 Bên | ngoài ranh     | giới hệ thống |               |       |
•
Các hệ thống định danh và dữ liệu của trường: Trong phạm vi MVP, HCMUT_SSO và
HCMUT_DATACORE được mô phỏng bằng dữ liệu tài khoản tĩnh trong file JSON để xác
thực và đồng bộ vai trò người dùng. Hệ thống không kết nối thật tới kho dữ liệu gốc của
các đơn vị này.
•
Cổng thanh toán ngoại vi: Trong phạm vi MVP, BKPay được mô phỏng bằng endpoint mock
để chuyển trạng thái giao dịch và hóa đơn từ chưa thanh toán sang đã thanh toán. Hệ thống
không thực hiện giao dịch tài chính thật và không gọi cổng thanh toán bên ngoài.
| --- | ------------ | ------------ | --- | --- |
•
Hạ tầng phần cứng IoT: Trong phạm vi MVP, IoT Sensors, Gateway, RFID reader và camera
được giả lập bằng dữ liệu JSON và các endpoint điều khiển demo. Việc vận hành vật lý,
bảo trì phần cứng và phát triển firmware nằm ngoài phạm vi phần mềm của dự án.
| ----- | ---------- | ---------- | --------------- | ------ |
• Tác nhân con người: Bao gồm Sinh viên, Giảng viên, Khách vãng lai, Nhân viên vận
hành và Admin. Đây là các đối tượng tương tác với hệ thống qua các thiết bị đầu cuối
nhưng không thuộc quyền kiểm soát nội tại của logic phần mềm.
Trang 12/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
4 Screnario và các diagram cho các nhóm chức năng
4.1 Nhóm chức năng quản lý tài khoản
4.1.1 Use-case U1.1: Đăng nhập vào hệ thống bằng tài khoản demo
Use-case ID U1.1
Use-case name Đăng nhập vào hệ thống bằng tài khoản demo
Use-case overview Xác thực danh tính của người dùng thông qua tài khoản mẫu được lưu
trong file JSON. Cách này mô phỏng HCMUT_SSO và HCMUT_DATACORE
để phục vụ demo MVP, không kết nối thật tới hệ thống của trường.
Actors 1. Người dùng (CUSTOMER, EMPLOYEE, ADMIN)
2. MockSSOConnector
3. MockDataCoreConnector.
Preconditions 1. Người dùng có tài khoản demo trong file accounts.json.
2. Hệ thống đang ở màn hình đăng nhập.
3. File dữ liệu tài khoản và vai trò đã được seed sẵn.
Trigger Bấm nút “Đăng nhập”.
Steps 1. Người dùng nhập tên đăng nhập và mật khẩu.
2. Người dùng nhấn nút xác nhận đăng nhập.
3. Backend kiểm tra thông tin qua MockSSOConnector.
4. Backend đọc vai trò người dùng qua MockDataCoreConnector.
5. Hệ thống đồng bộ vai trò CUSTOMER, EMPLOYEE hoặc ADMIN để áp dụng quyền truy cập.
6. Hệ thống tạo phiên làm việc demo.
7. Hệ thống chuyển hướng người dùng đến màn hình tương ứng với role.
Post conditions Người dùng đã được xác thực trong phạm vi demo, phiên làm việc được thiết lập và
quyền hạn đã được phân định theo role trong dữ liệu JSON.
Exception flow - E1 (Thông tin không chính xác): Hệ thống không tìm thấy tài khoản hoặc mật khẩu
không khớp trong accounts.json. Hệ thống hiển thị thông báo lỗi và yêu cầu nhập lại.
- E2 (Thiếu dữ liệu seed): Hệ thống không đọc được file accounts.json hoặc thiếu role.
Hệ thống hiển thị lỗi cấu hình dữ liệu demo.
- E3 (Tài khoản bị khóa): Trạng thái tài khoản trong accounts.json là inactive. Hệ thống
thông báo lý do và hướng dẫn liên hệ quản trị viên.
Trang 13/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 2: Sequence diagram cho Use-case U1.1: Đăng nhập vào hệ thống xác thực tập trung
(SSO)
Trang 14/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 3: Activity diagram cho Use-case U1.1: Đăng nhập vào hệ thống xác thực tập trung (SSO)
Trang 15/87

|          | Trường | Đại      | học   | Bách  | Khoa  | Tp. Hồ Chí | Minh |        |         |      |     |
| -------- | ------ | -------- | ----- | ----- | ----- | ---------- | ---- | ------ | ------- | ---- | --- |
|          | Khoa   | Khoa     | học   | và Kỹ | thuật | Máy tính   |      |        |         |      |     |
| 4.2      | Nhóm   |          | tiện  | ích   | bãi   | xe         |      |        |         |      |     |
| 4.2.1    |        | Use-case | U2.1: | Xác   | nhận  | và ghi     | nhận | ra vào | tự động |      |     |
| Use-case |        | ID       |       | U2.1  |       |            |      |        |         |      |     |
| Use-case |        | name     |       | Xác   | nhận  | và ghi     | nhận | ra vào | tự      | động |     |
Use-case overview Tự động ghi nhận lượt ra/vào bằng cách quét thẻ RFID và camera
|               |     |     |     | nhận | diện           | mà không      | cần   | nhân     | viên thao | tác.   |     |
| ------------- | --- | --- | --- | ---- | -------------- | ------------- | ----- | -------- | --------- | ------ | --- |
| Actors        |     |     |     | 1.   | Khách          | gửi xe có     | tài   | khoản    |           |        |     |
|               |     |     |     | 2.   | HCMUT_DATACORE |               |       |          |           |        |     |
| Preconditions |     |     |     | 1.   | Thẻ            | sinh viên /   | giảng | viên còn | hiệu      | lực.   |     |
|               |     |     |     | 2.   | Biển           | số xe đã được | đăng  | ký       | trên hệ   | thống. |     |
Trigger Đầu đọc thẻ tại trạm kiểm soát bắt được tín hiệu từ thẻ của khách.
| Steps |     |     |     | 1.  | Khách    | quét thẻ  | sinh     | viên/giảng      | viên                 | tại cổng.   |             |
| ----- | --- | --- | --- | --- | -------- | --------- | -------- | --------------- | -------------------- | ----------- | ----------- |
|       |     |     |     | 2.  | Hệ thống | đọc mã    | số       | sinh viên/giảng |                      | viên từ     | thẻ.        |
|       |     |     |     | 3.  | Hệ thống | kiểm      | tra tài  | khoản           | trên HCMUT_DATACORE. |             |             |
|       |     |     |     | 4.  | Hệ thống | kích hoạt | camera   | chụp            | biển                 | số xe.      |             |
|       |     |     |     | 5.  | Hệ thống | kiểm      | tra biển | số có           | khớp                 | với dữ liệu | đã đăng ký. |
6. Nếu hợp lệ, hệ thống ghi nhận lượt xe và cập nhật vị trí trên
|     |     |     |     | Parking |     | Map sau | 5s cảm | biến ổn | định. |     |     |
| --- | --- | --- | --- | ------- | --- | ------- | ------ | ------- | ----- | --- | --- |
7. Hệ thống khởi tạo "Phiên gửi xe", bắt đầu ghi nhận thời gian đỗ
|     |     |     |     | xe  | thực | tế để làm | cơ sở | tính phí. |     |     |     |
| --- | --- | --- | --- | --- | ---- | --------- | ----- | --------- | --- | --- | --- |
Alternative flow A1: Nếu khách không đăng ký gói tháng, hệ thống tự động cộng
|     |     |     |     | dồn | phí | gửi xe. |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- | --- | --- |
A2: Nếu khách có gói tháng còn hiệu lực, hệ thống bỏ qua bước tính
phí.
| Post | conditions |     |     | Hệ  | thống | ghi nhận | lượt | vào ra. |     |     |     |
| ---- | ---------- | --- | --- | --- | ----- | -------- | ---- | ------- | --- | --- | --- |
Exception flow E1: Thẻ không hợp lệ (hết hạn hoặc bị khóa), hệ thống báo lỗi và
|     |     |     |     | rào | chắn | không mở. |     |     |     |     |     |
| --- | --- | --- | --- | --- | ---- | --------- | --- | --- | --- | --- | --- |
E2: Biển số không khớp với đăng ký, hệ thống báo lỗi và rào chắn
|     |     |     |     | không |     | mở. |     |     |     |     |     |
| --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- |
Trang 16/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 4: Activity Diagram — U2.1: Xác nhận và ghi nhận ra vào tự động
Trang 17/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 5: Sequence Diagram — U2.1: Xác nhận và ghi nhận ra vào tự động
Trang 18/87

|          | Trường | Đại      | học   | Bách  | Khoa  | Tp. | Hồ Chí | Minh |      |     |     |     |     |
| -------- | ------ | -------- | ----- | ----- | ----- | --- | ------ | ---- | ---- | --- | --- | --- | --- |
|          | Khoa   | Khoa     | học   | và Kỹ | thuật | Máy | tính   |      |      |     |     |     |     |
| 4.2.2    |        | Use-case | U2.2: | Xác   | nhận  | ra  | vào    | thủ  | công |     |     |     |     |
| Use-case |        | ID       |       | U2.2  |       |     |        |      |      |     |     |     |     |
| Use-case |        | name     |       | Xác   | nhận  | ra  | vào    | thủ  | công |     |     |     |     |
Use-case overview Nhân viên hỗ trợ khách gửi xe không có tài khoản bằng thẻ từ và
|               |     |     |     | thanh | toán  | thủ        | công.   |           |           |         |      |     |     |
| ------------- | --- | --- | --- | ----- | ----- | ---------- | ------- | --------- | --------- | ------- | ---- | --- | --- |
| Actors        |     |     |     | 1.    | Khách | không      | có      | tài khoản |           |         |      |     |     |
|               |     |     |     | 2.    | Nhân  | viên       | vận     | hành bãi  | xe        |         |      |     |     |
| Preconditions |     |     |     | Khách |       | được       | cấp thẻ | từ tại    | cổng      | vào.    |      |     |     |
| Trigger       |     |     |     | Khách |       | điều khiển |         | xe đến    | cổng      | vào/ra. |      |     |     |
| Steps         |     |     |     | 1.    | Nhân  | viên       | cấp     | thẻ từ    | cho khách | khi vào | bãi. |     |     |
|               |     |     |     | 2.    | Khách | điều       | khiển   | xe vào    | bãi       | giữ xe. |      |     |     |
3. Hệ thống ghi nhận lượt xe, chụp biển số và cập nhật vị trí trên
|     |     |     |     | Parking |      | Map.  |           |          |     |             |       |     |     |
| --- | --- | --- | --- | ------- | ---- | ----- | --------- | -------- | --- | ----------- | ----- | --- | --- |
|     |     |     |     | 4.      | Khi  | khách | ra, khách | đưa      | thẻ | từ cho nhân | viên. |     |     |
|     |     |     |     | 5.      | Nhân | viên  | nhận      | tiền mặt | từ  | khách.      |       |     |     |
6. Nhân viên quẹt thẻ để hệ thống đóng phiên và xác nhận lượt ra.
| Alternative |     |     | flow | A1: | Khách | làm      | mất | thẻ | từ khi  | lấy xe.    |     |     |     |
| ----------- | --- | --- | ---- | --- | ----- | -------- | --- | --- | ------- | ---------- | --- | --- | --- |
|             |     |     |      | -   | Bước  | 1: Khách | báo | mất | thẻ cho | nhân viên. |     |     |     |
- Bước 2: Nhân viên yêu cầu xuất trình giấy tờ xe (cà vẹt) và
CCCD.
- Bước 3: Nhân viên tra cứu biển số trên hệ thống để đối chiếu với
|     |     |     |     | hình | ảnh | camera |     | lúc vào. |     |     |     |     |     |
| --- | --- | --- | --- | ---- | --- | ------ | --- | -------- | --- | --- | --- | --- | --- |
- Bước 4: Sau khi xác nhận đúng xe, nhân viên thu phí gửi xe và
|     |     |     |     | phí | phạt | mất | thẻ. |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | ---- | --- | ---- | --- | --- | --- | --- | --- | --- |
- Bước 5: Nhân viên chọn "Xác nhận ra thủ công (Mất thẻ)"trên
|     |     |     |     | phần | mềm   | để  | đóng | phiên     | và mở | cổng.       |       |      |         |
| --- | --- | --- | --- | ---- | ----- | --- | ---- | --------- | ----- | ----------- | ----- | ---- | ------- |
|     |     |     |     | A2:  | Khách |     | yêu  | cầu thanh |       | toán chuyển | khoản | thay | vì tiền |
mặt.
|     |     |     |     | -    | Bước | 1: Nhân  | viên | cung      | cấp    | mã QR thanh | toán  | của   | bãi xe.   |
| --- | --- | --- | --- | ---- | ---- | -------- | ---- | --------- | ------ | ----------- | ----- | ----- | --------- |
|     |     |     |     | -    | Bước | 2: Khách |      | thực hiện | chuyển | khoản       | thành | công, | nhân viên |
|     |     |     |     | quẹt | thẻ  | để xác   | nhận | lượt      | ra.    |             |       |       |           |
Post conditions Hệ thống ghi nhận lượt vào ra, đóng phiên gửi xe và nhân viên xác
|           |     |      |     | nhận  | thanh | toán. |     |     |     |     |     |     |             |
| --------- | --- | ---- | --- | ----- | ----- | ----- | --- | --- | --- | --- | --- | --- | ----------- |
| Exception |     | flow |     | Không |       | có.   |     |     |     |     |     |     |             |
|           |     |      |     |       |       |       |     |     |     |     |     |     | Trang 19/87 |

| Trường Đại | học Bách         | Khoa Tp. | Hồ Chí Minh |             |          |
| ---------- | ---------------- | -------- | ----------- | ----------- | -------- |
| Khoa Khoa  | học và           | Kỹ thuật | Máy tính    |             |          |
|            | Hình 6: Activity | Diagram  | — U2.2: Xác | nhận ra vào | thủ công |
Trang 20/87

| Trường Đại | học Bách         | Khoa Tp. | Hồ Chí Minh |             |          |
| ---------- | ---------------- | -------- | ----------- | ----------- | -------- |
| Khoa Khoa  | học và           | Kỹ thuật | Máy tính    |             |          |
|            | Hình 7: Sequence | Diagram  | — U2.2: Xác | nhận ra vào | thủ công |
Trang 21/87

|          | Trường | Đại      | học   | Bách  | Khoa  | Tp. Hồ   | Chí   | Minh |     |     |     |     |     |
| -------- | ------ | -------- | ----- | ----- | ----- | -------- | ----- | ---- | --- | --- | --- | --- | --- |
|          | Khoa   | Khoa     | học   | và Kỹ | thuật | Máy tính |       |      |     |     |     |     |     |
| 4.2.3    |        | Use-case | U2.3: | Đăng  | ký    | biển     | số xe |      |     |     |     |     |     |
| Use-case |        | ID       |       | U2.3  |       |          |       |      |     |     |     |     |     |
| Use-case |        | name     |       | Đăng  | ký    | biển     | số xe |      |     |     |     |     |     |
Use-case overview Khách hàng đăng ký biển số xe lên hệ thống và chờ nhân viên xác
nhận.
| Actors        |     |     |     | 1. Khách |       | hàng có   | tài     | khoản |          |           |          |             |       |
| ------------- | --- | --- | --- | -------- | ----- | --------- | ------- | ----- | -------- | --------- | -------- | ----------- | ----- |
|               |     |     |     | 2. Nhân  |       | viên vận  | hành    | bãi   | xe       |           |          |             |       |
| Preconditions |     |     |     | Khách    | hàng  | đã        | đăng    | nhập  | vào      | hệ thống. |          |             |       |
| Trigger       |     |     |     | Khách    | nhấn  | nút       | "Đăng   | ký    | biển     | số xe".   |          |             |       |
| Steps         |     |     |     | 1. Khách |       | nhập biển | số      | xe và | tải      | ảnh giấy  | tờ       | (cà vẹt).   |       |
|               |     |     |     | 2. Hệ    | thống | lưu       | dữ liệu | với   | trạng    | thái      | "Chờ xác | nhận".      |       |
|               |     |     |     | 3. Hệ    | thống | gửi       | thông   | báo   | tới giao | diện      | quản     | lý của nhân | viên. |
4. Nhân viên kiểm tra thông tin do khách nhập và đối chiếu với hình
|     |     |     |     | ảnh     | giấy | tờ.       |      |      |         |     |     |     |     |
| --- | --- | --- | --- | ------- | ---- | --------- | ---- | ---- | ------- | --- | --- | --- | --- |
|     |     |     |     | 5. Nhân |      | viên nhấn | "Xác | nhận | duyệt". |     |     |     |     |
6. Hệ thống cập nhật trạng thái "Đã duyệt"và liên kết biển số với
|     |     |     |     | tài | khoản | của khách. |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | ----- | ---------- | --- | --- | --- | --- | --- | --- | --- |
Alternative flow A1: Nhân viên phát hiện biển số khách nhập không khớp với hình
ảnh cà vẹt (sai biển số), hoặc hình ảnh tải lên bị mờ/không hợp lệ.
A2: Nhân viên chọn "Từ chối duyệt"và nhập lý do cụ thể (Ví dụ:
|     |     |     |     | "Biển | số       | không | khớp | với giấy | tờ   | xe"). |          |         |      |
| --- | --- | --- | --- | ----- | -------- | ----- | ---- | -------- | ---- | ----- | -------- | ------- | ---- |
|     |     |     |     | A3:   | Hệ thống | cập   | nhật | trạng    | thái | "Từ   | chối"cho | yêu cầu | này. |
A4: Hệ thống gửi thông báo (Notification) kèm lý do chi tiết để
|     |     |     |     | khách | hàng | tiến | hành | chỉnh | sửa | và đăng | ký lại. |     |     |
| --- | --- | --- | --- | ----- | ---- | ---- | ---- | ----- | --- | ------- | ------- | --- | --- |
Post conditions Biển số được lưu vào hệ thống và liên kết với tài khoản khách.
Exception flow E1: Lỗi định dạng biển số hoặc thiếu dữ liệu bắt buộc, hệ thống yêu
|     |     |     |     | cầu  | nhập   | lại ngay  | trên   | giao | diện.        |       |               |     |          |
| --- | --- | --- | --- | ---- | ------ | --------- | ------ | ---- | ------------ | ----- | ------------- | --- | -------- |
|     |     |     |     | E2:  | Biểnsố | khách     | nhậpđã |      | tồntạivàđang |       | liênkếtvớimột |     | tàikhoản |
|     |     |     |     | khác | trong  | hệ thống, |        | thao | tác bị       | chặn. |               |     |          |
Trang 22/87

| Trường Đại | học Bách | Khoa Tp.    | Hồ Chí   | Minh         |         |       |
| ---------- | -------- | ----------- | -------- | ------------ | ------- | ----- |
| Khoa Khoa  | học và   | Kỹ thuật    | Máy tính |              |         |       |
|            | Hình     | 8: Activity | Diagram  | — U2.3: Đăng | ký biển | số xe |
Trang 23/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí   | Minh         |         |       |
| ---------- | -------- | -------- | -------- | ------------ | ------- | ----- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính |              |         |       |
|            | Hình 9:  | Sequence | Diagram  | — U2.3: Đăng | ký biển | số xe |
Trang 24/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
4.2.4 Use-case U2.4: Đăng ký / Gia hạn gói theo tháng
Use-case ID U2.4
Use-case name Đăng ký / Gia hạn gói theo tháng
Use-case overview Khách hàng mua mới hoặc gia hạn gói gửi xe theo tháng qua cổng
thanh toán BKPay.
Actors 1. Khách hàng có tài khoản
2. BKPay
3. HCMUT_SSO
Preconditions Khách đã đăng nhập thành công qua HCMUT_SSO và đã có ít
nhất 1 biển số xe được duyệt.
Trigger Khách nhấn nút "Đăng ký gói tháng"(cho đăng ký mới) hoặc nút
"Gia hạn"(cho gói đang sử dụng).
Steps 1. Khách hàng chọn biển số xe cần đăng ký gói mới, hoặc chọn gói
đang sử dụng để yêu cầu gia hạn.
2. Hệ thống tính toán chi phí và tạo mã đơn thanh toán.
3. Hệ thống chuyển hướng khách sang cổng thanh toán BKPay.
4. Khách thực hiện các bước thanh toán trên giao diện BKPay.
5. BKPay gửi tín hiệu xác nhận giao dịch thành công về hệ thống.
6. Hệ thống xử lý dịch vụ: Kích hoạt gói mới (nếu đăng ký mới)
hoặc cộng dồn thêm chu kỳ thời gian vào gói hiện tại (nếu gia hạn).
7. Hệ thống hiển thị biên lai thanh toán và cập nhật ngày hết hạn
mới cho khách hàng.
Alternative flow A1: Khách nhấn "Hủy giao dịch"trên giao diện BKPay.
A2: Hệ thống nhận được thông báo hủy, tự động cập nhật trạng
thái đơn thành "Đã hủy"và quay lại trang dịch vụ.
Post conditions Gói vé tháng được kích hoạt thành công hoặc thời hạn gói cũ được
gia hạn thêm.
Exception flow E1: Quá 5 phút khách hàng không hoàn thành thanh toán trên
BKPay, hệ thống tự động đánh dấu đơn hàng là "Hết hạn"và hủy
đơn.
Trang 25/87

| Trường    | Đại học Bách | Khoa Tp.         | Hồ Chí Minh  |             |       |
| --------- | ------------ | ---------------- | ------------ | ----------- | ----- |
| Khoa Khoa | học và       | Kỹ thuật         | Máy tính     |             |       |
|           | Hình 10:     | Activity Diagram | — U2.4: Đăng | ký gói theo | tháng |
Trang 26/87

| Trường | Đại học Bách | Khoa Tp. | Hồ Chí Minh          |             |       |
| ------ | ------------ | -------- | -------------------- | ----------- | ----- |
| Khoa   | Khoa học và  | Kỹ thuật | Máy tính             |             |       |
|        | Hình 11:     | Sequence | Diagram — U2.4: Đăng | ký gói theo | tháng |
Trang 27/87

|          | Trường | Đại      | học   | Bách  | Khoa  | Tp. Hồ   | Chí Minh |         |     |     |
| -------- | ------ | -------- | ----- | ----- | ----- | -------- | -------- | ------- | --- | --- |
|          | Khoa   | Khoa     | học   | và Kỹ | thuật | Máy tính |          |         |     |     |
| 4.3      | Nhóm   |          | thanh | toán  |       |          |          |         |     |     |
| 4.3.1    |        | Use-case | U3.1: | Xem   | lịch  | sử giao  | dịch     | cá nhân |     |     |
| Use-case |        | ID       |       | U3.1  |       |          |          |         |     |     |
| Use-case |        | name     |       | Xem   | lịch  | sử giao  | dịch     | cá nhân |     |     |
Use-case overview Cho phép người dùng xem toàn bộ lịch sử giao dịch.
| Actors |     |     |     | 1.  | Khách | gửi xe | có tài | khoản |     |     |
| ------ | --- | --- | --- | --- | ----- | ------ | ------ | ----- | --- | --- |
Preconditions 1. Hệ thống kết nối tới các máy chủ đã xác thực và khả dụng.
|         |     |     |     | 2.    | Người | dùng đã | đăng  | nhập vào | hệ thống. |     |
| ------- | --- | --- | --- | ----- | ----- | ------- | ----- | -------- | --------- | --- |
| Trigger |     |     |     | Người | dùng  | chọn    | “Lịch | sử giao  | dịch”.    |     |
Steps 1. Người dùng chọn mục "Lịch sử giao dịch"trên giao diện hệ thống.
2. Hệ thống gửi yêu cầu truy xuất dữ liệu giao dịch của người dùng
|     |     |     |     | đó  | từ cơ | sở dữ liệu. |        |           |               |             |
| --- | --- | --- | --- | --- | ----- | ----------- | ------ | --------- | ------------- | ----------- |
|     |     |     |     | 3.  | Cơ sở | dữ liệu     | trả về | danh sách | các giao dịch | thành công. |
4. Hệ thống hiển thị danh sách giao dịch lên màn hình, bao gồm các
|     |     |     |     | thông | tin: | Thời | gian, Số | tiền, | Trạng thái thanh | toán. |
| --- | --- | --- | --- | ----- | ---- | ---- | -------- | ----- | ---------------- | ----- |
5. (Tùy chọn) Người dùng chọn tính năng sắp xếp danh sách theo
tiêu chí (Thời gian / Số tiền / Trạng thái). Hệ thống sắp xếp dữ
|      |            |     |     | liệu | và  | tự động cập | nhật | lại hiển | thị.        |     |
| ---- | ---------- | --- | --- | ---- | --- | ----------- | ---- | -------- | ----------- | --- |
| Post | conditions |     |     | Lịch | sử  | giao dịch   | được | hiển thị | thành công. |     |
Exception flow - E1 (Danh sách giao dịch trống): Xảy ra tại Bước 3 của Steps.
Khi cơ sở dữ liệu trả về kết quả rỗng (người dùng chưa từng thực
hiện giao dịch nào). Hệ thống sẽ bỏ qua Bước 4 và 5, lập tức hiển thị
thông báo "Bạn chưa có giao dịch nào"(hoặc "Danh sách trống") ra
|     |     |     |     | màn | hình. | Use-case | kết | thúc. |     |     |
| --- | --- | --- | --- | --- | ----- | -------- | --- | ----- | --- | --- |
Trang 28/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 12: Sequence diagram cho Use-case U3.1: Xem lịch sử giao dịch cá nhân
Hình 13: Activity diagram cho Use-case U3.1: Xem lịch sử giao dịch cá nhân
Trang 29/87

|          | Trường | Đại      | học   | Bách  | Khoa  | Tp. Hồ   | Chí  | Minh |     |     |     |     |
| -------- | ------ | -------- | ----- | ----- | ----- | -------- | ---- | ---- | --- | --- | --- | --- |
|          | Khoa   | Khoa     | học   | và Kỹ | thuật | Máy      | tính |      |     |     |     |     |
| 4.3.2    |        | Use-case | U3.2: | Thanh |       | toán hóa | đơn  |      |     |     |     |     |
| Use-case |        | ID       |       | U3.2  |       |          |      |      |     |     |     |     |
| Use-case |        | name     |       | Thanh |       | toán hóa | đơn  |      |     |     |     |     |
Use-case overview Cho phép người dùng thanh toán hóa đơn gửi xe thông qua cổng
|        |     |     |     | thanh | toán   | BKPay. |        |        |     |     |     |     |
| ------ | --- | --- | --- | ----- | ------ | ------ | ------ | ------ | --- | --- | --- | --- |
| Actors |     |     |     | 1.    | Khách  | gửi xe | có tài | khoản. |     |     |     |     |
|        |     |     |     | 2.    | BKPay. |        |        |        |     |     |     |     |
Preconditions 1. Hệ thống kết nối tới các máy chủ đã xác thực và khả dụng
|     |     |     |     | 2.  | Người | dùng đã | đăng | nhập |     |     |     |     |
| --- | --- | --- | --- | --- | ----- | ------- | ---- | ---- | --- | --- | --- | --- |
3. Hệ thống đã tính toán phí gửi xe và gửi yêu cầu thanh toán lên
BKPay
|         |     |     |     | 4.    | Tồn  | tại hóa đơn | chưa   | thanh toán. |           |     |        |     |
| ------- | --- | --- | --- | ----- | ---- | ----------- | ------ | ----------- | --------- | --- | ------ | --- |
| Trigger |     |     |     | Người | dùng | chọn        | “Thanh | toán hóa    | đơn” trên | hệ  | thống. |     |
Steps 1. Hệ thống hiển thị danh sách hóa đơn (gồm số tiền, thời hạn thanh
toán).
|      |            |     |     | 2.  | Người  | dùng chọn  | chuyển   | sang BKPay.      |            |           |       |        |
| ---- | ---------- | --- | --- | --- | ------ | ---------- | -------- | ---------------- | ---------- | --------- | ----- | ------ |
|      |            |     |     | 3.  | BKPay  | hiển       | thị danh | sách hóa         | đơn chưa   | thanh     | toán. |        |
|      |            |     |     | 4.  | Người  | dùng chọn  | “Thanh   | toán”            | trên một   | hóa       | đơn.  |        |
|      |            |     |     | 5.  | Người  | dùng thanh |          | toán trên BKPay. |            |           |       |        |
|      |            |     |     | 6.  | BKPay  | trả kết    | quả      | về hệ thống:     |            |           |       |        |
|      |            |     |     |     | •      |            | →        |                  |            |           |       |        |
|      |            |     |     |     | Thành  | công       |          | cập nhật trạng   | thái       | “Đã thanh |       | toán”. |
|      |            |     |     |     | • Thất | bại        | → ghi    | nhận “Chưa       | thanh      | toán”.    |       |        |
| Post | conditions |     |     | 1.  | Giao   | dịch được  | lưu      | vào lịch sử      | giao dịch. |           |       |        |
|      |            |     |     | 2.  | Người  | dùng nhận  | thông    | báo kết          | quả “Giao  | dịch      | thành | công”. |
Exception flow E1 (Hết hạn thanh toán): Gửi nhắc nhở 3 lần. Nếu vẫn chưa
thanh toán thì khóa tài khoản. Dù tài khoản bị khóa không cho gửi
|     |     |     |     | xe  | nữa, | nhưng hệ | thống | vẫn cho phép | thanh | toán | để  | gỡ khóa.    |
| --- | --- | --- | --- | --- | ---- | -------- | ----- | ------------ | ----- | ---- | --- | ----------- |
|     |     |     |     |     |      |          |       |              |       |      |     | Trang 30/87 |

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 14: Sequence diagram cho Use-case U3.2: Thanh toán hóa đơn
Hình 15: Activity diagram cho Use-case U3.2: Thanh toán hóa đơn
Trang 31/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
4.3.3 Use-case U3.3: Thanh toán thủ công
Use-case ID U3.3
Use-case name Thanh toán thủ công
Use-case overview Cho phép thanh toán thủ công, hỗ trợ bởi nhân viên bãi xe.
Actors 1. Khách gửi xe có tài khoản hoặc không có tài khoản.
2. Nhân viên bãi xe
Preconditions 1. Người gửi xe chọn thanh toán thủ công khi vào cổng và được phát
thẻ tạm.
2. Hệ thống ghi nhận giao dịch, biển số xe và thời gian bắt đầu gửi
xe.
2. Hệ thống đã tính được phí gửi xe.
Trigger Người gửi xe có mặt tại cổng ra.
Steps 1. Người gửi xe sử dụng thẻ tạm để quét vào hệ thống.
2. Hệ thống truy xuất phiên gửi xe và tính phí từ cơ sở dữ liệu.
3. Hệ thống hiển thị số tiền cần trả cho cả người gửi xe và nhân
viên bãi xe nhìn thấy.
4. Người gửi xe trả tiền mặt (vật lý) cho nhân viên.
5. Nhân viên bấm “Xác nhận đã nhận tiền” trên hệ thống.
6. Hệ thống đánh dấu giao dịch “Đã thanh toán” vào cơ sở dữ liệu.
7. Hệ thống ra lệnh mở barie, cho phép xe rời bãi.
Post conditions 1. Giao dịch được đánh dấu đã thanh toán.
2. Xe được phép rời bãi.
Exception flow - E1 (Thẻ bị lỗi / Không tìm thấy giao dịch): Xảy ra ở bước
2 nếu CSDL không tìm thấy thông tin hoặc thẻ hỏng. Hệ thống báo
lỗi. Nhân viên hỏi thông tin (biển số/giấy tờ) của khách và nhập
dữ liệu xác minh thủ công. Hệ thống tạo lập giao dịch thủ công.
Chuyển sang bước thanh toán và mở barie.
- E2 (Khách mất thẻ): Khách không thể thực hiện bước 1. Khách
báo mất thẻ cho nhân viên. Nhân viên hỏi thông tin (biển số/giấy
tờ) và nhập xác minh “báo mất thẻ” lên hệ thống. Hệ thống tạo giao
dịch thủ công và tính cộng thêm phí phạt. Khách trả tiền và nhân
viên mở barie.
Trang 32/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 16: Sequence diagram cho Use-case U3.3: Thanh toán thủ công
Hình 17: Activity diagram cho Use-case U3.3: Thanh toán thủ công
Trang 33/87

|          | Trường Đại | học   | Bách  | Khoa  | Tp. Hồ | Chí  | Minh |        |     |     |     |
| -------- | ---------- | ----- | ----- | ----- | ------ | ---- | ---- | ------ | --- | --- | --- |
|          | Khoa Khoa  | học   | và Kỹ | thuật | Máy    | tính |      |        |     |     |     |
| 4.4      | Nhóm       | IoT   |       |       |        |      |      |        |     |     |     |
| 4.4.1    | Use-case   | U4.1: | Cập   | nhật  | trạng  | thái | vị   | trí đỗ |     |     |     |
| Use-case | ID         |       | U4.1  |       |        |      |      |        |     |     |     |
| Use-case | name       |       | Cập   | nhật  | trạng  | thái | vị   | trí đỗ |     |     |     |
Use-case overview Cho phép hệ thống IoT thu thập và cập nhật liên tục tình trạng
|        |     |     | của | từng                | vị trí | đỗ xe | lên hệ | thống | trung tâm. |     |     |
| ------ | --- | --- | --- | ------------------- | ------ | ----- | ------ | ----- | ---------- | --- | --- |
| Actors |     |     | 1.  | IoT Sensors/Gateway |        |       |        |       |            |     |     |
Preconditions 1. Hệ thống đang hoạt động bình thường (không mất kết nối, không
|     |     |     | bị  | quá tải) |     |     |     |     |     |     |     |
| --- | --- | --- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
2. Các cảm biến IoT tại vị trí đỗ đã được cấp nguồn và có kết nối
|     |     |     | mạng | ổn  | định | tới Gateway. |     |     |     |     |     |
| --- | --- | --- | ---- | --- | ---- | ------------ | --- | --- | --- | --- | --- |
Trigger Cứ mỗi 15s cảm biến thu thập và gửi thông tin về sự thay đổi vật
|       |     |     | lý  | tại vị | trí đỗ.   |     |     |           |      |             |     |
| ----- | --- | --- | --- | ------ | --------- | --- | --- | --------- | ---- | ----------- | --- |
| Steps |     |     | 1.  | Cảm    | biến quét | khu | vực | đỗ và cập | nhật | trạng thái. |     |
2. IoT Gateway tiếp nhận tín hiệu từ cảm biến và gắn thêm mốc
|     |     |     | thời | gian | cụ thể. |     |     |     |     |     |     |
| --- | --- | --- | ---- | ---- | ------- | --- | --- | --- | --- | --- | --- |
3. IoT Gateway truyền dữ liệu trạng thái cùng định danh của vị trí
|     |     |     | đỗ  | về hệ | thống | quản | lý trung | tâm. |     |     |     |
| --- | --- | --- | --- | ----- | ----- | ---- | -------- | ---- | --- | --- | --- |
4. Hệ thống trung tâm tiếp nhận, lưu trữ dữ liệu vào cơ sở dữ liệu
|     |     |     | và  | xác nhận | quá | trình | cập | nhật hoàn | tất. |     |     |
| --- | --- | --- | --- | -------- | --- | ----- | --- | --------- | ---- | --- | --- |
Post conditions Trạng thái mới nhất của vị trí đỗ xe được lưu trữ chính xác trong
|     |     |     | cơ  | sở dữ | liệu của | hệ  | thống. |     |     |     |     |
| --- | --- | --- | --- | ----- | -------- | --- | ------ | --- | --- | --- | --- |
Exception flow - E1 (Mất kết nối mạng): IoT Gateway không thể gửi dữ liệu lên
hệ thống. Dữ liệu trạng thái sẽ được lưu cục bộ tại Gateway và tự
|     |     |     | động | đồng | bộ lại | ngay | khi | kết nối | được khôi | phục. |     |
| --- | --- | --- | ---- | ---- | ------ | ---- | --- | ------- | --------- | ----- | --- |
- E2 (Dữ liệu không hợp lệ): Nếu hệ thống phát hiện gói tin sai
cấu trúc, hệ thống sẽ từ chối lưu bản ghi và tự động ghi lại lỗi để
|     |     |     | Admin |           | kiểm tra. |       |     |       |             |              |      |
| --- | --- | --- | ----- | --------- | --------- | ----- | --- | ----- | ----------- | ------------ | ---- |
|     |     |     | -     | E3 (Thiết | bị        | không | có  | trong | danh sách): | Nếu hệ thống | phát |
hiện gói tin được gửi từ một thiết bị nằm trong danh sách thiết bị,
hệ thống sẽ từ chối lưu bản ghi và tự động ghi lại lỗi để Admin kiểm
tra.
Trang 34/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 18: Sequence Diagram — U4.1: Cập nhật trạng thái vị trí đỗ
Hình 19: Activity Diagram — U4.1: Cập nhật trạng thái vị trí đỗ
Trang 35/87

|          | Trường Đại | học   | Bách  | Khoa Tp. | Hồ Chí     | Minh   |     |     |
| -------- | ---------- | ----- | ----- | -------- | ---------- | ------ | --- | --- |
|          | Khoa Khoa  | học   | và Kỹ | thuật    | Máy tính   |        |     |     |
| 4.4.2    | Use-case   | U4.2: | Hiển  | thị      | trạng thái | bãi xe |     |     |
| Use-case | ID         |       | U4.2  |          |            |        |     |     |
| Use-case | name       |       | Hiển  | thị      | trạng thái | bãi xe |     |     |
Use-case overview Cung cấp cho User cái nhìn tổng quan theo thời gian thực về tình
trạng sức chứa của bãi xe (số chỗ trống, số chỗ đã đầy, sơ đồ vị trí).
| Actors |     |     | 1.  | User |     |     |     |     |
| ------ | --- | --- | --- | ---- | --- | --- | --- | --- |
Preconditions 1. Hệ thống đang hoạt động bình thường (không mất kết nối, không
|     |     |     | bị  | quá tải). |     |     |     |     |
| --- | --- | --- | --- | --------- | --- | --- | --- | --- |
2. User đã đăng nhập thành công vào ứng dụng/tài khoản của bãi
xe.
3. Hệ thống đã thu thập được dữ liệu trạng thái từ các IoT Gateway.
| Trigger |     |     | User | truy | cập vào | chức năng "Trạng | thái bãi xe". |     |
| ------- | --- | --- | ---- | ---- | ------- | ---------------- | ------------- | --- |
Steps 1. Hệ thống tiếp nhận yêu cầu xem trạng thái bãi xe từ User.
2. Hệ thống truy xuất cơ sở dữ liệu để lấy dữ liệu trạng thái mới
|     |     |     | nhất | của | tất cả các | vị trí đỗ. |     |     |
| --- | --- | --- | ---- | --- | ---------- | ---------- | --- | --- |
3. Hệ thống hiển vị trí chính xác của những vị trí chỗ trống/đã có
xe và xuất lên giao diện dưới dạng sơ đồ bãi đỗ chứa các thông tin
như: và mũi tên hướng dẫn đến vị trí đỗ xe gần nhất, trạng thái vị
|     |     |     | trí | đỗ có | trống hay | không, bãi giữ | xe có đang đầy | hay không. |
| --- | --- | --- | --- | ----- | --------- | -------------- | -------------- | ---------- |
Post conditions Giao diện màn hình của User hiển thị chính xác và trực quan trạng
|     |     |     | thái | hiện | tại của toàn | bộ bãi đỗ xe. |     |     |
| --- | --- | --- | ---- | ---- | ------------ | ------------- | --- | --- |
Exception flow - E1 (Lỗi kết nối với CSDL trung tâm): Hệ thống không thể
lấy dữ liệu, hiển thị thông báo "Không thể tải sơ đồ bãi xe lúc này,
|     |     |     | vui | lòng thử | lại sau    | ít phút".                           |     |     |
| --- | --- | --- | --- | -------- | ---------- | ----------------------------------- | --- | --- |
|     |     |     | -E2 | (Dữ      | liệu không | đồng bộ):NếucóđộtrễlớntừIoTGateway, |     |     |
hệ thống sẽ hiển thị cảnh báo "Dữ liệu có thể không phải là mới
nhất".
Trang 36/87

| Trường Đại | học Bách          | Khoa Tp.         | Hồ Chí Minh  |                |        |
| ---------- | ----------------- | ---------------- | ------------ | -------------- | ------ |
| Khoa Khoa  | học và            | Kỹ thuật         | Máy tính     |                |        |
|            | Hình 20: Sequence | Diagram          | — U4.2: Hiển | thị trạng thái | bãi xe |
|            | Hình 21:          | Activity Diagram | — U4.2: Hiển | thị trạng thái | bãi xe |
Trang 37/87

|          | Trường Đại | học   | Bách Khoa   | Tp. | Hồ       | Chí Minh |     |     |     |
| -------- | ---------- | ----- | ----------- | --- | -------- | -------- | --- | --- | --- |
|          | Khoa Khoa  | học   | và Kỹ thuật |     | Máy tính |          |     |     |     |
| 4.4.3    | Use-case   | U4.3: | Thông       | báo | cảm      | biến lỗi |     |     |     |
| Use-case | ID         |       | U4.3        |     |          |          |     |     |     |
| Use-case | name       |       | Thông       | báo | cảm      | biến lỗi |     |     |     |
Use-case overview Hệ thống tự động theo dõi tình trạng hoạt động của các thiết bị
IoT và cảnh báo cho Admin khi phát hiện thiết bị có dấu hiệu hư
|        |     |     | hỏng | hoặc             | mất kết | nối.   |     |     |     |
| ------ | --- | --- | ---- | ---------------- | ------- | ------ | --- | --- | --- |
| Actors |     |     | IoT  | Sensors/Gateway, |         | Admin. |     |     |     |
Preconditions 1. Chức năng giám sát tình trạng thiết bị (Heartbeat/Ping) của hệ
|     |     |     | thống | đang | chạy | nền. |     |     |     |
| --- | --- | --- | ----- | ---- | ---- | ---- | --- | --- | --- |
2.Toàn bộ thiết bị IoT đã được đăng ký mã định danh vào hệ thống.
Trigger Hệ thống trung tâm không nhận được tín hiệu phản hồi từ cảm
biến/Gateway trong khoảng thời gian cho phép (45s), hoặc nhận
|     |     |     | được | mã lỗi | từ thiết | bị gửi về. |     |     |     |
| --- | --- | --- | ---- | ------ | -------- | ---------- | --- | --- | --- |
Steps 1. Hệ thống ghi nhận sự cố từ một thiết bị phần cứng cụ thể.
2. Hệ thống cập nhật trạng thái của thiết bị đó thành "Error"trong
|     |     |     | cơ sở | dữ liệu. |     |     |     |     |     |
| --- | --- | --- | ----- | -------- | --- | --- | --- | --- | --- |
3. Hệ thống tự động tạo một thông báo cảnh báo chi tiết (bao gồm
|     |     |     | mã thiết | bị,   | vị trí, | thời gian xảy  | ra sự cố).  |                 |     |
| --- | --- | --- | -------- | ----- | ------- | -------------- | ----------- | --------------- | --- |
|     |     |     | 4. Hệ    | thống | đẩy     | thông báo hiển | thị lên màn | hình của Admin. |     |
5.Adminxácnhậnthôngbáo,cậpnhậttrạngthái"Đangbảotrì"cho
|     |     |     | thiết | bị đó | trong | cơ sở dữ liệu. |     |     |     |
| --- | --- | --- | ----- | ----- | ----- | -------------- | --- | --- | --- |
Post conditions Thông tin lỗi thiết bị được ghi vào hệ thống và Admin nhận được
|     |     |     | thông | báo | cảnh báo | kịp thời. |     |     |     |
| --- | --- | --- | ----- | --- | -------- | --------- | --- | --- | --- |
Exception flow - E1: Nếu Admin không thực hiện việc xác nhận, cảnh báo vẫn sẽ
|     |     |     | được | lưu trữ | và bôi | đỏ trực tiếp | trên giao diện | Dashboard. |     |
| --- | --- | --- | ---- | ------- | ------ | ------------ | -------------- | ---------- | --- |
- E2 (Thiết bị tự phục hồi kết nối): Nếu thiết bị bị mất kết nối
mạng tạm thời nhưng sau đó tự kết nối lại được trước khi Admin
kịp xác nhận báo lỗi, hệ thống tự động thu hồi thông báo lỗi ban
|     |     |     | đầu  | và thay | bằng  | một thông báo | mới "Hệ | thống IoT đã | tự khôi |
| --- | --- | --- | ---- | ------- | ----- | ------------- | ------- | ------------ | ------- |
|     |     |     | phục | kết nối | thành | công".        |         |              |         |
Trang 38/87

| Trường    | Đại học Bách | Khoa Tp.         | Hồ Chí Minh           |              |     |
| --------- | ------------ | ---------------- | --------------------- | ------------ | --- |
| Khoa Khoa | học và       | Kỹ thuật         | Máy tính              |              |     |
|           | Hình 22:     | Sequence         | Diagram — U4.3: Thông | báo cảm biến | lỗi |
|           | Hình 23:     | Activity Diagram | — U4.3: Thông         | báo cảm biến | lỗi |
Trang 39/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
4.5 Nhóm Admin
4.5.1 Use-case 5.2: Quản lý tài khoản nhân viên
Use-case ID U5.2
Use-case name Quản lý tài khoản nhân viên
Use-case overview Cho phép quản trị viên tạo mới, vô hiệu hóa và reset mật khẩu tài
khoản đăng nhập cho nhân viên vận hành bãi đỗ xe.
Actors Primary: Admin
Internal Account Service: Xử lý logic tạo, vô hiệu hóa, mã hóa và quản lý
Components vòng đời tài khoản nhân viên.
Email Service: Gửi thông báo và mật khẩu tạm thời tới địa chỉ
email đã đăng ký của nhân viên.
Audit Logger: Hệ thống ghi vết, đảm bảo tính toàn vẹn và minh
bạch của mọi hành động thay đổi dữ liệu từ Admin.
Cơ sở Dữ liệu: Lưu trữ toàn bộ dữ liệu nghiệp vụ, tiếp nhận các
yêu cầu đọc/ghi từ các service nội bộ thông qua lớp truy cập dữ liệu.
Preconditions 1. Admin đã đăng nhập và được phân quyền quản trị hệ thống.
2. Kết nối cơ sở dữ liệu khả dụng.
Trigger Admin chọn mục “Quản lý tài khoản nhân viên” trên giao diện quản
trị.
Steps 1. Giao diện Quản trị gửi yêu cầu lấy danh sách tài khoản tới
Account Service. Account Service truy vấn Cơ sở Dữ liệu và trả về
danh sách tài khoản nhân viên hiện có, bao gồm: họ tên, số điện
thoại, tên đăng nhập, trạng thái (đang hoạt động / đã vô hiệu hóa).
2. Admin chọn “Tạo tài khoản mới”.
3. Giao diện Quản trị hiển thị biểu mẫu yêu cầu nhập họ tên, số
điện thoại, tên đăng nhập và mật khẩu.
4. Admin nhập thông tin và nhấn “Tạo tài khoản”.
5. Account Service xác thực thông tin đầu vào (kiểm tra trường bắt
buộc, định dạng số điện thoại) và kiểm tra tính duy nhất của tên
đăng nhập trong Cơ sở Dữ liệu. Nếu hợp lệ, Giao diện Quản trị hiển
thị hộp thoại yêu cầu Admin xác nhận thao tác.
6. Admin xác nhận.
7. Account Service tạo bản ghi tài khoản mới trong Cơ sở Dữ liệu
với vai trò “Nhân viên vận hành”, đồng thời gửi yêu cầu ghi nhật ký
tới Audit Logger (bao gồm adminId, hành động tạo tài khoản, tên
đăng nhập đích, timestamp).
8. Giao diện Quản trị nhận xác nhận thành công, tải lại danh sách
tài khoản từ Account Service và hiển thị thông báo kết quả.
Trang 40/87

| Trường      | Đại  | học Bách | Khoa      | Tp.     | Hồ Chí   | Minh  |       |      |         |       |       |       |      |
| ----------- | ---- | -------- | --------- | ------- | -------- | ----- | ----- | ---- | ------- | ----- | ----- | ----- | ---- |
| Khoa        | Khoa | học và   | Kỹ thuật  | Máy     | tính     |       |       |      |         |       |       |       |      |
| Use-case    | ID   |          | U5.2      |         |          |       |       |      |         |       |       |       |      |
| Use-case    | name |          | Quản      | lý tài  | khoản    | nhân  | viên  |      |         |       |       |       |      |
| Alternative |      | flows    | AF1 -     | Vô hiệu | hóa      | tài   | khoản | (tại | Step    | 2):   |       |       |      |
|             |      |          | 2.1. Thay | vì      | tạo mới, | Admin | chọn  |      | một tài | khoản | đã có | trong | danh |
sách.
|     |     |     | 2.2. Admin       | nhấn    | “Vô           | hiệu      | hóa”.            |           |           |             |          |           |         |
| --- | --- | --- | ---------------- | ------- | ------------- | --------- | ---------------- | --------- | --------- | ----------- | -------- | --------- | ------- |
|     |     |     | 2.3. Account     |         | Service       | trả       | về thông         | tin       | tài       | khoản       | được     | chọn.     | Giao    |
|     |     |     | diện Quản        | trị     | hiển          | thị thông | tin              | và        | yêu cầu   | xác         | nhận.    |           |         |
|     |     |     | 2.4. Admin       | xác     | nhận.         |           |                  |           |           |             |          |           |         |
|     |     |     | 2.5. Account     |         | Service       | cập       | nhật             | trạng     | thái      | tài khoản   | thành    | “Đã       | vô      |
|     |     |     | hiệu hóa”        | trong   | Cơ            | sở Dữ     | liệu             | và gửi    | yêu       | cầu hủy     | phiên    | đăng      | nhập    |
|     |     |     | hiện tại         | của     | nhân          | viên đó   | (nếu             | có).      | Audit     | Logger      | ghi      | nhận      | hành    |
|     |     |     | động vô          | hiệu    | hóa (adminId, |           | hành             | động      | vô        | hiệu        | hóa tài  | khoản,    |         |
|     |     |     | targetAccountId, |         | timestamp).   |           |                  |           |           |             |          |           |         |
|     |     |     | 2.6. Tiếp        | tục     | Step          | 8 của     | Basic            | Flow.     |           |             |          |           |         |
|     |     |     | AF2 -            | Reset   | mật           | khẩu      | nhân             | viên      | (tại      | Step        | 2):      |           |         |
|     |     |     | 2.1. Admin       | chọn    | một           | tài       | khoản            | đã        | có trong  | danh        | sách.    |           |         |
|     |     |     | 2.2. Admin       | chọn    | “Reset        |           | mật khẩu”.       |           |           |             |          |           |         |
|     |     |     | 2.3. Account     |         | Service       | tạo       | mật              | khẩu      | tạm thời, | cập         | nhật     | Cơ sở     | Dữ liệu |
|     |     |     | và gửi           | yêu cầu | gửi           | mật       | khẩu tạm         | thời      | tới       | Email       | Service. | Email     |         |
|     |     |     | Service          | gửi mật | khẩu          | đến       | địa              | chỉ email | đã        | đăng        | ký của   | nhân      | viên.   |
|     |     |     | 2.4. Audit       | Logger  |               | ghi nhận  | hành             | động      | đặt       | lại mật     | khẩu     | (adminId, |         |
|     |     |     | hành động        | reset   | mật           | khẩu,     | targetAccountId, |           |           | timestamp). |          | Giao      | diện    |
|     |     |     | Quản trị         | hiển    | thị thông     |           | báo “Đã          | gửi       | mật       | khẩu tạm    | thời     | tới       | email   |
|     |     |     | của nhân         | viên”.  |               |           |                  |           |           |             |          |           |         |
|     |     |     | 2.5. UC          | kết     | thúc thành    |           | công.            |           |           |             |          |           |         |
Post conditions Tài khoản nhân viên được tạo mới, vô hiệu hóa hoặc reset mật khẩu
|     |     |     | thành công | trong |      | Cơ sở | Dữ liệu. | Danh  | sách | tài       | khoản | nhân | viên |
| --- | --- | --- | ---------- | ----- | ---- | ----- | -------- | ----- | ---- | --------- | ----- | ---- | ---- |
|     |     |     | được cập   | nhật  | phản | ánh   | đúng     | trạng | thái | hiện tại. |       |      |      |
Exception flow - E1 (Tên đăng nhập đã tồn tại): Nếu Account Service phát
|     |     |     | hiện tên    | đăng     | nhập      | trùng    | với         | tài khoản | đã    | có, Account |          | Service  | trả         |
| --- | --- | --- | ----------- | -------- | --------- | -------- | ----------- | --------- | ----- | ----------- | -------- | -------- | ----------- |
|     |     |     | về lỗi.     | Giao     | diện Quản | trị      | hiển        | thị       | thông | báo “Tên    | đăng     | nhập     | đã          |
|     |     |     | được sử     | dụng”    | và        | yêu cầu  | nhập        | tên       | khác. |             |          |          |             |
|     |     |     | - E2 (Thông |          | tin       | không    | hợp         | lệ):      | Nếu   | Account     | Service  | phát     | hiện        |
|     |     |     | trường      | bắt buộc | bị        | bỏ trống | hoặc        | số        | điện  | thoại       | sai định | dạng,    |             |
|     |     |     | Account     | Service  | trả       | về lỗi   | validation. |           | Giao  | diện        | Quản     | trị hiển | thị lỗi     |
|     |     |     | tại trường  | tương    | ứng.      |          |             |           |       |             |          |          |             |
|     |     |     |             |          |           |          |             |           |       |             |          |          | Trang 41/87 |

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 24: Sequence Diagram — UC5.2: Quản lý tài khoản nhân viên
Trang 42/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 25: Activity Diagram — UC5.2: Quản lý tài khoản nhân viên
Trang 43/87

|       | Trường   | Đại  | học Bách | Khoa     | Tp.     | Hồ Chí | Minh |     |     |     |     |     |     |
| ----- | -------- | ---- | -------- | -------- | ------- | ------ | ---- | --- | --- | --- | --- | --- | --- |
|       | Khoa     | Khoa | học và   | Kỹ thuật | Máy     | tính   |      |     |     |     |     |     |     |
| 4.5.2 | Use-case |      | 5.3:     | Xuất báo | cáo     |        |      |     |     |     |     |     |     |
|       | Use-case | ID   |          | U5.3     |         |        |      |     |     |     |     |     |     |
|       | Use-case | name |          | Xuất     | báo cáo |        |      |     |     |     |     |     |     |
Use-case overview Cho phép quản trị viên tạo và tải về các báo cáo thống kê đã được
|     |        |     |     | tổng hợp | và    | tính toán | về   | hoạt động | gửi  | xe, | doanh    | thu, tình | trạng   |
| --- | ------ | --- | --- | -------- | ----- | --------- | ---- | --------- | ---- | --- | -------- | --------- | ------- |
|     |        |     |     | bãi đỗ   | xe và | hoạt động | nhân | viên,     | phục | vụ  | công tác | kiểm      | tra tài |
|     |        |     |     | chính và | đối   | soát định | kỳ.  |           |      |     |          |           |         |
|     | Actors |     |     | Primary: | Admin |           |      |           |      |     |          |           |         |
Internal Report Service: Tổng hợp dữ liệu thô từ Cơ sở Dữ liệu thành các
|     | Components |     |     | chỉ số thống    |                 | kê (group | by,         | sum,   | avg).      |        |          |      |              |
| --- | ---------- | --- | --- | --------------- | --------------- | --------- | ----------- | ------ | ---------- | ------ | -------- | ---- | ------------ |
|     |            |     |     | File Generator: |                 |           | Chuyển      | đổi dữ | liệu       | thống  | kê thành | các  | định dạng    |
|     |            |     |     | file vật        | lý (Excel/PDF). |           |             |        |            |        |          |      |              |
|     |            |     |     | Cơ sở           | Dữ liệu:        | Lưu       | trữ         | toàn   | bộ dữ liệu | nghiệp | vụ,      | tiếp | nhận các     |
|     |            |     |     | yêu cầu         | đọc/ghi         | từ        | các service | nội    | bộ thông   |        | qua lớp  | truy | cập dữ liệu. |
Preconditions 1. Admin đã đăng nhập và được phân quyền quản trị hệ thống.
|     |     |     |     | 2. Hệ thống |     | đã ghi  | nhận | dữ liệu | hoạt | động | (lượt gửi | xe, | giao dịch |
| --- | --- | --- | --- | ----------- | --- | ------- | ---- | ------- | ---- | ---- | --------- | --- | --------- |
|     |     |     |     | thanh toán, |     | nhật ký | vận  | hành).  |      |      |           |     |           |
Trigger Admin chọn mục “Xuất báo cáo” trên giao diện quản trị.
Steps 1. Giao diện Quản trị hiển thị giao diện xuất báo cáo với các tùy
|     |     |     |     | chọn: loại  | báo      | cáo         | (lượt    | gửi xe,  | doanh     | thu,     | tình trạng | bãi        | đỗ, hoạt    |
| --- | --- | --- | --- | ----------- | -------- | ----------- | -------- | -------- | --------- | -------- | ---------- | ---------- | ----------- |
|     |     |     |     | động nhân   | viên)    | và          | bộ lọc   | thời     | gian (từ  | ngày     | - đến      | ngày).     |             |
|     |     |     |     | 2. Admin    | chọn     | loại        | báo      | cáo và   | khoảng    | thời     | gian mong  | muốn.      |             |
|     |     |     |     | 3. Admin    | nhấn     | “Xuất       | báo      | cáo”.    |           |          |            |            |             |
|     |     |     |     | 4. Giao     | diện     | Quản        | trị gửi  | yêu cầu  | tới       | Report   | Service    | kèm        | điều kiện   |
|     |     |     |     | lọc. Report | Service  |             | xác thực | khoảng   | thời      | gian     | đầu        | vào, sau   | đó truy     |
|     |     |     |     | vấn dữ      | liệu thô | từ          | Cơ sở    | Dữ liệu  | và thực   | hiện     | tổng       | hợp,       | tính toán   |
|     |     |     |     | các chỉ     | số thống | kê.         |          |          |           |          |            |            |             |
|     |     |     |     | 5. Report   | Service  | trả         | về       | dữ liệu  | thống     | kê đã    | tổng       | hợp. Giao  | diện        |
|     |     |     |     | Quản trị    | hiển     | thị preview |          | dữ liệu  | dạng      | bảng     | để Admin   | xem        | xét         |
|     |     |     |     | trước khi   | tải      | về.         |          |          |           |          |            |            |             |
|     |     |     |     | 6. Admin    | xác      | nhận        | dữ liệu  | đúng     | và nhấn   | “Tải     | về”.       |            |             |
|     |     |     |     | 7. Giao     | diện     | Quản        | trị gửi  | yêu cầu  | tạo       | file tới | File       | Generator. | File        |
|     |     |     |     | Generator   | nhận     | dữ          | liệu     | thống kê | từ Report |          | Service    | và tạo     | file theo   |
|     |     |     |     | định dạng   | đã       | chọn        | (mặc     | định:    | Excel).   | Giao     | diện Quản  | trị        | cung cấp    |
|     |     |     |     | liên kết    | tải về.  |             |          |          |           |          |            |            |             |
|     |     |     |     |             |          |             |          |          |           |          |            |            | Trang 44/87 |

| Trường   | Đại  | học Bách | Khoa     | Tp. | Hồ Chí | Minh |     |     |     |     |     |     |
| -------- | ---- | -------- | -------- | --- | ------ | ---- | --- | --- | --- | --- | --- | --- |
| Khoa     | Khoa | học và   | Kỹ thuật | Máy | tính   |      |     |     |     |     |     |     |
| Use-case | ID   |          | U5.3     |     |        |      |     |     |     |     |     |     |
| Use-case | name |          | Xuất báo | cáo |        |      |     |     |     |     |     |     |
Alternative flows AF1 - Admin chọn định dạng xuất (tại Step 3):
|     |     |     | 3.1. Trước | khi  | nhấn     | “Xuất     | báo  | cáo”,  | Admin | chọn    | định dạng | file |
| --- | --- | --- | ---------- | ---- | -------- | --------- | ---- | ------ | ----- | ------- | --------- | ---- |
|     |     |     | mong muốn: |      | Excel    | hoặc      | PDF. |        |       |         |           |      |
|     |     |     | 3.2. Giao  | diện | Quản     | trị ghi   | nhận | định   | dạng  | đã chọn | và chuyển |      |
|     |     |     | thông tin  | này  | đến File | Generator |      | ở Step | 7.    |         |           |      |
|     |     |     | 3.3. Tiếp  | tục  | Step 4.  |           |      |        |       |         |           |      |
Post conditions File báo cáo được tải về máy admin thành công. Dữ liệu hệ thống
|     |     |     | không | bị thay | đổi. |     |     |     |     |     |     |     |
| --- | --- | --- | ----- | ------- | ---- | --- | --- | --- | --- | --- | --- | --- |
Exception flow - E1 (Không có dữ liệu): Nếu Report Service truy vấn Cơ sở Dữ
|     |     |     | liệu với     | khoảng    | thời    | gian     | đã chọn | và              | nhận       | về tập    | rỗng, Report    |             |
| --- | --- | --- | ------------ | --------- | ------- | -------- | ------- | --------------- | ---------- | --------- | --------------- | ----------- |
|     |     |     | Service      | trả về    | trạng   | thái     | không   | có dữ           | liệu.      | Giao diện | Quản            | trị hiển    |
|     |     |     | thị thông    | báo       | “Không  | có       | dữ liệu | trong           | khoảng     | thời      | gian đã         | chọn” và    |
|     |     |     | không        | tạo file. |         |          |         |                 |            |           |                 |             |
|     |     |     | - E2 (Khoảng |           | thời    | gian     | không   | hợp             | lệ):       | Nếu       | Report Service  |             |
|     |     |     | phát hiện    | fromDate  |         | lớn hơn  | toDate  |                 | hoặc Admin |           | bỏ trống trường |             |
|     |     |     | bắt buộc,    | Report    | Service |          | trả về  | lỗi validation. |            | Giao      | diện Quản       | trị         |
|     |     |     | hiển thị     | lỗi và    | yêu     | cầu chọn | lại.    |                 |            |           |                 |             |
|     |     |     |              |           |         |          |         |                 |            |           |                 | Trang 45/87 |

| Trường Đại | học Bách | Khoa Tp.     | Hồ Chí Minh |               |         |
| ---------- | -------- | ------------ | ----------- | ------------- | ------- |
| Khoa Khoa  | học và   | Kỹ thuật     | Máy tính    |               |         |
|            | Hình     | 26: Sequence | Diagram     | — UC5.3: Xuất | báo cáo |
Trang 46/87

| Trường Đại | học Bách | Khoa Tp.     | Hồ Chí Minh |               |         |
| ---------- | -------- | ------------ | ----------- | ------------- | ------- |
| Khoa Khoa  | học và   | Kỹ thuật     | Máy tính    |               |         |
|            | Hình     | 27: Activity | Diagram     | — UC5.3: Xuất | báo cáo |
Trang 47/87

|       | Trường   | Đại  | học Bách | Khoa     | Tp.   | Hồ Chí | Minh |     |     |     |     |     |     |
| ----- | -------- | ---- | -------- | -------- | ----- | ------ | ---- | --- | --- | --- | --- | --- | --- |
|       | Khoa     | Khoa | học và   | Kỹ thuật | Máy   | tính   |      |     |     |     |     |     |     |
| 4.5.3 | Use-case |      | 5.4:     | Thay đổi | chính | sách   | giá  |     |     |     |     |     |     |
|       | Use-case | ID   |          | U5.4     |       |        |      |     |     |     |     |     |     |
|       | Use-case | name |          | Thay đổi | chính | sách   | giá  |     |     |     |     |     |     |
Use-case overview Cho phép quản trị viên cấu hình và cập nhật đơn giá gửi xe theo vai
|     |        |     |     | trò người | dùng  | và khung    |     | giờ, phục | vụ  | việc điều | chỉnh | chính | sách giá |
| --- | ------ | --- | --- | --------- | ----- | ----------- | --- | --------- | --- | --------- | ----- | ----- | -------- |
|     |        |     |     | theo quy  | định  | của trường. |     |           |     |           |       |       |          |
|     | Actors |     |     | Primary:  | Admin |             |     |           |     |           |       |       |          |
Internal Pricing Service: Quản lý bảng giá, xử lý logic về thời điểm áp
|     | Components |     |     | dụng giá | (effective | date).    |         |          |     |                |      |      |              |
| --- | ---------- | --- | --- | -------- | ---------- | --------- | ------- | -------- | --- | -------------- | ---- | ---- | ------------ |
|     |            |     |     | Audit    | Logger:    | Hệ        | thống   | ghi vết, | đảm | bảo tính       | toàn | vẹn  | và minh      |
|     |            |     |     | bạch của | mọi        | hành động |         | thay đổi | dữ  | liệu từ Admin. |      |      |              |
|     |            |     |     | Cơ sở    | Dữ liệu:   | Lưu       | trữ     | toàn bộ  | dữ  | liệu nghiệp    | vụ,  | tiếp | nhận các     |
|     |            |     |     | yêu cầu  | đọc/ghi    | từ các    | service | nội      | bộ  | thông qua      | lớp  | truy | cập dữ liệu. |
Preconditions 1. Admin đã đăng nhập và được phân quyền quản trị hệ thống.
|     |     |     |     | 2. Hệ thống |     | đã có bảng | chính | sách | giá | hiện hành. |     |     |     |
| --- | --- | --- | --- | ----------- | --- | ---------- | ----- | ---- | --- | ---------- | --- | --- | --- |
Trigger Admin chọn mục “Chính sách giá” trên giao diện quản trị.
Steps 1. Giao diện Quản trị gửi yêu cầu lấy bảng chính sách giá tới Pricing
|     |     |     |     | Service.   | Pricing | Service  | truy    | vấn            | Cơ       | sở Dữ liệu  | và trả   | về    | bảng chính   |
| --- | --- | --- | --- | ---------- | ------- | -------- | ------- | -------------- | -------- | ----------- | -------- | ----- | ------------ |
|     |     |     |     | sách giá   | hiện    | hành,    | phân    | theo vai       | trò      | (sinh viên, | giảng    | viên, | cán bộ,      |
|     |     |     |     | khách vãng | lai)    | và khung |         | giờ (6h30-18h, |          | sau 18h,    | qua      | đêm). |              |
|     |     |     |     | 2. Admin   | chọn    | mục      | giá cần | chỉnh          | sửa.     |             |          |       |              |
|     |     |     |     | 3. Pricing | Service | truy     | vấn     | Cơ sở          | Dữ       | liệu và trả | về thông |       | tin chi tiết |
|     |     |     |     | của mục    | giá     | đó bao   | gồm:    | vai trò        | áp dụng, | khung       | giờ,     | đơn   | giá hiện     |
tại.
|     |     |     |     | 4. Admin      | nhập    | đơn       | giá mới | và       | nhấn | “Cập nhật”. |           |          |             |
| --- | --- | --- | --- | ------------- | ------- | --------- | ------- | -------- | ---- | ----------- | --------- | -------- | ----------- |
|     |     |     |     | 5. Pricing    | Service | kiểm      | tra     | tính     | hợp  | lệ của đơn  | giá       | mới. Nếu | hợp lệ,     |
|     |     |     |     | Giao diện     | Quản    | trị       | yêu cầu | Admin    | xác  | nhận        | thay đổi. |          |             |
|     |     |     |     | 6. Admin      | xác     | nhận.     |         |          |      |             |           |          |             |
|     |     |     |     | 7. Pricing    | Service | lưu       | chính   | sách     | giá  | mới vào     | Cơ sở     | Dữ liệu  | với         |
|     |     |     |     | effectiveDate |         | = ngày    | tiếp    | theo,    | đồng | thời gửi    | yêu cầu   | ghi      | nhật ký     |
|     |     |     |     | tới Audit     | Logger  | (bao      | gồm     | adminId, |      | pricingId,  | giá       | cũ, giá  | mới,        |
|     |     |     |     | timestamp).   |         | Giao diện | Quản    | trị      | hiển | thị thông   | báo       | “Cập     | nhật chính  |
|     |     |     |     | sách giá      | thành   | công.     | Giá     | mới sẽ   | được | áp dụng     | từ ngày   | mai”.    |             |
|     |     |     |     |               |         |           |         |          |      |             |           |          | Trang 48/87 |

| Trường   | Đại  | học Bách | Khoa     | Tp.       | Hồ Chí | Minh |     |     |     |     |     |     |     |
| -------- | ---- | -------- | -------- | --------- | ------ | ---- | --- | --- | --- | --- | --- | --- | --- |
| Khoa     | Khoa | học và   | Kỹ thuật | Máy       | tính   |      |     |     |     |     |     |     |     |
| Use-case | ID   |          | U5.4     |           |        |      |     |     |     |     |     |     |     |
| Use-case | name |          | Thay     | đổi chính | sách   | giá  |     |     |     |     |     |     |     |
Alternative flows AF1 - Admin áp dụng giá ngay lập tức (tại Step 6):
|     |     |     | 6.1. Sau              | khi     | Admin    | xác       | nhận ở  | Step   | 6, Giao   | diện                  | Quản  | trị     | hỏi: “Áp |
| --- | --- | --- | --------------------- | ------- | -------- | --------- | ------- | ------ | --------- | --------------------- | ----- | ------- | -------- |
|     |     |     | dụng từ               | ngày    | mai (mặc |           | định)   | hay áp | dụng      | ngay                  | lập   | tức?”.  |          |
|     |     |     | 6.2. Admin            | chọn    | “Áp      | dụng      | ngay”.  |        |           |                       |       |         |          |
|     |     |     | 6.3. Giao             | diện    | Quản     | trị hiển  | thị     | cảnh   | báo:      | “Thao                 | tác   | này     | sẽ ảnh   |
|     |     |     | hưởng                 | tới các | phiên    | gửi       | xe đang | diễn   | ra.       | Bạn có                | chắc  | chắn?”  | và yêu   |
|     |     |     | cầu xác               | nhận    | lần hai. |           |         |        |           |                       |       |         |          |
|     |     |     | 6.4. Admin            | xác     | nhận     | lần       | hai.    |        |           |                       |       |         |          |
|     |     |     | 6.5. Pricing          |         | Service  | lưu chính | sách    | giá    | mới       | vào                   | Cơ sở | Dữ liệu | với      |
|     |     |     | effectiveDate         |         | = thời   | điểm      | hiện    | tại và | trường    | effective_immediately |       |         |          |
|     |     |     | = true.               | Audit   | Logger   | ghi       | nhận    | bản    | ghi thay  | đổi                   | với   | trường  |          |
|     |     |     | effective_immediately |         |          | =         | true.   |        |           |                       |       |         |          |
|     |     |     | 6.6. Tiếp             | tục     | Step     | 7 của     | Basic   | Flow   | với thông | báo                   | điều  | chỉnh:  | “Giá     |
|     |     |     | mới đã                | được    | áp dụng  | ngay      | lập     | tức”.  |           |                       |       |         |          |
Post conditions Chính sách giá mới được lưu trong Cơ sở Dữ liệu và sẽ tự động áp
|     |     |     | dụng từ   | 0h00     | ngày   | tiếp theo | (hoặc | ngay      | lập   | tức    | nếu | chọn     | AF1).   |
| --- | --- | --- | --------- | -------- | ------ | --------- | ----- | --------- | ----- | ------ | --- | -------- | ------- |
|     |     |     | Chính     | sách giá | cũ vẫn | có        | hiệu  | lực trong | ngày  | hiện   | tại | trừ      | khi AF1 |
|     |     |     | được kích | hoạt.    | Lịch   | sử thay   | đổi   | được      | Audit | Logger |     | ghi nhận | đầy     |
đủ.
Exception flow - E1 (Giá trị không hợp lệ): Nếu Pricing Service phát hiện đơn
|     |     |     | giá âm,     | bằng      | 0, hoặc   | không    | phải   | số,          | Pricing   | Service |         | trả về    | lỗi         |
| --- | --- | --- | ----------- | --------- | --------- | -------- | ------ | ------------ | --------- | ------- | ------- | --------- | ----------- |
|     |     |     | validation. | Giao      | diện      | Quản     | trị    | hiển         | thị thông | báo     | “Đơn    | giá       | không       |
|     |     |     | hợp lệ”     | và yêu    | cầu       | nhập     | lại.   |              |           |         |         |           |             |
|     |     |     | - E2 (Giá   | mới       | trùng     | giá      | cũ):   | Nếu          | Pricing   | Service |         | phát      | hiện đơn    |
|     |     |     | giá mới     | giống     | hệt đơn   | giá      | hiện   | tại, Pricing |           | Service | trả     | về trạng  | thái        |
|     |     |     | không       | thay      | đổi. Giao | diện     | Quản   | trị          | thông     | báo     | “Đơn    | giá không | thay        |
|     |     |     | đổi” và     | không     | tạo bản   | ghi      | nhật   | ký.          |           |         |         |           |             |
|     |     |     | - E3 (Giá   | trị       | bất       | thường): |        | Nếu Pricing  |           | Service | phát    | hiện      | đơn giá     |
|     |     |     | mới chênh   | lệch      | hơn       | 200%     | so với | đơn          | giá hiện  | tại,    | Pricing |           | Service     |
|     |     |     | đẩy cảnh    | báo       | “Đơn      | giá thay | đổi    | bất          | thường”   | lên     | Giao    | diện      | Quản trị    |
|     |     |     | và yêu      | cầu Admin |           | xác nhận | thêm   | một          | lần       | nữa     | trước   | khi lưu.  |             |
|     |     |     |             |           |           |          |        |              |           |         |         |           | Trang 49/87 |

| Trường Đại | học Bách          | Khoa Tp. | Hồ Chí Minh   |           |          |
| ---------- | ----------------- | -------- | ------------- | --------- | -------- |
| Khoa Khoa  | học và            | Kỹ thuật | Máy tính      |           |          |
|            | Hình 28: Sequence | Diagram  | — UC5.4: Thay | đổi chính | sách giá |
Trang 50/87

| Trường Đại | học Bách | Khoa Tp.         | Hồ Chí Minh   |           |          |
| ---------- | -------- | ---------------- | ------------- | --------- | -------- |
| Khoa Khoa  | học và   | Kỹ thuật         | Máy tính      |           |          |
|            | Hình 29: | Activity Diagram | — UC5.4: Thay | đổi chính | sách giá |
Trang 51/87

|          | Trường   | Đại  | học  | Bách Khoa   | Tp. Hồ Chí | Minh     |     |     |     |     |     |     |     |
| -------- | -------- | ---- | ---- | ----------- | ---------- | -------- | --- | --- | --- | --- | --- | --- | --- |
|          | Khoa     | Khoa | học  | và Kỹ thuật | Máy tính   |          |     |     |     |     |     |     |     |
| 4.5.4    | Use-case |      | 5.5: | Truy cập    | nhật ký    | hệ thống |     |     |     |     |     |     |     |
| Use-case |          | ID   |      | U5.5        |            |          |     |     |     |     |     |     |     |
| Use-case |          | name |      | Truy cập    | nhật ký    | hệ thống |     |     |     |     |     |     |     |
Use-case overview Cho phép quản trị viên xem trực tiếp nhật ký raw về các hành động
|     |     |     |     | và sự kiện | trong hệ | thống | - bao | gồm | lượt ra/vào |     | bãi xe, | giao | dịch |
| --- | --- | --- | --- | ---------- | -------- | ----- | ----- | --- | ----------- | --- | ------- | ---- | ---- |
thanh toán, thay đổi chính sách giá, đăng nhập và thao tác của nhân
|        |     |     |     | viên vận | hành - phục | vụ  | mục đích | điều | tra | sự cố | và kiểm | toán. |     |
| ------ | --- | --- | --- | -------- | ----------- | --- | -------- | ---- | --- | ----- | ------- | ----- | --- |
| Actors |     |     |     | Primary: | Admin       |     |          |      |     |       |         |       |     |
Internal Log Service: Quản lý và truy vấn nhật ký hệ thống, hỗ trợ lọc theo
Components nhiều chiều (loại sự kiện, khoảng thời gian, người dùng).
File Generator: Chuyển đổi dữ liệu nhật ký thành file CSV để xuất
về máy Admin.
|     |     |     |     | Cơ sở | Dữ liệu: Lưu | trữ | toàn | bộ dữ | liệu nghiệp |     | vụ, tiếp | nhận | các |
| --- | --- | --- | --- | ----- | ------------ | --- | ---- | ----- | ----------- | --- | -------- | ---- | --- |
yêu cầu đọc/ghi từ các service nội bộ thông qua lớp truy cập dữ liệu.
Preconditions 1. Admin đã đăng nhập và được phân quyền quản trị hệ thống.
|     |     |     |     | 2. Hệ thống | đã ghi | nhận | dữ liệu | nhật | ký hoạt | động. |     |     |     |
| --- | --- | --- | --- | ----------- | ------ | ---- | ------- | ---- | ------- | ----- | --- | --- | --- |
Trigger Admin chọn mục “Nhật ký hệ thống” trên giao diện quản trị.
Steps 1. Giao diện Quản trị gửi yêu cầu lấy nhật ký mới nhất tới Log
|     |     |     |     | Service.   | Log Service | truy   | vấn Cơ | sở     | Dữ liệu | (sắp | xếp giảm  |     | dần theo |
| --- | --- | --- | --- | ---------- | ----------- | ------ | ------ | ------ | ------- | ---- | --------- | --- | -------- |
|     |     |     |     | timestamp, | giới hạn    | 50 bản | ghi)   | và trả | về      | danh | sách nhật | ký, | mỗi      |
dòng gồm: thời điểm, loại sự kiện, người thực hiện, nội dung chi tiết.
|     |     |     |     | 2. Admin  | sử dụng bộ       | lọc     | để thu      | hẹp    | kết quả | theo:    | loại     | sự kiện | (lượt   |
| --- | --- | --- | --- | --------- | ---------------- | ------- | ----------- | ------ | ------- | -------- | -------- | ------- | ------- |
|     |     |     |     | gửi xe,   | giao dịch, thay  | đổi     | giá,        | đăng   | nhập,   | thao     | tác nhân | viên),  |         |
|     |     |     |     | khoảng    | thời gian (từ    | ngày    | - đến       | ngày), | hoặc    | người    | dùng     | cụ      | thể.    |
|     |     |     |     | 3. Admin  | nhấn “Áp         | dụng    | bộ lọc”.    |        |         |          |          |         |         |
|     |     |     |     | 4. Giao   | diện Quản        | trị gửi | yêu cầu     | kiểm   | tra     | tính     | hợp lệ   | của     | khoảng  |
|     |     |     |     | thời gian | tới Log Service. |         | Log Service |        | xác     | thực đầu | vào,     | sau     | đó truy |
|     |     |     |     | vấn Cơ    | sở Dữ liệu theo  | điều    | kiện        | lọc    | đã nhập | và       | trả về   | danh    | sách    |
|     |     |     |     | nhật ký   | phù hợp. Giao    | diện    | Quản        | trị    | hiển    | thị kết  | quả.     |         |         |
|     |     |     |     | 5. Admin  | chọn một         | dòng    | nhật        | ký để  | xem chi | tiết.    |          |         |         |
6. Giao diện Quản trị gửi yêu cầu chi tiết sự kiện tới Log Service. Log
Service truy vấn chi tiết theo logId từ Cơ sở Dữ liệu và trả về toàn bộ
|     |     |     |     | thông | tin. Giao diện | Quản | trị hiển | thị. |     |     |     |     |             |
| --- | --- | --- | --- | ----- | -------------- | ---- | -------- | ---- | --- | --- | --- | --- | ----------- |
|     |     |     |     |       |                |      |          |      |     |     |     |     | Trang 52/87 |

| Trường   | Đại  | học | Bách Khoa   | Tp.  | Hồ Chí | Minh     |     |     |     |     |     |     |
| -------- | ---- | --- | ----------- | ---- | ------ | -------- | --- | --- | --- | --- | --- | --- |
| Khoa     | Khoa | học | và Kỹ thuật | Máy  | tính   |          |     |     |     |     |     |     |
| Use-case | ID   |     | U5.5        |      |        |          |     |     |     |     |     |     |
| Use-case | name |     | Truy cập    | nhật | ký     | hệ thống |     |     |     |     |     |     |
Alternative flows AF1 - Export nhật ký đã lọc ra file (tại Step 4):
|     |     |     | 4.1. Sau | khi    | Log Service | trả   | về kết | quả lọc, | Admin | chọn | “Xuất | nhật |
| --- | --- | --- | -------- | ------ | ----------- | ----- | ------ | -------- | ----- | ---- | ----- | ---- |
|     |     |     | ký” thay | vì đọc | từng        | dòng. |        |          |       |      |       |      |
4.2. Giao diện Quản trị gửi yêu cầu xuất nhật ký tới Log Service. Log
Service truy vấn toàn bộ nhật ký phù hợp với điều kiện lọc hiện tại và
|     |     |     | chuyển | dữ liệu | tới | File Generator. |     |     |     |     |     |     |
| --- | --- | --- | ------ | ------- | --- | --------------- | --- | --- | --- | --- | --- | --- |
4.3. File Generator tạo file CSV và trả về đường dẫn tải về. Giao diện
|     |     |     | Quản trị | cung | cấp | liên kết | tải về. |     |     |     |     |     |
| --- | --- | --- | -------- | ---- | --- | -------- | ------- | --- | --- | --- | --- | --- |
4.4. UC kết thúc thành công mà không cần Admin thực hiện Step 5-6.
Post conditions Nhật ký hệ thống được hiển thị thành công trên màn hình. Dữ liệu
|     |     |     | nhật ký    | là append-only |           | và  | không | thể bị sửa | đổi | hoặc | xóa bởi | bất kỳ |
| --- | --- | --- | ---------- | -------------- | --------- | --- | ----- | ---------- | --- | ---- | ------- | ------ |
|     |     |     | actor nào, | kể             | cả Admin. |     |       |            |     |      |         |        |
Exception flow - E1 (Không có dữ liệu): Nếu Log Service truy vấn Cơ sở Dữ liệu
|     |     |     | với điều      | kiện  | lọc hiện  | tại và     | nhận     | về tập rỗng, | Log    | Service |           | trả về      |
| --- | --- | --- | ------------- | ----- | --------- | ---------- | -------- | ------------ | ------ | ------- | --------- | ----------- |
|     |     |     | trạng thái    | không | có        | kết quả.   | Giao     | diện Quản    | trị    | hiển    | thị thông | báo         |
|     |     |     | “Không        | tìm   | thấy nhật | ký phù     | hợp      | với điều     | kiện   | lọc”.   |           |             |
|     |     |     | - E2 (Khoảng  |       | thời      | gian       | không    | hợp lệ):     | Nếu    | Log     | Service   | phát        |
|     |     |     | hiện fromDate |       | lớn       | hơn toDate | hoặc     | bỏ trống,    | Log    | Service | trả       | về lỗi      |
|     |     |     | validation.   | Giao  | diện      | Quản       | trị hiển | thị lỗi      | và yêu | cầu     | chọn      | lại.        |
|     |     |     |               |       |           |            |          |              |        |         |           | Trang 53/87 |

| Trường Đại | học Bách     | Khoa Tp. | Hồ Chí Minh   |          |             |
| ---------- | ------------ | -------- | ------------- | -------- | ----------- |
| Khoa Khoa  | học và       | Kỹ thuật | Máy tính      |          |             |
| Hình       | 30: Sequence | Diagram  | — UC5.5: Truy | cập nhật | ký hệ thống |
Trang 54/87

| Trường Đại | học Bách     | Khoa Tp. | Hồ Chí Minh   |          |             |
| ---------- | ------------ | -------- | ------------- | -------- | ----------- |
| Khoa Khoa  | học và       | Kỹ thuật | Máy tính      |          |             |
| Hình       | 31: Activity | Diagram  | — UC5.5: Truy | cập nhật | ký hệ thống |
Trang 55/87

|       | Trường   | Đại  | học Bách | Khoa     | Tp.      | Hồ Chí | Minh |       |     |     |     |     |     |
| ----- | -------- | ---- | -------- | -------- | -------- | ------ | ---- | ----- | --- | --- | --- | --- | --- |
|       | Khoa     | Khoa | học và   | Kỹ thuật | Máy      | tính   |      |       |     |     |     |     |     |
| 4.5.5 | Use-case |      | 5.6:     | Giám sát | tình     | trạng  | bãi  | đỗ xe |     |     |     |     |     |
|       | Use-case | ID   |          | U5.6     |          |        |      |       |     |     |     |     |     |
|       | Use-case | name |          | Giám     | sát tình | trạng  | bãi  | đỗ xe |     |     |     |     |     |
Use-case overview Cho phép quản trị viên theo dõi tình trạng chiếm dụng chỗ đỗ xe
|     |        |     |     | theo thời     | gian     | thực       | trên toàn | bộ hệ      | thống,   | xem | chi       | tiết từng | khu   |
| --- | ------ | --- | --- | ------------- | -------- | ---------- | --------- | ---------- | -------- | --- | --------- | --------- | ----- |
|     |        |     |     | vực và        | từng     | chỗ đỗ     | cụ thể,   | phục vụ    | công     | tác | điều phối | và xử     | lý sự |
|     |        |     |     | cố liên       | quan     | đến sức    | chứa      | bãi đỗ.    |          |     |           |           |       |
|     | Actors |     |     | 1. Primary:   | Admin    |            |           |            |          |     |           |           |       |
|     |        |     |     | 2. Secondary: |          | IoT Sensor |           | (thông qua | Gateway, |     | cung      | cấp dữ    | liệu  |
|     |        |     |     | chiếm         | dụng của | từng       | chỗ       | đỗ)        |          |     |           |           |       |
Internal Parking Service: Quản lý và tổng hợp dữ liệu chiếm dụng chỗ đỗ
Components xe theo thời gian thực từ cảm biến IoT, hỗ trợ truy vấn theo khu
|     |     |     |     | vực và   | từng     | chỗ đỗ | cụ thể.     |          |          |           |      |           |          |
| --- | --- | --- | --- | -------- | -------- | ------ | ----------- | -------- | -------- | --------- | ---- | --------- | -------- |
|     |     |     |     | Audit    | Logger:  | Hệ     | thống       | ghi vết, | đảm      | bảo tính  | toàn | vẹn và    | minh     |
|     |     |     |     | bạch của | mọi      | hành   | động        | thay đổi | dữ liệu  | từ Admin. |      |           |          |
|     |     |     |     | Cơ sở    | Dữ liệu: | Lưu    | trữ         | toàn bộ  | dữ liệu  | nghiệp    | vụ,  | tiếp nhận | các      |
|     |     |     |     | yêu cầu  | đọc/ghi  | từ     | các service | nội      | bộ thông | qua       | lớp  | truy cập  | dữ liệu. |
Preconditions 1. Admin đã đăng nhập và được phân quyền quản trị hệ thống.
|     |     |     |     | 2. Ít nhất | một   | gateway | đang | kết nối | và      | truyền | dữ liệu | cảm    | biến về |
| --- | --- | --- | --- | ---------- | ----- | ------- | ---- | ------- | ------- | ------ | ------- | ------ | ------- |
|     |     |     |     | hệ thống   | trung | tâm.    |      |         |         |        |         |        |         |
|     |     |     |     | 3. Dữ liệu | chiếm | dụng    | chỗ  | đỗ đã   | được hệ | thống  | tổng    | hợp từ | các     |
cảm biến.
Trigger Admin chọn mục “Tình trạng bãi đỗ xe” trên giao diện quản trị.
|     |     |     |     |     |     |     |     |     |     |     |     |     | Trang 56/87 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------- |

| Trường   | Đại  | học Bách | Khoa     | Tp. Hồ   | Chí   | Minh |     |     |     |     |     |     |     |
| -------- | ---- | -------- | -------- | -------- | ----- | ---- | --- | --- | --- | --- | --- | --- | --- |
| Khoa     | Khoa | học và   | Kỹ thuật | Máy      | tính  |      |     |     |     |     |     |     |     |
| Use-case | ID   |          | U5.6     |          |       |      |     |     |     |     |     |     |     |
| Use-case | name |          | Giám     | sát tình | trạng | bãi  | đỗ  | xe  |     |     |     |     |     |
Steps 1. Giao diện Quản trị gửi yêu cầu tổng quan tình trạng bãi đỗ tới
|     |     |     | Parking            | Service.  | Parking     |                | Service  | truy      | vấn          | Cơ sở    | Dữ liệu  | và        | trả về  |
| --- | --- | --- | ------------------ | --------- | ----------- | -------------- | -------- | --------- | ------------ | -------- | -------- | --------- | ------- |
|     |     |     | tổng quan          | chiếm     | dụng,       | bao            | gồm:     | tổng      | số chỗ       | đỗ       | toàn     | hệ thống, | số      |
|     |     |     | chỗ đang           | có xe     | (occupied), |                | số       | chỗ trống | (available), |          | số       | chỗ không |         |
|     |     |     | xác định           | được      | trạng       | thái           | (do cảm  | biến      | lỗi          | hoặc     | offline) | - phân    | chia    |
|     |     |     | theo từng          | khu       | vực         | bãi đỗ,        | kèm      | trạng     | thái         | tổng hợp | mỗi      | khu       | vực     |
|     |     |     | (còn chỗ           | / gần     | đầy         | / hết          | chỗ).    |           |              |          |          |           |         |
|     |     |     | 2. Admin           | chọn      | một         | khu vực        | bãi      | đỗ cụ     | thể          | để xem   | chi      | tiết.     |         |
|     |     |     | 3. Parking         | Service   |             | truy vấn       | Cơ       | sở Dữ     | liệu         | và trả   | về trạng | thái      | từng    |
|     |     |     | chỗ đỗ             | trong     | khu vực     | được           | chọn.    | Giao      | diện         | Quản     | trị      | hiển thị  | sơ đồ   |
|     |     |     | khu vực            | với trạng | thái        | từng           | chỗ      | đỗ được   | mã           | hóa      | bằng     | màu       | sắc:    |
|     |     |     | trống (available), |           | có          | xe (occupied), |          | không     |              | xác định | (cảm     | biến      | offline |
|     |     |     | hoặc báo           | lỗi).     |             |                |          |           |              |          |          |           |         |
|     |     |     | 4. Admin           | chọn      | một         | chỗ đỗ         | cụ       | thể trên  | sơ           | đồ.      |          |           |         |
|     |     |     | 5. Parking         | Service   | truy        | vấn            | Cơ       | sở Dữ     | liệu         | và trả   | về thông | tin       | chỗ đỗ  |
|     |     |     | đó, bao            | gồm:      | mã chỗ      | đỗ,            | trạng    | thái hiện | tại,         | thời     | điểm     | cập       | nhật    |
|     |     |     | trạng thái         | lần       | cuối,       | và mã          | cảm      | biến      | liên kết     | kèm      | trạng    | thái      | hoạt    |
|     |     |     | động của           | cảm       | biến        | đó.            |          |           |              |          |          |           |         |
|     |     |     | 6. Admin           | xem       | xét thông   |                | tin. Nếu | cảm       | biến         | liên     | kết đang | có        | sự cố,  |
|     |     |     | Admin              | có thể    | chuyển      | sang           | xử       | lý trong  | U5.1         | (Theo    | dõi      | và quản   | lý      |
thiết bị IoT).
|     |     |     |     |     |     |     |     |     |     |     |     |     | Trang 57/87 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------- |

| Trường   | Đại  | học Bách | Khoa     | Tp.      | Hồ Chí | Minh |     |     |     |     |     |     |     |
| -------- | ---- | -------- | -------- | -------- | ------ | ---- | --- | --- | --- | --- | --- | --- | --- |
| Khoa     | Khoa | học và   | Kỹ thuật | Máy      | tính   |      |     |     |     |     |     |     |     |
| Use-case | ID   |          | U5.6     |          |        |      |     |     |     |     |     |     |     |
| Use-case | name |          | Giám     | sát tình | trạng  | bãi  | đỗ  | xe  |     |     |     |     |     |
Alternative flows AF1 - Admin xem lịch sử biến động chiếm dụng của một
|     |     |     | khu vực   | (tại | Step   | 2):     |       |       |     |           |      |     |         |
| --- | --- | --- | --------- | ---- | ------ | ------- | ----- | ----- | --- | --------- | ---- | --- | ------- |
|     |     |     | 2.1. Thay | vì   | xem sơ | đồ trực | tiếp, | Admin |     | chọn “Xem | lịch | sử” | của khu |
vực đó.
|     |     |     | 2.2. Admin | chọn | khoảng |     | thời | gian | cần xem | (theo | giờ | hoặc | theo |
| --- | --- | --- | ---------- | ---- | ------ | --- | ---- | ---- | ------- | ----- | --- | ---- | ---- |
ngày).
|     |     |     | 2.3. Parking |       | Service | truy     | vấn     | Cơ sở | Dữ liệu | và    | trả về   | chuỗi    | dữ liệu   |
| --- | --- | --- | ------------ | ----- | ------- | -------- | ------- | ----- | ------- | ----- | -------- | -------- | --------- |
|     |     |     | lịch sử      | chiếm | dụng    | theo     | khu vực | và    | khoảng  | thời  | gian     | đã chọn. | Giao      |
|     |     |     | diện Quản    | trị   | hiển    | thị biểu | đồ      | biến  | động    | tỷ lệ | chiếm    | dụng     | theo trục |
|     |     |     | thời gian,   | giúp  | Admin   | nhận     | diện    | khung | giờ     | cao   | điểm     | và thấp  | điểm.     |
|     |     |     | 2.4. Admin   | xem   | xét     | và kết   | thúc    | UC,   | hoặc    | quay  | lại Step | 2 để     | xem       |
|     |     |     | khu vực      | khác. |         |          |         |       |         |       |          |          |           |
|     |     |     | AF2 -        | Admin | ghi     | chú      | thủ     | công  | trạng   | thái  | một      | chỗ      | đỗ (tại   |
Step 5):
|     |     |     | 5.1. Admin | phát | hiện      | dữ  | liệu  | cảm biến | không | khớp   | với  | thực  | tế (ví |
| --- | --- | --- | ---------- | ---- | --------- | --- | ----- | -------- | ----- | ------ | ---- | ----- | ------ |
|     |     |     | dụ: cảm    | biến | báo trống |     | nhưng | thực     | tế có | xe).   |      |       |        |
|     |     |     | 5.2. Admin | chọn | “Ghi      | chú | trạng | thái     | thực  | tế” và | nhập | mô tả | tình   |
trạng.
|     |     |     | 5.3. Parking |      | Service    | lưu      | ghi chú | vào   | Cơ sở  | Dữ          | liệu kèm | thông  | tin  |
| --- | --- | --- | ------------ | ---- | ---------- | -------- | ------- | ----- | ------ | ----------- | -------- | ------ | ---- |
|     |     |     | người thực   | hiện | và         | thời     | điểm.   | Audit | Logger | ghi         | nhận     | hành   | động |
|     |     |     | (adminId,    | mã   | chỗ        | đỗ, hành | động    | ghi   | chú,   | timestamp). |          | Giao   | diện |
|     |     |     | Quản trị     | hiển | thị icon   | cảnh     | báo     | trên  | chỗ    | đỗ đó       | trong    | sơ đồ. |      |
|     |     |     | 5.4. UC      | kết  | thúc thành | công.    |         |       |        |             |          |        |      |
Post conditions 1. Tình trạng chiếm dụng bãi đỗ xe được hiển thị thành công, phản
|     |     |     | ánh dữ     | liệu  | cảm biến | mới      | nhất | mà      | hệ thống | nhận    | được.   |         |         |
| --- | --- | --- | ---------- | ----- | -------- | -------- | ---- | ------- | -------- | ------- | ------- | ------- | ------- |
|     |     |     | 2. Nếu     | Admin | thực     | hiện     | AF2: | ghi chú | trạng    | thái    | thực    | tế được | lưu     |
|     |     |     | trong Cơ   | sở    | Dữ liệu  | và Audit |      | Logger  | ghi      | nhật ký | hành    | động    | đầy đủ. |
|     |     |     | 3. Dữ liệu | cảm   | biến     | không    | bị   | thay    | đổi bởi  | bất     | kỳ thao | tác nào | trong   |
UC này.
|     |     |     |     |     |     |     |     |     |     |     |     |     | Trang 58/87 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------- |

| Trường   | Đại  | học Bách | Khoa     | Tp. Hồ   | Chí   | Minh |       |     |     |     |     |     |
| -------- | ---- | -------- | -------- | -------- | ----- | ---- | ----- | --- | --- | --- | --- | --- |
| Khoa     | Khoa | học và   | Kỹ thuật | Máy      | tính  |      |       |     |     |     |     |     |
| Use-case | ID   |          | U5.6     |          |       |      |       |     |     |     |     |     |
| Use-case | name |          | Giám     | sát tình | trạng | bãi  | đỗ xe |     |     |     |     |     |
Exception flow E1 (Toàn bộ cảm biến của một khu vực offline): Nếu Parking
|     |     |     | Service    | phát hiện | tất     | cả cảm  | biến     | trong | một      | khu vực  | đều       | không       |
| --- | --- | --- | ---------- | --------- | ------- | ------- | -------- | ----- | -------- | -------- | --------- | ----------- |
|     |     |     | phản hồi,  | Parking   | Service | cập     | nhật     | trạng | thái     | khu      | vực đó    | thành       |
|     |     |     | “Không     | xác định  | - mất   | dữ      | liệu cảm | biến” | và       | loại trừ | khu vực   | này         |
|     |     |     | khỏi phép  | tính      | tỷ lệ   | chiếm   | dụng     | tổng  | hợp để   | tránh    | sai lệch. | Giao        |
|     |     |     | diện Quản  | trị hiển  | thị     | trạng   | thái     | này   | kèm cảnh | báo      | rõ ràng.  |             |
|     |     |     | E2 (Dữ     | liệu cảm  | biến    | lỗi     | thời):   | Nếu   | Parking  | Service  | phát      | hiện        |
|     |     |     | thời điểm  | cập nhật  | trạng   | thái    | của      | một   | chỗ đỗ   | vượt     | quá 5     | phút so     |
|     |     |     | với thời   | điểm hiện | tại,    | Parking | Service  |       | gắn nhãn | “dữ      | liệu      | có thể lỗi  |
|     |     |     | thời” trên | chỗ       | đỗ đó   | và cung | cấp      | thời  | điểm cập | nhật     | lần cuối  | để          |
|     |     |     | Admin      | tự đánh   | giá độ  | tin     | cậy.     |       |          |          |           |             |
|     |     |     |            |           |         |         |          |       |          |          |           | Trang 59/87 |

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 32: Sequence Diagram — UC5.6: Giám sát tình trạng bãi đỗ xe
Trang 60/87

| Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| ---------- | -------- | -------- | ----------- |
| Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
Hình 33: Activity Diagram — UC5.6: Giám sát tình trạng bãi đỗ xe
Trang 61/87

|     | Trường | Đại học  | Bách Khoa   | Tp. Hồ Chí | Minh     |
| --- | ------ | -------- | ----------- | ---------- | -------- |
|     | Khoa   | Khoa học | và Kỹ thuật | Máy tính   |          |
| 4.6 | Một    | số state | chart cho   | toàn       | hệ thống |
(a) State Chart — Phiên đăng ký biển số (b) State Chart — Phiên gửi xe
|     |     |     | Hình 34: | Các State Chart | trong hệ thống |
| --- | --- | --- | -------- | --------------- | -------------- |
Hệ thống quản lý bãi xe thông minh được thiết kế dựa trên hai biểu đồ trạng thái chính,
phân chia rõ ràng giữa khâu quản lý dữ liệu và khâu vận hành thực tế. Biểu đồ đầu tiên thể
hiện quy trình quản lý vòng đời của một biển số xe trong hệ thống, bao quát các bước từ lúc
người dùng nộp yêu cầu đăng ký, chờ quản trị viên xét duyệt để kích hoạt, cho đến các trạng
thái phát sinh trong quá trình sử dụng như tạm khóa do vi phạm hoặc nợ phí, và cuối cùng là
hủy bỏ dịch vụ. Song song đó, biểu đồ thứ hai tập trung vào luồng hoạt động cụ thể của một
lượt gửi xe. Quy trình này mô tả chi tiết trình tự các sự kiện diễn ra từ thời điểm khách hàng
quẹt thẻ vào cổng, hệ thống nhận diện xe thông qua cảm biến tại vị trí đỗ, cho đến lúc khách
| quẹt | thẻ ra | và hoàn | tất thủ tục thanh | toán để | rời bãi. |
| ---- | ------ | ------- | ----------------- | ------- | -------- |
Trang 62/87

|       | Trường      | Đại học  | Bách Khoa        | Tp. Hồ   | Chí Minh |      |
| ----- | ----------- | -------- | ---------------- | -------- | -------- | ---- |
|       | Khoa        | Khoa học | và Kỹ thuật      | Máy tính |          |      |
| 4.7   | Development |          | / Implementation |          |          | View |
| 4.7.1 | Component   |          | Diagram          |          |          |      |
Hệthốngđượcthiếtkếtheokiếntrúchướngdịchvụ,đảmbảotínhđónggói(Encapsulation)
| thông | qua | các giao diện | (Interfaces) | rõ ràng. |      |         |
| ----- | --- | ------------- | ------------ | -------- | ---- | ------- |
| 4.8   | Cấu | trúc mã       | nguồn        | và Tổ    | chức | Package |
Để đảm bảo tính bảo trì và tốc độ triển khai cho phiên bản MVP, mã nguồn được tổ chức theo
kiến trúc monolith module-based thay vì Microservices đầy đủ. Cách tiếp cận này vẫn giữ
ranh giới rõ giữa logic nghiệp vụ, giao tiếp dữ liệu và cấu hình hạ tầng, nhưng giảm đáng kể
chi phí tích hợp và vận hành trong bối cảnh demo 1 ngày.
| ----- | ------- | ------------ | ---- | ------- | ---- | ---------- |
| 4.8.1 | Cấu     | trúc Backend | Core | (Node.js | / Express) |     |
Mã nguồn Backend được phân chia thành các module chức năng trong cùng một ứng dụng Express,
giúp giảm thiểu sự phụ thuộc lẫn nhau nhưng vẫn đủ đơn giản để triển khai MVP:
| --- | --------- | -------- | --------------- | --- | --- | --- |
•
com.iot_spms.config: Đóng vai trò là trung tâm cấu hình của hệ thống, quản lý chế độ demo,
đường dẫn thư mục dữ liệu JSON và danh sách endpoint mock được phép sử dụng trong môi
trường MVP.
| --- | ------ | ------------- | --- | --- | --- | --- |
•
com.iot_spms.modules.auth: Chịu trách nhiệm thực hiện quy trình định danh demo; sử dụng
MockSSOConnector và MockDataCoreConnector để đọc tài khoản, mật khẩu và role từ dữ liệu
JSON đã seed sẵn.
| --- | --- | ------- | --- | --- | --- | --- |
• com.iot_spms.modules.parking: Chứa logic nghiệp vụ cốt lõi về quản lý phiên gửi xe,
|     | điều | phối trạng | thái vị trí đỗ | và xử | lý dữ liệu | từ cảm biến. |
| --- | ---- | ---------- | -------------- | ----- | ---------- | ------------ |
•
com.iot_spms.modules.payment: Chuyên biệt cho việc tính toán hóa đơn dựa trên chính
sách giá và mô phỏng BKPay bằng endpoint mock. Module này cập nhật trạng thái giao dịch
trong JSON, không gọi cổng thanh toán thật.
Trang 63/87

|     | Trường | Đại  | học Bách | Khoa Tp. | Hồ Chí Minh |
| --- | ------ | ---- | -------- | -------- | ----------- |
|     | Khoa   | Khoa | học và   | Kỹ thuật | Máy tính    |
• com.iot_spms.modules.iot: Lớp xử lý trung gian cho trạng thái bãi xe giả lập, cập nhật
parkingSpots.json và iotDevices.json thông qua các trigger demo như cảm biến có xe, trống
xe, DATAERROR hoặc DATADELAY.
| --- | ------ | --- | ------- | --- | --- |
• com.iot_spms.shared: Thư viện dùng chung chứa các đối tượng chuyển đổi dữ liệu
(DTOs), các lớp Exception tùy chỉnh và các hàm tiện ích (Utilities) được sử dụng xuyên
|       | suốt | các module. |          |         |     |
| ----- | ---- | ----------- | -------- | ------- | --- |
| 4.8.2 | Cấu  | trúc        | Frontend | (React) |     |
Phần giao diện được tổ chức theo kiến trúc Component-based hiện đại, giúp tối ưu hóa việc
| tái | sử dụng | mã nguồn: |     |     |     |
| --- | ------- | --------- | --- | --- | --- |
•
/src/components: Chứa các UI components như các bảng điều khiển và thành phần điều
hướng.
•
/src/pages: Tổ chức theo các luồng nghiệp vụ chính của người dùng như Dashboard quản
|     | lý, lịch | sử giao | dịch | và Trang cá | nhân. |
| --- | -------- | ------- | ---- | ----------- | ----- |
• /src/services: Lớp trừu tượng hóa các lệnh gọi API (thông qua Axios), giúp tách biệt
|     | logic | xử lý | giao diện | với logic | giao tiếp mạng. |
| --- | ----- | ----- | --------- | --------- | --------------- |
• /src/store: Trung tâm quản lý trạng thái toàn cục, đảm bảo dữ liệu (như trạng thái bãi
|       | đỗ)  | luôn nhất | quán      | trên mọi màn | hình.        |
| ----- | ---- | --------- | --------- | ------------ | ------------ |
| 4.8.3 | Quản | lý        | phụ thuộc | và Thư       | viện sử dụng |
.
Trang 64/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
Thành phần Thư viện chính Vai trò trong kiến trúc
Backend Core Node.js + Express Triển khai REST API và các module nghiệp vụ trong một
backend monolith, đủ đơn giản cho MVP 1 ngày.
Auth Mock JSON Account Xác thực tài khoản demo và phân quyền CUSTOMER,
EMPLOYEE, ADMIN dựa trên dữ liệu accounts.json.
File-based Storage JSON + File I/O Lưu trữ dữ liệu MVP trong các file JSON theo
thực thể, giảm chi phí cài đặt hệ quản trị cơ sở dữ liệu.
IoT Mock API Mô phỏng cảm biến, cổng vào ra, RFID và camera bằng endpoint demo
và trạng thái lưu trong parkingSpots.json, iotDevices.json.
Frontend Fetch/Axios Xử lý các yêu cầu HTTP tới backend API; không truy cập trực tiếp
file JSON từ phía giao diện.
Tailwind CSS Framework CSS giúp dựng nhanh dashboard và control panel cho demo.
Report Export CSV Generator Chuyển đổi nhật ký và báo cáo vận hành sang định
dạng CSV để Admin tải về khi cần.
Bảng 6: Bảng tổng hợp các thư viện và công nghệ then chốt trong hệ thống IoT-SPMS MVP.
4.9 Deployment View
4.10 Deployment View
4.10.1 Mô tả các thực thể và Các thành phần
• Nhóm Thiết bị người dùng cuối:
– User Device (Mobile/PC): Thiết bị của người học, cán bộ hoặc khách vãng lai.
Chạy trình duyệt web để tải thành phần Frontend Application (ReactJS). Giao tiếp
với hệ thống qua giao thức HTTPS.
– Dev Control Panel: Màn hình demo dùng để giả lập bảng LED, cảm biến, cổng vào ra,
RFID và camera. Trạng thái được cập nhật qua REST API và lưu trong file JSON.
• Nhóm Thiết bị IoT & Phần cứng bãi xe giả lập:
– Mock IoT Sensor Node: Cảm biến giả lập tại từng vị trí đỗ xe, nhận lệnh trigger từ Dev
Control Panel để chuyển trạng thái có xe, trống xe hoặc lỗi dữ liệu.
Trang 65/87

|     | Trường |     | Đại học  | Bách | Khoa     | Tp. Hồ | Chí  | Minh |     |     |
| --- | ------ | --- | -------- | ---- | -------- | ------ | ---- | ---- | --- | --- |
|     | Khoa   |     | Khoa học | và   | Kỹ thuật | Máy    | tính |      |     |     |
– Mock IoT Gateway: Thành phần logic trong backend gom các sự kiện cảm biến giả lập và
cập nhật trạng thái vào file iotDevices.json, không dùng MQTT broker thật.
| --- | --- | ---- | --------- | --- | ----- | --------- | --- | --------- | ----- | --- |
– Mock Smart Gate: Endpoint demo mô phỏng RFID, camera biển số và máy phát vé tạm.
Backend xử lý gate-in, gate-out và ghi phiên gửi xe vào parkingSessions.json.
| --- | --- | --- | -------- | --- | ------- | ---- | -------- | ----- | ----------- | ---- |
•
• Nhóm Máy chủ trung tâm MVP:
– Backend App Server (Node.js + Express): Điểm xử lý duy nhất cho toàn bộ REST API,
gồm module auth, parking, iot, payment, admin và mock harness.
– Frontend App (React): Giao diện theo role CUSTOMER, EMPLOYEE, ADMIN và Dev Control Panel.
– File Storage Layer: Thành phần lưu trữ dữ liệu chính thức cho phiên bản MVP,
sử dụng các file JSON theo từng thực thể như tài khoản, phiên gửi xe, giao dịch,
hóa đơn, vị trí đỗ và thiết bị IoT. Cách tiếp cận này giúp giảm thời gian cài đặt,
phù hợp với mục tiêu demo trong thời gian ngắn.
|     | • Nhóm |     | Hệ thống | Ngoại | vi: |     |     |     |     |     |
| --- | ------ | --- | -------- | ----- | --- | --- | --- | --- | --- | --- |
– Mock HCMUT_SSO: Adapter mô phỏng xác thực tài khoản demo từ accounts.json.
– Mock HCMUT_DATACORE: Adapter mô phỏng đồng bộ role CUSTOMER, EMPLOYEE và ADMIN từ dữ liệu seed.
– Mock BKPay Gateway: Endpoint mô phỏng kết quả thanh toán để cập nhật transactions.json và invoices.json.
| ------ | --- | ----- | ---------- | ---- | ------------------- | --- | --- | ---------- | --- | --- |
| 4.10.2 |     | Giao  | thức       | giao | tiếp (Communication |     |     | Protocols) |     |     |
• HTTPS/RESTful API: Giao tiếp giữa Frontend, Dev Control Panel và Backend App Server.
Các hệ thống ngoại vi trong MVP được mô phỏng bằng mock adapter nội bộ, không gọi dịch vụ thật.
• Mock event API: Giao tiếp nội bộ để mô phỏng cảm biến, RFID, camera và BKPay trong
môi trường demo. Các event này được ghi vào JSON và hiển thị lại trên dashboard.
•
Polling hoặc refresh sau thao tác: Frontend cập nhật trạng thái bãi xe bằng cách gọi lại API
sau mỗi lệnh demo hoặc theo chu kỳ ngắn. Cách này đơn giản hơn WebSocket và đủ cho MVP.
• File I/O nội bộ: Backend Services thao tác đọc/ghi trực tiếp với lớp lưu trữ file JSON
thông qua API của hệ điều hành. CSV chỉ dùng cho nhu cầu xuất báo cáo.
• Bộ dữ liệu seed MVP: Thư mục dữ liệu phải có sẵn accounts.json, vehicles.json,
rfidCards.json, parkingSpots.json, iotDevices.json, parkingSessions.json, transactions.json,
invoices.json, logs.json và pricingPolicy.json. Các file này phải đủ dữ liệu cho luồng thành
viên, khách vãng lai, thanh toán BKPay mock, lỗi cảm biến và dashboard Admin mà không
phụ thuộc hệ thống ngoài.
Trang 66/87

|     | Trường | Đại học  | Bách Khoa Tp.  | Hồ Chí Minh |              |          |
| --- | ------ | -------- | -------------- | ----------- | ------------ | -------- |
|     | Khoa   | Khoa học | và Kỹ thuật    | Máy tính    |              |          |
|     |        | Hình     | 35: Deployment | Diagram     | của hệ thống | IoT-SPMS |
| 5   | UI     | design   |                |             |              |          |
| 5.1 | Giao   | diện bắt | đầu            |             |              |          |
(a) Giao diện đăng nhập đầu tiên (b) Giao diện đăng nhập thứ hai
|     |     |     | Hình 36: | Ảnh chụp màn | hình đăng | nhập |
| --- | --- | --- | -------- | ------------ | --------- | ---- |
Giao diện đăng nhập đóng vai trò là điểm chạm đầu tiên và là cửa ngõ tiếp cận toàn bộ hệ
thống. Tại đây, mọi người dùng đều phải thực hiện bước xác thực danh tính bằng cách cung
cấp các thông tin cơ bản bao gồm tên tài khoản và mật khẩu. Quá trình này đảm bảo tính bảo
mật, đồng thời cấp quyền để người dùng có thể truy cập và sử dụng đầy đủ các tính năng mà
| ứng | dụng web | cung cấp. |     |     |     |     |
| --- | -------- | --------- | --- | --- | --- | --- |
Trang 67/87

| Trường | Đại học Bách | Khoa Tp. | Hồ Chí Minh         |         |     |
| ------ | ------------ | -------- | ------------------- | ------- | --- |
| Khoa   | Khoa học và  | Kỹ thuật | Máy tính            |         |     |
|        |              | Hình     | 37: Giao diện trang | chủ web |     |
Sau khi hoàn tất quá trình xác thực thành công, hệ thống sẽ tự động điều hướng người
dùng đến Trang chủ. Đây được xem là không gian làm việc trung tâm và là điểm kết nối mọi
| hoạt động | trên nền tảng. |         |       |     |     |
| --------- | -------------- | ------- | ----- | --- | --- |
| 5.2 Giao  | diện đăng      | ký biển | số xe |     |     |
(a) Giao diện nhập thông tin đăng ký biến số (b) Giao diện chờ xét duyệt biển số
(c) Giao diện đăng ký thành công (d) Giao diện đăng ký thất bại
|     | Hình 38: | Tổng hợp | giao diện cho các | bước đăng ký biển | số xe |
| --- | -------- | -------- | ----------------- | ----------------- | ----- |
Để có thể tiếp cận và sử dụng trọn vẹn các dịch vụ tiện ích mà hệ thống cung cấp, điều
quan trọng nhất là người dùng phải thực hiện đăng ký phương tiện cá nhân. Phần trên đây sẽ
Trang 68/87

|     | Trường Đại | học Bách | Khoa Tp. | Hồ Chí Minh |
| --- | ---------- | -------- | -------- | ----------- |
|     | Khoa Khoa  | học và   | Kỹ thuật | Máy tính    |
trình bày chi tiết các màn hình sẽ xuất hiện trong quy trình khai báo và đăng ký biển số xe
| vào cơ | sở dữ liệu | của trang | web. |     |
| ------ | ---------- | --------- | ---- | --- |
Hình 39: Giao diện xét duyệt đăng ký biển số bên phía nhân viên
Ngay sau khi người dùng hoàn tất thủ tục gửi yêu cầu đăng ký, dữ liệu sẽ được hệ thống
tiếp nhận và chuyển giao sang phân hệ quản trị. Tại đây, đội ngũ nhân viên sẽ được cung cấp
một giao diện màn hình chuyên biệt để tiến hành quy trình kiểm tra, xác minh và xét duyệt
| tính hợp | lệ của | hồ sơ phương | tiện. |     |
| -------- | ------ | ------------ | ----- | --- |
Trang 69/87

| Trường  | Đại học   | Bách Khoa   | Tp. Hồ Chí | Minh     |            |
| ------- | --------- | ----------- | ---------- | -------- | ---------- |
| Khoa    | Khoa học  | và Kỹ thuật | Máy tính   |          |            |
| 5.3 Các | giao diện | cho các     | tiện ích   | khác của | người dùng |
(a) Giao diện đăng ký gói tháng (b) Giao diện thực hiện thanh toán hóa đơn
(c) Giao diện hiện thị trạng thái bãi xe (d) Giao diện lịch sử giao dịch cá nhân
Hình 40: Tổng hợp các giao diện cho các tiện ích khác của người dùng
Tại nhóm giao diện này, hệ thống cung cấp các chức năng cốt lõi giúp người dùng chủ động
quản lý dịch vụ và các tiện ích bãi đỗ. Cụ thể, người dùng được cấp quyền để thực hiện các
| thao tác nghiệp | vụ sau:     |     |     |     |     |
| --------------- | ----------- | --- | --- | --- | --- |
| • Đăng          | ký gói dịch | vụ  |     |     |     |
•
| Thanh | toán hóa đơn  |     |     |     |     |
| ----- | ------------- | --- | --- | --- | --- |
| • Tra | cứu vị trí đỗ | xe  |     |     |     |
•
| Xem | lịch sử giao | dịch của bản | thân |     |     |
| --- | ------------ | ------------ | ---- | --- | --- |
Trang 70/87

|     | Trường | Đại  | học  | Bách | Khoa Tp.  | Hồ  | Chí Minh |     |     |     |     |
| --- | ------ | ---- | ---- | ---- | --------- | --- | -------- | --- | --- | --- | --- |
|     | Khoa   | Khoa | học  | và   | Kỹ thuật  | Máy | tính     |     |     |     |     |
| 5.4 | Các    | giao | diện |      | cho Admin |     |          |     |     |     |     |
(a) Giao diện quản lý các tài (b) Giao diện nới Admin thay (c) Giao diện thông tin nhật
| khoản | nhân | viên |     |     | đổi | phí gửi | xe  |     | ký hệ thống   |          |     |
| ----- | ---- | ---- | --- | --- | --- | ------- | --- | --- | ------------- | -------- | --- |
|       |      |      |     |     |     |         |     |     | (f) Giao diện | cảnh báo | khi |
(d) Giao diện Admin xuất ra (e) Giao diện thông báo khi Adminchưaxácnhậncácthiết
| các | báo cáo | cần | thiết |          | thiết   | bị IoT | gặp sự cố    |      | bị IoT lỗi     |     |     |
| --- | ------- | --- | ----- | -------- | ------- | ------ | ------------ | ---- | -------------- | --- | --- |
|     |         |     | Hình  | 41: Tổng | hợp các | giao   | diện cho các | chức | năng của Admin |     |     |
Nhóm giao diện dành riêng cho Quản trị viên (Admin) được thiết kế với tiêu chí trực quan,
hiện đại và tối ưu hóa trải nghiệm người dùng. Thông qua hệ thống chức năng toàn diện này,
Admin có thể dễ dàng thực hiện và kiểm soát mọi hoạt động cốt lõi, từ việc quản lý tài khoản
nhân viên, điều chỉnh linh hoạt các chính sách về giá phí, cho đến việc trích xuất báo cáo và
theo dõi nhật ký hoạt động chi tiết. Đặc biệt, phân hệ giám sát thiết bị IoT tích hợp cơ chế
cảnh báo thời gian thực và nhắc nhở tự động không chỉ giúp Admin nắm bắt ngay lập tức các
sự cố phát sinh, mà còn ngăn ngừa rủi ro do sơ suất trong quá trình xử lý, đảm bảo toàn bộ
quy trình vận hành luôn diễn ra an toàn, minh bạch và đạt hiệu suất cao nhất.
| 6   | Các | non-interactive |     |     |     | functional |     | requirement |     |     |     |
| --- | --- | --------------- | --- | --- | --- | ---------- | --- | ----------- | --- | --- | --- |
•
Hệ thống sẽ làm nổi bật những khu vực có nhiều vị trí trống lên màn hình
•
|     | Tự  | tạo hóa | đơn | định | kỳ: |     |     |     |     |     |     |
| --- | --- | ------- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
– Tổng hợp phí gửi xe cuối mỗi chu kỳ (cuối tháng): đăng ký gói tháng hoặc ghi nợ.
|     |      | – Tạo     | hóa đơn | cho   | từng người | dùng. |               |     |     |       |       |
| --- | ---- | --------- | ------- | ----- | ---------- | ----- | ------------- | --- | --- | ----- | ----- |
|     |      | – Lưu     | hóa đơn | vào   | cơ sở dữ   | liệu  | của hệ thống. |     |     |       |       |
|     | • Tự | tạo thông | báo     | thanh | toán:      |       |               |     |     |       |       |
|     |      |           |         |       |            |       |               |     |     | Trang | 71/87 |

|     | Trường |       | Đại            | học Bách | Khoa      | Tp. | Hồ          | Chí Minh            |      |
| --- | ------ | ----- | -------------- | -------- | --------- | --- | ----------- | ------------------- | ---- |
|     | Khoa   |       | Khoa           | học và   | Kỹ thuật  |     | Máy tính    |                     |      |
|     |        | – Gửi | thông          | báo      | khi tạo   | hóa | đơn         |                     |      |
|     |        | – Gửi | thông          | báo      | khi thanh |     | toán thành  | công / thất         | bại  |
|     |        | – Gửi | nhắc           | nhở      | khi sắp   | hết | hoặc        | quá thời gian thanh | toán |
| 7   | Các    |       | non-functional |          |           |     | requirement |                     |      |
•
NFR1 - Cập nhật trạng thái thời gian thực (Performance): Hệ thống phải cập
nhật trạng thái chỗ đỗ xe từ sensor lên giao diện người dùng trong thời gian không quá
|     | 5   | giây | kể từ | khi sensor | phát | hiện | thay | đổi. |     |
| --- | --- | ---- | ----- | ---------- | ---- | ---- | ---- | ---- | --- |
– Metric: Độ trễ trung bình từ sensor → hiển thị ≤ 5 giây; độ trễ tối đa ≤ 10 giây.
• NFR2 - Khả năng chịu tải đồng thời (Scalability): Hệ thống phải hoạt động ổn
định trong giờ cao điểm khi lượng người dùng tăng đột biến (gần đầu giờ học, ngay lúc
tan học). Hệ thống phải hỗ trợ tối thiểu 500 người dùng đồng thời mà không suy giảm
|     | hiệu | năng | quá | ngưỡng | cho | phép. |     |     |     |
| --- | ---- | ---- | --- | ------ | --- | ----- | --- | --- | --- |
– Metric: Thời gian phản hồi trung bình ≤ 3 giây khi có 500 người dùng đồng thời, tỷ
|     |     | lệ  | lỗi < | 1%. |     |     |     |     |     |
| --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- |
• NFR3 - Tính sẵn sàng (Availability): Hệ thống phải duy trì hoạt động liên tục để
|     | đảm | bảo | kiểm | soát | ra vào | bãi | xe không | bị gián đoạn. |     |
| --- | --- | --- | ---- | ---- | ------ | --- | -------- | ------------- | --- |
– Metric: Uptime tối thiểu 99.5% theo tháng, tương đương thời gian ngừng hoạt động
|     |     | không | quá | 3.6 | giờ/tháng. |     |     |     |     |
| --- | --- | ----- | --- | --- | ---------- | --- | --- | --- | --- |
• NFR4 - Tương thích đa thiết bị (Usability): Giao diện hệ thống phải hiển thị và
hoạt động chính xác trên cả thiết bị di động và máy tính để bàn, đảm bảo trải nghiệm
|     | người | dùng | nhất | quán. |     |     |     |     |     |
| --- | ----- | ---- | ---- | ----- | --- | --- | --- | --- | --- |
– Metric: Giao diện hỗ trợ responsive từ độ phân giải 360px (mobile) đến 1920px
(desktop), các chức năng cốt lõi phải sử dụng được đầy đủ trên cả hai loại thiết bị.
• NFR5 - Hỗ trợ đa ngôn ngữ (Usability): Hệ thống phải hỗ trợ tiếng Việt và tiếng
Anh để phục vụ cả người dùng trong nước và sinh viên/giảng viên quốc tế.
– Metric: 100% nội dung giao diện người dùng (label, thông báo, hướng dẫn) phải có
bản dịch đầy đủ cho cả hai ngôn ngữ. Người dùng có thể chuyển đổi ngôn ngữ mà
|     |     | không | cần | đăng | nhập | lại. |     |     |     |
| --- | --- | ----- | --- | ---- | ---- | ---- | --- | --- | --- |
•
NFR6 - Khả năng chịu lỗi (Fault Tolerance): Hệ thống phải có cơ chế dự phòng
để duy trì hoạt động cơ bản hoặc bảo toàn dữ liệu khi một thành phần (sensor, gateway
|     | hoặc | kết | nối | mạng) | gặp | sự cố. |     |     |     |
| --- | ---- | --- | --- | ----- | --- | ------ | --- | --- | --- |
Trang 72/87

|     | Trường |     | Đại  | học Bách | Khoa Tp. | Hồ  | Chí Minh |     |     |
| --- | ------ | --- | ---- | -------- | -------- | --- | -------- | --- | --- |
|     | Khoa   |     | Khoa | học và   | Kỹ thuật | Máy | tính     |     |     |
– Metric: Khi mất kết nối Internet, Gateway phải có khả năng lưu trữ tạm thời (local
buffering) ít nhất 24 giờ dữ liệu và tự động đồng bộ lại khi có kết nối. Thời gian
|     |      | phục | hồi         | hệ thống | sau sự    | cố (MTTR) |     | không   | quá 30 phút. |
| --- | ---- | ---- | ----------- | -------- | --------- | --------- | --- | ------- | ------------ |
| 8   | Danh |      | sách        | các      | Method    |           | và  | Class   | Diagram      |
|     |      |      |             | Hình     | 42: Class | diagram   | cho | toàn    | bộ hệ thống  |
| 8.1 |      | Các  | Enumeration |          | trong     | Class     |     | Diagram |              |
Trong thiết kế của hệ thống, các kiểu dữ liệu liệt kê (Enumeration) được sử dụng để định
nghĩa một tập hợp các hằng số cố định, giúp quản lý trạng thái, loại đối tượng và quyền hạn
một cách rõ ràng, chuẩn hóa và tránh sai sót trong quá trình lập trình. Dựa vào Biểu đồ lớp
| (Class |     | Diagram), | hệ  | thống | bao gồm | các Enumeration |     | sau: |     |
| ------ | --- | --------- | --- | ----- | ------- | --------------- | --- | ---- | --- |
• Role (hoặc RoleEnum): Định nghĩa vai trò và quyền hạn của các tài khoản (Account)
|     | trong | hệ  | thống, | bao | gồm 3 mức: |     |     |     |     |
| --- | ----- | --- | ------ | --- | ---------- | --- | --- | --- | --- |
– CUSTOMER: Khách hàng (bao gồm khách vãn lai và thành viên).
Trang 73/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
– EMPLOYEE: Nhân viên vận hành bãi xe.
– ADMIN: Quản trị viên hệ thống.
• IoTDevice_Status: Định nghĩa các trạng thái hoạt động của các thiết bị cảm biến
(IoTDevice) tại bãi xe:
– ACTIVE: Thiết bị đang hoạt động bình thường.
– DATAERROR: Thiết bị gặp lỗi dữ liệu.
– DATADELAY: Thiết bị có dấu hiệu gửi dữ liệu bị trễ.
• ParkingSpot_Status: Thể hiện tình trạng hiện tại của từng vị trí đỗ xe (ParkingSpot):
– Available: Vị trí đang trống, sẵn sàng để đỗ xe.
– Occupied: Vị trí đã có xe chiếm dụng.
– Maintenance: Vị trí đang trong quá trình bảo trì, không thể sử dụng.
• Payment_Status: Quản lý trạng thái thanh toán của các giao dịch (Transaction) hoặc
hóa đơn (Invoice):
– Paid: Đã thanh toán thành công.
– Unpaid: Chưa thanh toán.
– Overdue: Quá hạn thanh toán.
• Registration_Status: Trạng thái của các yêu cầu đăng ký phương tiện (Vehicle) từ
phía khách hàng thành viên:
– PENDING: Đang chờ nhân viên/hệ thống phê duyệt.
– APPROVED: Đã được chấp thuận.
– REJECTED: Bị từ chối đăng ký.
• Ticket_Status: Thể hiện trạng thái hiệu lực của vé tháng (MonthlyTicket):
– VALID: Vé đang còn hiệu lực sử dụng.
– EXPIRED: Vé đã hết hạn.
• CardType: Phân loại các thẻ RFID (RFIDCard) được sử dụng để ra/vào bãi xe:
– REGISTERED: Thẻ đã được đăng ký, cấp cho khách hàng thành viên (sinh viên,
cán bộ).
– TEMPORARY: Thẻ tạm thời, cấp cho khách vãn lai khi vào bãi và thu hồi lại khi
ra.
Trang 74/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
8.2 Các Class trong Class Diagram
8.2.1 Lớp thực thể: Account (Tài khoản)
Lớp này lưu trữ thông tin định danh và trạng thái của người dùng được đồng bộ từ hệ
thống nhà trường.
• Thuộc tính:
– accountID: Mã định danh duy nhất của tài khoản (String).
– username: Tên đăng nhập của người dùng (String).
– password: Mật khẩu của tài khoản người dùng (String).
– fullName: Họ và tên đầy đủ của người dùng (String)
– role: Vai trò của người dùng (CUSTOMER, ADMIN, EMPLOYEE) để phân quyền
và áp dụng chính sách giá.
– status: Trạng thái tài khoản (ACTIVE, DISABLED).
• Phương thức:
– updateStatus(newStatus): Cập nhật trạng thái mới cho tài khoản (ví dụ: khóa do
nợ phí).
– isLocked(): boolean (Class Account)
∗ Mục đích: Kiểm tra trạng thái hoạt động của tài khoản khách hàng (xem có
đang bị khóa hay không).
∗ Mô tả logic: Phương thức này truy xuất giá trị của thuộc tính isLocked trong
hệ thống lưu trữ dữ liệu của người dùng. Hệ thống sẽ gọi hàm này ở các bước kiểm tra
điều kiện (Ví dụ: trước khi cho phép xe vào bãi, hoặc ngay khi khách hàng đăng
nhập) để xem tài khoản có đang bị khóa do nợ quá hạn hay không.
8.2.2 Lớp thực thể: UserSession (Phiên làm việc)
Quản lý trạng thái và thời gian duy trì đăng nhập của người dùng sau khi xác thực thành
công.
• Thuộc tính:
– sessionID: Mã phiên làm việc duy nhất để bảo mật (String).
– loginTime: Thời điểm bắt đầu đăng nhập (Time).
– expiryTime: Thời điểm phiên làm việc hết hạn (Time).
– isActive: Trạng thái hoạt động của phiên (Boolean).
Trang 75/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
• Phương thức:
– isValid(): Kiểm tra phiên làm việc hiện tại còn hiệu lực hay không.
– extendSession(): void: Gia hạn thời gian hoạt động của phiên làm việc.
8.2.3 Lớp điều khiển: AuthenticationController
Đóng vai trò điều phối luồng đăng nhập, xử lý logic xác thực và quản lý vòng đời của
session.
• Phương thức:
– processLogin(username, password): Tiếp nhận thông tin, gọi các dịch vụ xác thực
và khởi tạo phiên làm việc.
– handleAuthError(): Xử lý các tình huống lỗi đăng nhập (sai mật khẩu, lỗi kết nối
hệ thống ngoài).
– processLogout(sessionID): Thực hiện quy trình hủy phiên làm việc khi người dùng
đăng xuất.
8.2.4 Lớp biên: MockSSOConnector và MockDataCoreConnector
Các lớp giao tiếp giả lập với hạ tầng công nghệ hiện có của HCMUT trong môi trường MVP demo.
• MockSSOConnector:
– authenticateUser(user, pass): Đối chiếu tài khoản và mật khẩu trong dữ liệu JSON seed,
trả về kết quả xác thực thành công hoặc lỗi.
• MockDataCoreConnector:
– fetchUserRole(accountID): Truy vấn vai trò người dùng từ dữ liệu JSON ở chế độ chỉ đọc
để đồng bộ role.
8.2.5 Lớp thực thể: ParkingSession (Phiên gửi xe)
Lớp này lưu trữ thông tin chi tiết về một phiên gửi xe (từ lúc vào đến lúc ra) của khách
hàng.
• Thuộc tính:
– sessionID: Mã định danh duy nhất của phiên gửi xe (String).
– customerID: Mã khách hàng liên kết với phiên gửi (String).
– vehicleID: Mã phương tiện liên kết với phiên gửi (String).
Trang 76/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
– licensePlate: Biển số xe dùng để đối soát (String).
– rfidCardID: Mã thẻ từ được sử dụng (String).
– spotID: Mã vị trí đỗ xe (String).
– checkInTime: Thời điểm phương tiện vào bãi (DateTime).
– checkOutTime: Thời điểm phương tiện ra khỏi bãi (DateTime).
– fee: Tổng số tiền phí gửi xe của phiên (Double).
– isGuestSession: Trạng thái xác định đây là phiên của khách vãng lai (Boolean).
• Phương thức:
– verifyMember(rfid, licensePlate): Xác thực quyền ra/vào tự động cho thẻ hoặc biển
số của khách thành viên.
– processAutoCheckIn(vehicleId): Xử lý logic tạo phiên gửi xe tự động khi hệ thống
nhận diện xe vào cổng.
– processAutoCheckOut(vehicleId): Xử lý logic đóng phiên gửi xe tự động khi xe ra
khỏi bãi.
– calculateFee(): double (Class ParkingSession)
∗ Mục đích: Tính toán chính xác số tiền phí mà khách hàng phải trả cho một
phiên gửi xe.
∗ Mô tả logic: Tính toán số tiền (dưới dạng số thực double) dựa trên sự chênh
lệch giữa checkInTime và checkOutTime, đối chiếu với PricingPolicy (bảng giá).
8.2.6 Lớp thực thể: ParkingSpot (Vị trí đỗ xe)
Lớp đại diện cho một ô đỗ xe vật lý trong bãi.
• Thuộc tính:
– spotID: Mã định danh duy nhất của ô đỗ xe (String).
– status:Trạngtháihiệntạicủaôđỗ(EnumParkingSpot_Status:Available,Occupied,
Maintenance).
– lastUpdate: Thời điểm cập nhật trạng thái gần nhất (String).
• Phương thức:
– updateStatus(): Cập nhật trạng thái ô đỗ thành có xe hoặc trống dựa trên tín hiệu
từ cảm biến.
– checkAvailability(): Kiểm tra trạng thái hiện tại xem ô đỗ có sẵn sàng tiếp nhận xe
hay không.
Trang 77/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
8.2.7 Lớp thực thể: Vehicle (Phương tiện)
Lưu trữ thông tin về phương tiện đã được đăng ký trên hệ thống.
• Thuộc tính:
– vehicleID: Mã định danh của phương tiện (String).
– customerID: Mã khách hàng sở hữu phương tiện (String).
– licensePlate: Biển số xe thực tế (String).
8.2.8 Lớp thực thể: RFIDCard (Thẻ từ)
Quản lý danh sách thẻ từ dùng để quét ra/vào cổng.
• Thuộc tính:
– cardID: Mã định danh vật lý của thẻ (String).
– type: Loại thẻ định danh (Enum CardType).
– isAssigned: Trạng thái xác định thẻ đã được cấp cho ai hay chưa (Boolean).
8.2.9 Lớp điều khiển: Employee (Nhân viên vận hành)
Đại diện cho tác nhân nhân viên, xử lý các nghiệp vụ thủ công và quản lý phê duyệt.
• Thuộc tính:
– employeeID: Mã định danh của nhân viên (String).
• Phương thức:
– issueTemporaryCard(): Cấp thẻ tạm, tạo phiên gửi xe mới và mở barie cho khách
vãng lai.
– confirmManualCheckout(): Xác nhận thu hồi thẻ, kết thúc phiên gửi xe và mở cổng
ra.
– receiveCash(): Cập nhật trạng thái đã nhận tiền mặt từ khách hàng.
– verifyRegistration(reg): Phê duyệt hoặc từ chối hồ sơ đăng ký xe của khách thành
viên.
Trang 78/87

|        | Trường | Đại học  | Bách   | Khoa          | Tp. Hồ Chí | Minh   |      |      |
| ------ | ------ | -------- | ------ | ------------- | ---------- | ------ | ---- | ---- |
|        | Khoa   | Khoa học | và     | Kỹ thuật      | Máy tính   |        |      |      |
| 8.2.10 | Lớp    | điều     | khiển: | GuestCustomer |            | (Khách | vãng | lai) |
Đại diện cho đối tượng khách không có tài khoản trên hệ thống.
|     | • Thuộc  | tính:         |      |       |          |           |           |     |
| --- | -------- | ------------- | ---- | ----- | -------- | --------- | --------- | --- |
|     | –        | licensePlate: | Biển | số xe | tạm thời | của khách | (String). |     |
|     | • Phương | thức:         |      |       |          |           |           |     |
– requestTemporaryCard(): Yêu cầu cấp thẻ tạm tại cổng khi vào bãi.
– returnTemporaryCard(): Trả lại thẻ tạm tại cổng để thanh toán khi ra bãi.
– payCashToStaff(): Thực hiện thanh toán phí gửi xe bằng tiền mặt.
| 8.2.11 | Lớp | điều | khiển: | MemberCustomer |     | (Khách |     | thành viên) |
| ------ | --- | ---- | ------ | -------------- | --- | ------ | --- | ----------- |
Đại diện cho người dùng đã đăng ký tài khoản (Sinh viên, Cán bộ).
•
|     | Thuộc | tính:          |     |            |           |        |              |     |
| --- | ----- | -------------- | --- | ---------- | --------- | ------ | ------------ | --- |
|     | –     | walletBalance: |     | Số dư hiện | tại trong | ví nội | bộ (Double). |     |
•
|     | Phương | thức: |     |     |     |     |     |     |
| --- | ------ | ----- | --- | --- | --- | --- | --- | --- |
– submitRegistration(): Gửi yêu cầu đăng ký phương tiện mới lên hệ thống, trả về đối
|     |     | tượng phương | tiện | chờ | duyệt (Vehicle). |     |     |     |
| --- | --- | ------------ | ---- | --- | ---------------- | --- | --- | --- |
– createSubscription(month, String): Khởi tạo yêu cầu đăng ký hoặc gia hạn gói gửi
|     |     | xe theo tháng,            |     | trả về đơn | hàng thanh | toán   | (MonthlyTicket). |     |
| --- | --- | ------------------------- | --- | ---------- | ---------- | ------ | ---------------- | --- |
|     | –   | viewTransactionHistory(): |     |            | void       | (Class | MemberCustomer)  |     |
∗
Mục đích: Kích hoạt luồng xem lịch sử giao dịch cá nhân của khách hàng có tài
|     |     | khoản. | (UC | 3.1) |     |     |     |     |
| --- | --- | ------ | --- | ---- | --- | --- | --- | --- |
∗
Mô tả logic: Phương thức này truy xuất danh sách các đối tượng Transaction
liên kết với MemberCustomer hiện tại từ cơ sở dữ liệu. Sau khi lấy được dữ liệu,
nó điều khiển giao diện (View/UI) hiển thị danh sách này ra màn hình, bao gồm
các thông tin theo Use-case yêu cầu (Thời gian, Số tiền, Trạng thái thanh toán)
|     |     | và cho        | phép | người       | dùng thực       | hiện thao | tác | sắp xếp. |
| --- | --- | ------------- | ---- | ----------- | --------------- | --------- | --- | -------- |
|     | –   | payInvoice(): |      | void (Class | MemberCustomer) |           |     |          |
∗ Mục đích: Xử lý thao tác thanh toán một hóa đơn điện tử thông qua cổng thanh
|     |     | toán. | (UC 3.2) |     |     |     |     |     |
| --- | --- | ----- | -------- | --- | --- | --- | --- | --- |
∗
Mô tả logic: Phương thức này tiếp nhận lệnh “Chuyển đến BKPay” từ người
dùng và gọi đến API của cổng thanh toán BKPay. Nó chờ Webhook trả về và
|     |     | xử lý | kết quả. |     |     |     |     |     |
| --- | --- | ----- | -------- | --- | --- | --- | --- | --- |
Trang 79/87

Trường Đại học Bách Khoa Tp. Hồ Chí Minh
Khoa Khoa học và Kỹ thuật Máy tính
8.2.12 Lớp Invoice
Đại diện cho người dùng đã đăng ký tài khoản (Sinh viên, Cán bộ).
• Thuộc tính:
– invoiceID: string: Mã định danh duy nhất của hóa đơn.
– amount: double: Số tiền cước phí cần thanh toán.
– dueDate: string: Ngày đến hạn thanh toán hóa đơn.
– createdDate: string: Ngày giờ hệ thống khởi tạo hóa đơn.
• Phương thức:
– generateInvoice(): void (Class Invoice)
∗ Mục đích: Khởi tạo thông tin chi tiết cho một hóa đơn mới. (UC 3.2)
∗ Môtảlogic:Dựavàophígửixeđãđượctínhtoántừcácphiêngửixe(ParkingSession),
hàm này khởi tạo đối tượng Invoice, gán invoiceID, thiết lập số tiền amount,
ngày tạo createdDate, và đặc biệt là hạn thanh toán dueDate. Dữ liệu này là
tiền đề để hiển thị danh sách hóa đơn cho MemberCustomer thanh toán.
8.2.13 Lớp Transaction
Đại diện cho người dùng đã đăng ký tài khoản (Sinh viên, Cán bộ).
• Thuộc tính:
– transactionID: string: Mã định danh duy nhất của giao dịch.
– amount: double: Số tiền thực hiện trong giao dịch.
– timestamp: string: Thời gian (ngày và giờ) hệ thống ghi nhận giao dịch.
– paymentStatus: Payment_Status: Trạng thái thanh toán của giao dịch (sử dụng
Enumeration Payment_Status như Paid, Unpaid, Overdue).
– paymentMethod: string: Phương thức thanh toán được khách hàng sử dụng (ví dụ:
Tiền mặt, chuyển khoản qua BKPay).
• Phương thức:
– getDetail(): string
∗ Mục đích: Đóng gói và trả về chuỗi thông tin chi tiết của một giao dịch.
∗ Mô tả logic: Phương thức này định dạng các thuộc tính của Transaction thành
một chuỗi có cấu trúc dễ đọc. Chuỗi này được sử dụng để hiển thị trong danh
sách lịch sử giao dịch của khách hàng.
Trang 80/87

| Trường            | Đại học  | Bách Khoa   | Tp. Hồ   | Chí Minh |     |
| ----------------- | -------- | ----------- | -------- | -------- | --- |
| Khoa              | Khoa học | và Kỹ thuật | Máy tính |          |     |
| – updateStatus(): |          | void        |          |          |     |
∗
|     | Mục đích: | Thay | đổi trạng thái | thanh toán | của giao dịch. |
| --- | --------- | ---- | -------------- | ---------- | -------------- |
∗
Mô tả logic: Truy xuất các thuộc tính của lớp Transaction (như transactionID,
amount,timestamp,paymentStatus,paymentMethod)vàđịnhdạngchúngthành
|     | một chuỗi | (String) | hoặc chuỗi | JSON có | cấu trúc. |
| --- | --------- | -------- | ---------- | ------- | --------- |
·
Trong U3.2: Được gọi sau khi payInvoice() nhận kết quả trả về từ BKPay
để đổi trạng thái từ “Unpaid” sang “Paid” hoặc ”Overdue” nếu quá hạn.
·
Trong U3.3: Được gọi khi Nhân viên bấm "Xác nhận đã nhận tiền"để đổi
trạng thái giao dịch sang "Đã thanh toán"(Success) rồi lưu xuống cơ sở dữ
liệu.
| 8.2.14 Lớp | IoTDevice |     |     |     |     |
| ---------- | --------- | --- | --- | --- | --- |
•
Thuộc tính:
– sensorId: string: Mã định danh duy nhất của thiết bị cảm biến.
– slotId: string: Mã định danh của vị trí đỗ xe mà cảm biến này đang phụ trách giám
sát.
– status: IoTDevice_Status: Trạng thái hoạt động và kết nối hiện tại của thiết bị.
– lastPing: string: Mốc thời gian hệ thống nhận được tín hiệu phản hồi cuối cùng từ
| thiết | bị. |     |     |     |     |
| ----- | --- | --- | --- | --- | --- |
– batteryLevel: double: Mức dung lượng pin hiện tại của thiết bị phần cứng.
| • Phương           | thức: |      |     |     |     |
| ------------------ | ----- | ---- | --- | --- | --- |
| – detectVehicle(): |       | bool |     |     |     |
∗ Mục đích: Phát hiện sự hiện diện của phương tiện tại vị trí đỗ xe theo thời gian
thực.
∗
Mô tả logic: Thiết bị sử dụng cảm biến (siêu âm, hồng ngoại hoặc từ trường)
để quét không gian tại vị trí đỗ. Nếu có vật thể che chắn hoặc thỏa mãn điều
kiện về khoảng cách và thời gian duy trì, hệ thống vi điều khiển sẽ đánh giá là
có xe và trả về true. Ngược lại, nếu không có vật cản, phương thức trả về false.
| – sendStatus(): |     | void |     |     |     |
| --------------- | --- | ---- | --- | --- | --- |
∗ Mục đích: Duy trì tín hiệu Heartbeat để hệ thống trung tâm có thể giám sát
|     | tình trạng | sức khỏe | của thiết | bị. |     |
| --- | ---------- | -------- | --------- | --- | --- |
∗ Mô tả logic: Theo một chu kỳ thời gian cố định, thiết bị tự động đóng gói các
thông tin cơ bản bao gồm sensorId, status và batteryLevel. Gói tin này được
gửi đến máy chủ. Nếu máy chủ không nhận được gói tin này vượt quá thời gian
timeout cho phép, thiết bị sẽ bị đánh dấu là mất kết nối trên hệ thống.
Trang 81/87

|     | Trường | Đại học     | Bách Khoa   | Tp. Hồ Chí | Minh |     |
| --- | ------ | ----------- | ----------- | ---------- | ---- | --- |
|     | Khoa   | Khoa học    | và Kỹ thuật | Máy tính   |      |     |
|     | –      | sendData(): | void        |            |      |     |
∗
Mục đích: Truyền tải dữ liệu thay đổi trạng thái của vị trí đỗ xe (có xe/không
|     |     | có xe) | lên hệ thống | trung tâm | ngay khi có sự | kiện xảy ra. |
| --- | --- | ------ | ------------ | --------- | -------------- | ------------ |
∗
Mô tả logic: Ngay khi hàm detectVehicle() ghi nhận sự thay đổi trạng thái (từ
trống sang có xe hoặc ngược lại), phương thức này được kích hoạt. Nó đóng gói
mã slotId cùng trạng thái mới nhất và truyền qua mạng (MQTT/HTTP) lên
máy chủ. Máy chủ sau đó sẽ tiếp nhận và tiến hành cập nhật cơ sở dữ liệu.
|     | –   | storeLocally(): | bool |     |     |     |
| --- | --- | --------------- | ---- | --- | --- | --- |
∗
Mục đích: Xử lý sự cố mất mạng tạm thời, đảm bảo không bị mất mát dữ liệu
|     |     | trạng | thái của bãi | xe. |     |     |
| --- | --- | ----- | ------------ | --- | --- | --- |
∗ Mô tả logic: Khi sendData() phát hiện không thể thiết lập kết nối mạng với
máy chủ, phương thức này tự động được gọi. Nó tiến hành lưu trữ gói tin dữ
liệu trạng thái kèm theo mốc thời gian (timestamp) vào bộ nhớ cục bộ (như thẻ
nhớ SD hoặc EEPROM) trên thiết bị. Trả về true nếu lưu thành công.
|     | –   | syncToServer(): | bool |     |     |     |
| --- | --- | --------------- | ---- | --- | --- | --- |
∗ Mục đích: Đồng bộ hóa dữ liệu bị dồn đọng khi thiết bị có kết nối mạng trở lại.
∗ Mô tả logic: Khi thiết bị phát hiện kết nối mạng đã được khôi phục (ping thành
công tới máy chủ), phương thức này tiến hành quét bộ nhớ cục bộ. Nó trích
xuất các gói tin đã được lưu bởi storeLocally() và đẩy tuần tự lên hệ thống
trung tâm. Sau khi máy chủ gửi tín hiệu xác nhận (ACK) đã nhận đủ, phương
thức này sẽ xóa dữ liệu cục bộ để giải phóng bộ nhớ và trả về true.
| 8.2.15 | Lớp | ParkingSpot | (Vị | trí đỗ xe) |     |     |
| ------ | --- | ----------- | --- | ---------- | --- | --- |
Lớp thực thể đại diện cho một ô đỗ xe vật lý trong bãi đỗ, nơi được liên kết trực tiếp với
| dữ  | liệu giám | sát từ IoTDevice. |     |     |     |     |
| --- | --------- | ----------------- | --- | --- | --- | --- |
•
|     | Thuộc | tính:                       |         |               |                   |       |
| --- | ----- | --------------------------- | ------- | ------------- | ----------------- | ----- |
|     | –     | slotId: string:             | Mã định | danh duy nhất | của ô đỗ xe.      |       |
|     | –     | status: ParkingSpot_Status: |         | Trạng         | thái hiện tại của | ô đỗ. |
– lastUpdated: string: Mốc thời gian cập nhật trạng thái vị trí đỗ gần nhất.
|     | • Phương | thức:          |      |     |     |     |
| --- | -------- | -------------- | ---- | --- | --- | --- |
|     | –        | updateState(): | void |     |     |     |
∗ Mục đích: Cập nhật thông tin mới nhất về tình trạng chiếm dụng của vị trí đỗ
|     |     | xe trên | cơ sở dữ liệu | trung tâm. |     |     |
| --- | --- | ------- | ------------- | ---------- | --- | --- |
Trang 82/87

|     | Trường | Đại  | học Bách | Khoa     | Tp. | Hồ  | Chí  | Minh |     |     |     |
| --- | ------ | ---- | -------- | -------- | --- | --- | ---- | ---- | --- | --- | --- |
|     | Khoa   | Khoa | học và   | Kỹ thuật |     | Máy | tính |      |     |     |     |
∗ Mô tả logic: Phương thức này (nằm ở phía Server/Hệ thống) được kích hoạt khi
nhận được gói tin dữ liệu hợp lệ từ thiết bị IoT gửi thông qua hàm sendData().
Hệ thống tiến hành giải mã, truy vấn vị trí đỗ có slotId tương ứng và ghi đè
trạng thái mới (Available hoặc Occupied) cùng với thời gian lastUpdated vào cơ
sở dữ liệu. Giao diện app/web sẽ lấy dữ liệu mới này để render lại sơ đồ bãi xe.
|     | –   | addManualNote(): |     | void |     |     |     |     |     |     |     |
| --- | --- | ---------------- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
∗
Mục đích: Cho phép quản trị viên hoặc nhân viên bãi xe can thiệp và ghi chú
|     |     | thủ | công | về tình | trạng | bất | thường | của | vị trí đỗ. |     |     |
| --- | --- | --- | ---- | ------- | ----- | --- | ------ | --- | ---------- | --- | --- |
∗
Mô tả logic: Khi có sự cố ngoại lệ (ví dụ: cảm biến hỏng, vị trí cần dọn dẹp vệ
sinh, hoặc được khách VIP đặt trước), nhân viên thao tác trên giao diện phần
mềm quản lý để gọi phương thức này. Hệ thống sẽ thay đổi status của vị trí đỗ
sang "Maintenance"hoặc trạng thái tương ứng, đồng thời lưu trữ nội dung ghi
chú. Lúc này, người dùng thông thường sẽ không thể đặt hoặc xem vị trí này là
|     |     | chỗ | trống | trên | ứng dụng. |     |     |     |     |     |     |
| --- | --- | --- | ----- | ---- | --------- | --- | --- | --- | --- | --- | --- |
9 Testcase
| 9.1  | U3.1    | –                         | Xem | lịch  | sử giao     |     | dịch        | cá nhân |          |        |      |
| ---- | ------- | ------------------------- | --- | ----- | ----------- | --- | ----------- | ------- | -------- | ------ | ---- |
|      | Class:  | MemberCustomer,           |     |       | Transaction |     |             |         |          |        |      |
|      | Method: | viewTransactionHistory(), |     |       |             |     | getDetail() |         |          |        |      |
| Test |         | Description               |     | Input |             |     |             |         | Expected | Output | Test |
|      | ID      |                           |     |       |             |     |             |         |          |        | Type |
T1 Xem lịch sử khi MemberCustomer đã Hiển thị danh sách 3 giao Black-box
|     |     | có giao | dịch | đăng        | nhập; |     | DB có | 3   | dịch gồm: | timestamp,    |     |
| --- | --- | ------- | ---- | ----------- | ----- | --- | ----- | --- | --------- | ------------- | --- |
|     |     |         |      | Transaction |       |     | liên  | kết | amount,   | paymentStatus |     |
T2 Xem lịch sử khi MemberCustomer hợp Hệ thống hiển thị danh Black-box
|     |     | chưa có   | giao | lệ;         | DB  | không | có  |     | sách trống, | thông báo         |     |
| --- | --- | --------- | ---- | ----------- | --- | ----- | --- | --- | ----------- | ----------------- | --- |
|     |     | dịch (E1) |      | Transaction |     |       | nào |     | “Không      | có giao dịch nào” |     |
T3 Sắp xếp danh Danh sách đang hiển Danh sách sắp xếp theo Black-box
|     |     | sách theo | Số  | thị; | người | dùng | chọn  | sắp | amount | giảm dần |     |
| --- | --- | --------- | --- | ---- | ----- | ---- | ----- | --- | ------ | -------- | --- |
|     |     | tiền      |     | xếp  | theo  | “Số  | tiền” |     |        |          |     |
Trang 83/87

|      | Trường | Đại học Bách | Khoa Tp. | Hồ Chí Minh |     |          |        |     |      |
| ---- | ------ | ------------ | -------- | ----------- | --- | -------- | ------ | --- | ---- |
|      | Khoa   | Khoa học và  | Kỹ thuật | Máy tính    |     |          |        |     |      |
| Test |        | Description  | Input    |             |     | Expected | Output |     | Test |
|      | ID     |              |          |             |     |          |        |     | Type |
T4 getDetail() trả Transaction hợp lệ: Trả về chuỗi: “TX001 | Unit
về chuỗi đầy đủ transactionID=“TX001”, 50,000 VND | 2024-05-01
|     |     |     | amount=50000, |     |     | 08:00 | | Paid | | BKPay” |     |
| --- | --- | --- | ------------- | --- | --- | ----- | ------ | -------- | --- |
timestamp=“2024-05-01
08:00”,
paymentStatus=Paid,
paymentMethod=“BKPay”
T5 getDetail() khi Transaction có Trả về chuỗi với trường Unit
|     |     | có thuộc tính | paymentMethod=null |     |     | paymentMethod |       | hiển thị |     |
| --- | --- | ------------- | ------------------ | --- | --- | ------------- | ----- | -------- | --- |
|     |     | null          |                    |     |     | “N/A”,        | không | ném      |     |
exception
| 9.2  | U3.2    | – Thanh         | toán hóa           | đơn         |                |          |        |     |      |
| ---- | ------- | --------------- | ------------------ | ----------- | -------------- | -------- | ------ | --- | ---- |
|      | Class:  | MemberCustomer, | Invoice,           | Transaction |                |          |        |     |      |
|      | Method: | payInvoice(),   | generateInvoice(), |             | updateStatus() |          |        |     |      |
| Test |         | Description     | Input              |             |                | Expected | Output |     | Test |
|      | ID      |                 |                    |             |                |          |        |     | Type |
T6 Thanh toán MemberCustomer chọn updateStatus() cập nhật Black-box
thành công qua Invoice hợp lệ; BKPay paymentStatus=Paid; hiển
|     |     | BKPay | phản hồi | SUCCESS |     | thị “Giao | dịch | thành công” |     |
| --- | --- | ----- | -------- | ------- | --- | --------- | ---- | ----------- | --- |
T7 BKPay phản MemberCustomer chọn updateStatus() cập nhật Black-box
|     |     | hồi thất bại      | Invoice               | hợp lệ; BKPay |     | paymentStatus=Unpaid;   |         |            |      |
| --- | --- | ----------------- | --------------------- | ------------- | --- | ----------------------- | ------- | ---------- | ---- |
|     |     |                   | phản hồi              | FAILED        |     | hiển thị                | thông   | báo “Thanh |      |
|     |     |                   |                       |               |     | toán thất               | bại”    |            |      |
|     | T8  | generateInvoice() | ParkingSession:       |               |     | Invoice                 | tạo với |            | Unit |
|     |     | tạo hóa đơn       | checkInTime=“08:00”,  |               |     | amount=25,000           |         | VND;       |      |
|     |     | đúng              | checkOutTime=“10:30”; |               |     | dueDate=createdDate+24h |         |            |      |
pricePerHour=10,000
VND
Trang 84/87

|      | Trường | Đại         | học Bách | Khoa     | Tp. | Hồ Chí | Minh |          |     |        |     |      |
| ---- | ------ | ----------- | -------- | -------- | --- | ------ | ---- | -------- | --- | ------ | --- | ---- |
|      | Khoa   | Khoa        | học và   | Kỹ thuật | Máy | tính   |      |          |     |        |     |      |
| Test |        | Description |          | Input    |     |        |      | Expected |     | Output |     | Test |
|      | ID     |             |          |          |     |        |      |          |     |        |     | Type |
T9 updateStatus() paymentStatus=Unpaid; paymentStatus chuyển Unit
|     |     | đổi           |      | BKPay |                | trả SUCCESS; |     | thành | Paid; | lưu | vào DB |     |
| --- | --- | ------------- | ---- | ----- | -------------- | ------------ | --- | ----- | ----- | --- | ------ | --- |
|     |     | paymentStatus |      | gọi   | updateStatus() |              |     |       |       |     |        |     |
|     |     | thành         | Paid |       |                |              |     |       |       |     |        |     |
T10 Tài khoản bị walletBalance đủ; tài Hệ thống cho phép thanh Black-box
|     |     | khóa vẫn | được      | khoản | bị  | khóa | do quá | toán  | qua   | BKPay; | sau khi    |     |
| --- | --- | -------- | --------- | ----- | --- | ---- | ------ | ----- | ----- | ------ | ---------- | --- |
|     |     | thanh    | toán (E1) | hạn   |     |      |        | thành | công, | tài    | khoản được |     |
mở khóa
| 9.3  | U3.3    | –                  | Thanh | toán     | thủ            | công |     |          |     |        |     |      |
| ---- | ------- | ------------------ | ----- | -------- | -------------- | ---- | --- | -------- | --- | ------ | --- | ---- |
|      | Class:  | Employee,          |       | Invoice, | Transaction    |      |     |          |     |        |     |      |
|      | Method: | generateInvoice(), |       |          | updateStatus() |      |     |          |     |        |     |      |
| Test |         | Description        |       | Input    |                |      |     | Expected |     | Output |     | Test |
|      | ID      |                    |       |          |                |      |     |          |     |        |     | Type |
T11 Quét thẻ tạm Khách dùng thẻ tạm Hệ thống hiển thị amount Black-box
hợp lệ tại cổng hợp lệ; Invoice tương cho cả khách và nhân viên
|     |     | ra  |     | ứng | tồn | tại trong | DB  |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- |
T12 Không tìm thấy Thẻ tạm quét vào nhưng Hệ thống báo lỗi; nhân Black-box
|     |     | giao dịch | gửi | xe DB   | không | tìm       | thấy | viên | xác         | minh | bằng biển |     |
| --- | --- | --------- | --- | ------- | ----- | --------- | ---- | ---- | ----------- | ---- | --------- | --- |
|     |     | (E1)      |     | Invoice |       | tương ứng |      | số,  | tạo Invoice |      | thủ công  |     |
qua generateInvoice()
T13 Khách mất thẻ Khách không có thẻ; generateInvoice() tạo Black-box
(E1 – mất thẻ) nhân viên nhập biển số Invoice với amount cộng
|     |     |     |     | xe  | thủ | công |     | thêm | phí | phạt | mất thẻ |     |
| --- | --- | --- | --- | --- | --- | ---- | --- | ---- | --- | ---- | ------- | --- |
T14 Nhân viên xác Khách đã trả tiền mặt; Transaction.updateStatus() Black-box
|     |      | nhận đã | nhận | nhân | viên | bấm      | “Xác  | đổi   | paymentStatus |     | thành    |     |
| --- | ---- | ------- | ---- | ---- | ---- | -------- | ----- | ----- | ------------- | --- | -------- | --- |
|     |      | tiền    |      | nhận | đã   | nhận     | tiền” | Paid; | lưu           | DB; | barie mở |     |
| 9.4 | U2.1 | —       | Xác  | nhận | và   | ghi nhận | ra    | vào   | tự động       |     |          |     |
Class: ParkingSession, RFIDCard, Vehicle, ParkingSpot, IoTDevice Method:
| processAutoCheckIn(), |     |     |     | processAutoCheckOut(), |     |     |     |     |     |     |     |     |
| --------------------- | --- | --- | --- | ---------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
Trang 85/87

| Trường | Đại         | học Bách | Khoa Tp. | Hồ Chí Minh |          |        |     |      |
| ------ | ----------- | -------- | -------- | ----------- | -------- | ------ | --- | ---- |
| Khoa   | Khoa        | học và   | Kỹ thuật | Máy tính    |          |        |     |      |
| Test   | Description |          | Input    |             | Expected | Output |     | Test |
| ID     |             |          |          |             |          |        |     | Type |
T1 Check-in tự RFIDCard hợp lệ, verifyMember() trả về true; Black-box
|     | động | thành công | isAssigned=true; |                  | ParkingSession        | tạo | với   |     |
| --- | ---- | ---------- | ---------------- | ---------------- | --------------------- | --- | ----- | --- |
|     |      |            | licensePlate     | khớp với         | checkInTime=now,      |     |       |     |
|     |      |            | Vehicle          | đã đăng ký; biển | isGuestSession=false; |     | barie |     |
|     |      |            | số xác           | nhận qua camera  | mở                    |     |       |     |
T2 Thẻ RFID hết RFIDCard quét tại cổng verifyMember() trả về Black-box
hạn hoặc bị nhưng isAssigned=false false; hệ thống hiển thị lỗi
|     | khóa | (E1) | hoặc thẻ | không hợp lệ | “Thẻ không | hợp lệ”; | barie |     |
| --- | ---- | ---- | -------- | ------------ | ---------- | -------- | ----- | --- |
không mở
T3 Biển số không RFIDCard hợp lệ nhưng verifyMember() trả về Black-box
khớp với đăng licensePlate camera đọc false; hệ thống hiển thị lỗi
|     | ký (E2) |     | được không | khớp với | “Biển số | không khớp”; | barie |     |
| --- | ------- | --- | ---------- | -------- | -------- | ------------ | ----- | --- |
|     |         |     | Vehicle    | trong DB | không mở |              |       |     |
T4 Check-out tự ParkingSession đang mở processAutoCheckOut() Black-box
động thành công với vehicleId hợp lệ; xe ghi checkOutTime=now;
|     |     |     | quét thẻ | tại cổng ra | calculateFee() | tính     | phí; |     |
| --- | --- | --- | -------- | ----------- | -------------- | -------- | ---- | --- |
|     |     |     |          |             | phiên đóng;    | barie mở |      |     |
T5 Khách có gói MemberCustomer có processAutoCheckIn() tạo Black-box
tháng còn hiệu MonthlyTicket còn hiệu ParkingSession; hệ thống
|     | lực (A2) |     | lực; xe | vào bãi | bỏ qua bước | tính phí; | barie |     |
| --- | -------- | --- | ------- | ------- | ----------- | --------- | ----- | --- |
mở
T6 Khách không có MemberCustomer không processAutoCheckIn() tạo Black-box
gói tháng, cộng có MonthlyTicket; xe ParkingSession; hệ thống
|     | dồn | phí (A1) | vào bãi |     | ghi nhận | để tính phí | khi ra |     |
| --- | --- | -------- | ------- | --- | -------- | ----------- | ------ | --- |
T7 verifyMember() rfid=“CARD001”, verifyMember() trả về true Unit
|     | xác thực | đúng | licensePlate=“51A- |                 |     |     |     |     |
| --- | -------- | ---- | ------------------ | --------------- | --- | --- | --- | --- |
|     |          |      | 123.45”;           | cả hai khớp với |     |     |     |     |
|     |          |      | Vehicle            | trong DB        |     |     |     |     |
T8 ParkingSpot cập IoTDevice phát hiện xe ParkingSpot.status chuyển Unit
nhật trạng thái vào ô đỗ slotId=“A01”; từ Available sang Occupied;
|     | sau check-in |     | gọi updateState() |     | cập nhật | lastUpdated=now |       |       |
| --- | ------------ | --- | ----------------- | --- | -------- | --------------- | ----- | ----- |
|     |              |     |                   |     |          |                 | Trang | 86/87 |

| Trường Đại       | học Bách | Khoa Tp. | Hồ Chí Minh |          |        |      |
| ---------------- | -------- | -------- | ----------- | -------- | ------ | ---- |
| Khoa Khoa        | học và   | Kỹ thuật | Máy tính    |          |        |      |
| Test Description |          | Input    |             | Expected | Output | Test |
| ID               |          |          |             |          |        | Type |
T9 ParkingSpot cập IoTDevice phát hiện xe ParkingSpot.status chuyển Unit
nhật trạng thái rời ô đỗ slotId=“A01”; từ Occupied sang Available;
| sau check-out |     | gọi updateState() |     | cập nhật | lastUpdated=now |     |
| ------------- | --- | ----------------- | --- | -------- | --------------- | --- |
Trang 87/87
