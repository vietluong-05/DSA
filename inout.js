function inVehicle(parkingLot, hhmmss, plate, type) {
  if (!parkingLot.isValidTime(hhmmss)) {
    console.log(`Invalid time format: ${hhmmss}`);
    return 0;
  }
  if (parkingLot.find(plate) !== -1) {
    console.log(`Vehicle ${plate} is already in the parking lot.`);
    return 0; // Xe đã tồn tại
  }
  parkingLot.parkingLot.push({ plate, type, inTime: hhmmss });
  console.log(`Vehicle ${plate} (${type}) entered at ${hhmmss}.`);
  return 1; // Thành công
}

//cho xe ra ngoai
function outVehicle(parkingLot, hhmmss, plate) {
  if (!parkingLot.isValidTime(hhmmss)) {
    console.log(`Invalid time format: ${hhmmss}`);
    return 0;
  }
  const index = parkingLot.find(plate);
  if (index === -1) {
    console.log(`Vehicle ${plate} not found.`);
    return 0; // Không tìm thấy xe
  }
  const vehicle = parkingLot.parkingLot.splice(index, 1)[0];
  const bill = parkingLot.calculateBill(vehicle.inTime, hhmmss, vehicle.type);
  parkingLot.totalEarnings += bill;
  console.log(`Vehicle ${plate} removed. Bill: ${bill}K VND.`);
  return 1; // Thành công
}
