-------------------------------------------------------
Nhóm 8: Đề 1 - Hệ thống quản lý bãi gửi xe 
Danh sách thành viên:
Nguyễn Thu Hường - 20231594
Lê Thị Tú Trinh - 20231644
Lương Anh Việt - 20231652
Nguyễn Thị Ngọc Linh - 20221859
-------------------------------------------------------

Cho bài toán bãi gửi xe 2 bánh (xe đạp và xe máy) không qua đêm. Giá tiền gửi được xác 
định theo ban ngày và ban đêm. 
· Xe đạp, ban ngày: 1k vnd 
· Xe đạp, ban đêm : 2k vnd 
· Xe đạp đêm - ngày: 3k vnd 
· Xe đạp đêm - ngày - đêm: 5k vnd 
· Xe máy, ban ngày: 3k vnd 
· Xe máy, ban đêm: 5k vnd 
· Xe máy, đêm - ngày: 8k vnd 
· Xe máy, đêm - ngày - đêm: 13k vnd 
Ban ngày từ (>=) 06:00:00 đến trước (<) 18:00:00 
Cho phép thực hiện một lệnh hoặc một chuỗi lệnh trên dữ liệu giữ xe. Các lệnh cho 
phép bao gồm: 
1. list: in ra danh sách xe trong bãi, theo thứ tự của input. Lưu ý chỉ trả về biển số (1đ) 
2. find <plate>: tìm xe có biển số <plate> có trong bãi hay không. Ví dụ: find 31K1
123.45: in ra chỉ số của xe trong danh sách nếu tìm thấy (xe đầu tiên trong input có chỉ 
số là 1), -1 nếu không tìm thấy (1đ) 
3. in <hh:mm:ss> <plate>: lúc <hh:mm:ss> cho xe biển số <plate> vào bãi. Ví dụ: in 
10:00:02 31K1-123.45 trả về 0 nếu lỗi (xe đang trong bãi), 1 nếu thành công (1đ) 
4. out <hh:mm:ss> <plate>: lúc <hh:mm:ss> cho xe biển số <plate> ra. Ví dụ: out 
03:04:56 31K1-123.45 trả về 0 nếu lỗi (xe không có trong bãi), 1 nếu thành công (2đ) 
5. cnt-moto: đếm số xe máy đang có trong bãi (1đ) 
6. cnt-xedap: đếm số xe đạp đang có trong bãi (1đ) 
7. bill <hh:mm:ss> <plate>: tính tiền gửi xe cho xe có biển <plate>. nếu không tìm thấy 
xe trong bãi trả về -1. Chú ý, chỉ tính tiền, xe vẫn ở trong bãi, không cho xe ra khỏi bãi. 
(1đ) 
8. billall: tính tổng số tiền gửi xe thu được từ khi bắt đầu chạy chương trình, việc thu 
tiền được thực hiện khi xe ra khỏi bãi. (1đ)

Phân công công việc:
Nguyễn Thu Hường: Lệnh cnt-moto, cnt-xedap
Lê Thị Tú Trinh: Lệnh list, find
Nguyễn Thị Ngọc Linh: Lệnh in, out
Lương Anh Việt: Lệnh bill, billall
