class ParkingLot {
    constructor() {
      this.parkingLot = [];
      this.totalEarnings = 0; // Tổng doanh thu
      this.rates = {
        bicycle: { day: 1, night: 2, transition: 3, full: 5 },
        motorcycle: { day: 3, night: 5, transition: 8, full: 13 },
      };
    }
  
    // Kiểm tra định dạng thời gian
    isValidTime(time) {
      const timeRegex = /^([01]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/;
      return timeRegex.test(time);
    }
  
    // Thêm xe vào bãi
    in(hhmmss, plate, type) {
      if (!this.isValidTime(hhmmss)) {
        console.log(`Invalid time format: ${hhmmss}`);
        return 0;
      }
      if (this.find(plate) !== -1) {
        console.log(`Vehicle ${plate} is already in the parking lot.`);
        return 0; // Xe đã tồn tại
      }
      this.parkingLot.push({ plate, type, inTime: hhmmss });
      console.log(`Vehicle ${plate} (${type}) entered at ${hhmmss}.`);
      return 1; // Thành công
    }
  
    // Loại bỏ xe khỏi bãi
    out(hhmmss, plate) {
      if (!this.isValidTime(hhmmss)) {
        console.log(`Invalid time format: ${hhmmss}`);
        return 0;
      }
      const index = this.find(plate);
      if (index === -1) {
        console.log(`Vehicle ${plate} not found.`);
        return 0;
      }
      const vehicle = this.parkingLot.splice(index, 1)[0];
      const bill = this.calculateBill(vehicle.inTime, hhmmss, vehicle.type);
      this.totalEarnings += bill;
      console.log(`Vehicle ${plate} removed. Bill: ${bill}K VND.`);
      return 1;
    }
  
    // Tìm xe theo biển số
    find(plate) {
      return this.parkingLot.findIndex(vehicle => vehicle.plate === plate);
    }
  
    // Liệt kê danh sách xe
    list() {
      return this.parkingLot.map(vehicle => `${vehicle.plate} (${vehicle.type})`).join("\n");
    }
  
    // Đếm xe đạp
    countBicycles() {
      return this.parkingLot.filter(vehicle => vehicle.type === "bicycle").length;
    }
  
    // Đếm xe máy
    countMotorcycles() {
      return this.parkingLot.filter(vehicle => vehicle.type === "motorcycle").length;
    }
  
    // Tính tiền gửi xe
    calculateBill(startTime, endTime, type) {
      const [startH] = startTime.split(":").map(Number);
      const [endH] = endTime.split(":").map(Number);
  
      const dayStart = 6;
      const dayEnd = 18;
  
      if (startH >= dayStart && endH < dayEnd) {
        return this.rates[type].day;
      } else if (startH < dayStart && endH >= dayStart && endH < dayEnd) {
        return this.rates[type].transition;
      } else if (startH < dayStart && endH >= dayEnd) {
        return this.rates[type].full;
      } else {
        return this.rates[type].night;
      }
    }
  
    // Tổng doanh thu
    billAll() {
      return this.totalEarnings;
    }
  }
  
  // Khởi tạo bãi xe
  const parkingLot = new ParkingLot();
  
  // Test cases
console.log("\n--- Test Case 1: In and List ---");
parkingLot.in("10:30:24", "31K1-123.45", "motorcycle");
parkingLot.in("11:30:24", "xxxx-000.01", "bicycle");
console.log(parkingLot.list());

console.log("\n--- Test Case 2: Out Success ---");
parkingLot.in("11:30:25", "xxxx-000.02", "bicycle");
console.log(parkingLot.out("12:30:25", "xxxx-000.02"));

console.log("\n--- Test Case 3: Out Error ---");
console.log(parkingLot.out("12:30:25", "xxxx-000.03"));

console.log("\n--- Test Case 4: Bill Calculation ---");
console.log(parkingLot.calculateBill("05:00:00", "19:00:00", "motorcycle"));

console.log("\n--- Test Case 5: Count Vehicles ---");
console.log("Bicycles:", parkingLot.countBicycles());
console.log("Motorcycles:", parkingLot.countMotorcycles());

console.log("\n--- Test Case 6: Total Earnings ---");
console.log("Total Earnings:", parkingLot.billAll());

  
  
