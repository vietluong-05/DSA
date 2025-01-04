const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class ParkingLot {
    constructor() {
        this.parkingLot = [];
        this.totalEarnings = 0;
        this.rates = {
            bicycle: { day: 1, night: 2, transition: 3, full: 5 },
            motorcycle: { day: 3, night: 5, transition: 8, full: 13 },
        };
    }

    isValidTime(time) {
        const timeRegex = /^([01]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/;
        return timeRegex.test(time);
    }

    in(hhmmss, plate, type) {
        if (!this.isValidTime(hhmmss)) return 0;
        if (this.find(plate) !== -1) return 0;
        this.parkingLot.push({ plate, type, inTime: hhmmss });
        return 1;
    }

    out(hhmmss, plate) {
        if (!this.isValidTime(hhmmss)) return 0;
        const index = this.find(plate);
        if (index === -1) return 0;
        const vehicle = this.parkingLot.splice(index, 1)[0];
        const bill = this.calculateBill(vehicle.inTime, hhmmss, vehicle.type);
        this.totalEarnings += bill;
        return 1;
    }

    find(plate) {
        return this.parkingLot.findIndex(vehicle => vehicle.plate === plate);
    }

    list() {
        if (this.parkingLot.length === 0) {
            console.log("Bãi xe hiện tại trống.");
            return;
        }
        this.parkingLot.forEach(vehicle => {
            console.log(`${vehicle.inTime} ${vehicle.plate}`);
        });
    }

    countBicycles() {
        return this.parkingLot.filter(vehicle => vehicle.type === "bicycle").length;
    }

    countMotorcycles() {
        return this.parkingLot.filter(vehicle => vehicle.type === "motorcycle").length;
    }

    calculateBill(startTime, endTime, type) {
        const [startH] = startTime.split(":").map(Number);
        const [endH] = endTime.split(":").map(Number);
        const dayStart = 6, dayEnd = 18;

        if (startH >= dayStart && endH < dayEnd) return this.rates[type].day;
        else if (startH < dayStart && endH >= dayStart && endH < dayEnd) return this.rates[type].transition;
        else if (startH < dayStart && endH >= dayEnd) return this.rates[type].full;
        else return this.rates[type].night;
    }

    billAll() {
        console.log(this.totalEarnings);
    }
    bill(time, plate) {
        const vehicle = this.parkingLot.find(v => v.plate === plate);
        if (!vehicle) {
            console.log(-1);
            return -1;
        }
        const checkInTime = vehicle.inTime;
        const totalPrice = this.calculateBill(checkInTime, time, vehicle.type);
        console.log(totalPrice);
    }
}

const parkingLot = new ParkingLot();
let isReadingVehicles = true;

rl.on("line", (line) => {
    line = line.trim();
    if (line === "***") {
        rl.close();
        return;
    }

    if (line === "*") {
        isReadingVehicles = false;
        return;
    }

    if (isReadingVehicles) {
        const [time, plate, type] = line.split(" ");
        parkingLot.in(time, plate, type || "bicycle");
    } else {
        const [action, ...params] = line.split(" ");
        switch (action) {
            case "list":
                parkingLot.list();
                break;
            case "find":
                console.log(parkingLot.find(params[0]) !== -1 ? parkingLot.find(params[0]) + 1 : -1);
                break;
            case "cnt-xedap":
                console.log(parkingLot.countBicycles());
                break;
            case "cnt-moto":
                console.log(parkingLot.countMotorcycles());
                break;
            case "in":
                console.log(parkingLot.in(params[0], params[1], params[2] || "bicycle"));
                break;
            case "out":
                console.log(parkingLot.out(params[0], params[1]));
                break;
            case "bill":
                parkingLot.bill(params[0], params[1]);
                break;
            case "billall":
                parkingLot.billAll();
                break;
            default:
                console.log("Lệnh không hợp lệ.");
        }
    }
});
