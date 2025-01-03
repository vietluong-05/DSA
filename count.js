// Hàm kiểm tra xe đạp
function isBicycle(plate) {
    return plate.startsWith("xxxx");
}

// Đếm số lượng xe đạp
function countBicycles(vehicles) {
    let count1 = 0;
    for (let i = 0; i < vehicles.length; i++) {
        if (isBicycle(vehicles[i].plate)) {
            count1++;
        }
    }
    return count1;
}

// Đếm số lượng xe máy
function countMotorcycles(vehicles) {
    let count2 = 0;
    for (let i = 0; i < vehicles.length; i++) {
        if (!isBicycle(vehicles[i].plate)) {
            count2++;
        }
    }
    return count2;
}

// Xuất các hàm để sử dụng ở file khác
module.exports = { countBicycles, countMotorcycles };
