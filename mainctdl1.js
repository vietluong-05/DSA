const readline = require("readline");
//const { countBicycles, countMotorcycles } = require('D:/Hường/HỌC/KTLT/BTL/count.js');
const { list, find } = require ('C:/Users/ThinkPad/Desktop/AC2010/listfind.js');
class ParkingLot {
    constructor() {
        this.vehicles = [];
        this.totalRevenue = 0;
    }
    in(time, plate) {
        // Kiểm tra định dạng thời gian
        if (!this.isValidTime(time)) {
            console.log(0); // Thời gian không hợp lệ
            return;
        }  
        // Kiểm tra định dạng biển số xe
        if (!this.isValidPlate(plate)) {
            console.log(0); // Biển số xe không hợp lệ
            return;
        }
        // Kiểm tra xem xe đã có trong bãi chưa
        const exists = this.vehicles.some(vehicle => vehicle.plate === plate);
        if (exists) {
            console.log(0); // Xe đã tồn tại
            return;
        }
        // Thêm xe vào danh sách
        this.vehicles.push({ plate, time_in: time });
        console.log(1); // Thêm thành công
    }
    // Xe rời bãi
    out(time, plate) {
        if (!this.isValidTime(time)) {
            console.log(0); // Thời gian không hợp lệ
            return;
        }
        const index = this.vehicles.findIndex(vehicle => vehicle.plate === plate);
        if (index === -1) {
            console.log(0); // Xe không có trong bãi
            return;
        }
        const vehicle = this.vehicles[index];
        const cost = this.bill(time, plate); // Tính phí
        this.totalRevenue += cost;
        this.vehicles.splice(index, 1); // Loại bỏ xe khỏi danh sách
        console.log(1); // Thành công
    }
    // Tìm xe
    find(plate) {
        const index = this.vehicles.findIndex(vehicle => vehicle.plate === plate);
        console.log(index !== -1 ? index + 1 : -1); // Trả về chỉ số hoặc -1
    }
    // Đếm xe đạp
    countBicycles() {
        return countBicycles(this.vehicles);
    }
    // Đếm xe máy
    countMotorcycles() {
        return countMotorcycles(this.vehicles);
    }
    // Danh sách xe trong bãi
    list() {
        if (this.vehicles.length === 0) {
            console.log("Bãi xe hiện tại trống.");
            return;
        }
        this.vehicles.forEach(vehicle => {
            console.log(`${vehicle.time_in} ${vehicle.plate}`); // Hiển thị thời gian và biển số
        });
    }
    calculatePrice(checkInTime, checkOutTime, plate) {
        const isBicycle = /^xxxx-\d{3}\.\d{2}$/.test(plate);
        const rates = isBicycle
            ? { day: 1, night: 2, dayNight: 3, fullCycle: 5 }
            : { day: 3, night: 5, dayNight: 8, fullCycle: 13 };
        const checkIn = new Date(`2024-12-23T${checkInTime}`);
        const checkOut = new Date(`2025-01-01T${checkOutTime}`);
        const isDayTime = hour => hour >= 6 && hour < 18;
        const checkInHour = checkIn.getHours();
        const checkOutHour = checkOut.getHours();
        if (isDayTime(checkInHour) && isDayTime(checkOutHour)) {
            return rates.day;
        }
        if (!isDayTime(checkInHour) && !isDayTime(checkOutHour)) {
            return rates.night;
        }
        return rates.dayNight;
    }
   
    bill(time, plate) {
        const vehicle = this.vehicles.find(v => v.plate === plate);
        if (!vehicle) {
            console.log(-1);
            return -1;
        }
        const checkInTime = vehicle.time_in;
        const totalPrice = this.calculatePrice(checkInTime, time, plate);
        return totalPrice;
    }
    billall() {
        console.log(this.totalRevenue);
    }
    // Kiểm tra định dạng thời gian
    isValidTime(time) {
        const regex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        return regex.test(time);
    }
    // Kiểm tra định dạng biển số xe
    isValidPlate(plate) {
        // Regex kiểm tra xe đạp
        const bicycleRegex = /^xxxx-\d{3}\.\d{2}$/;
        // Regex kiểm tra xe máy
        const motorcycleRegex = /^\d{2}[A-Za-z]\d-\d{3}\.\d{2}$/;
        // Biển số hợp lệ là 1 trong 2 loại trên
        return bicycleRegex.test(plate) || motorcycleRegex.test(plate);
    }
    // Kiểm tra xe đạp
    isBicycle(plate) {
        return plate.startsWith("xxxx");
    }
}
// Khởi tạo ParkingLot
const parkingLot = new ParkingLot();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let isReadingVehicles = true;
rl.on("line", (line) => {
    line = line.trim();
    // Kết thúc chương trình
    if (line === "***") {
        rl.close();
        return;
    }
    // Chuyển từ khối xe khởi tạo sang khối lệnh
    if (line === "*") {
        isReadingVehicles = false;
        return;
    }
    if (isReadingVehicles) {
        // Đọc danh sách xe ban đầu
        const [time, plate] = line.split(" ");
        if (time && plate) {
            parkingLot.vehicles.push({ plate, time_in: time }); // Thêm trực tiếp vào bãi
        }
    } else {
        // Xử lý các câu lệnh
        const [action, ...params] = line.split(" ");
        switch (action) {
            case "list":
                parkingLot.list();
                break;
            case "find":
                parkingLot.find(params[0]); // Biển số
                break;
            case "cnt-xedap":
                console.log(parkingLot.countBicycles());
                break;
            case "cnt-moto":
                console.log(parkingLot.countMotorcycles());
                break;
            case "in":
                parkingLot.in(params[0], params[1]); // Thời gian, biển số
                break;
            case "out":
                parkingLot.out(params[0], params[1]); // Thời gian, biển số
                break;
            case "bill":
                console.log(parkingLot.bill(params[0], params[1])); // Tính phí gửi xe
                break;
            case "billall":
                parkingLot.billall();
                break;
            default:
                console.log("Lệnh không hợp lệ.");
        }
    }
});
