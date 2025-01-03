const fs = require('fs');

// Helper to determine if a time is during the day
function isDayTime(time) {
  const [hour, minute, second] = time.split(':').map(Number);
  const timeInSeconds = hour * 3600 + minute * 60 + second;
  return timeInSeconds >= 21600 && timeInSeconds < 64800; // 06:00:00 to 17:59:59
}

// Calculate the bill for a specific vehicle
function bill(plate) {
  // Read parking data
  const parkingData = JSON.parse(fs.readFileSync('parkingData.json', 'utf-8'));
  const vehicle = parkingData.vehicles[plate];
  if (!vehicle) return -1;

  const startTimeDay = isDayTime(vehicle.time);
  const endTimeDay = isDayTime(new Date().toLocaleTimeString('en-US'));
  const { type } = vehicle;

  let cost = 0;
  if (type === 'Bicycle') {
    if (startTimeDay && endTimeDay) cost = 1;
    else if (!startTimeDay && !endTimeDay) cost = 2;
    else if (startTimeDay && !endTimeDay) cost = 3;
    else cost = 5;
  } else if (type === 'Motorbike') {
    if (startTimeDay && endTimeDay) cost = 3;
    else if (!startTimeDay && !endTimeDay) cost = 5;
    else if (startTimeDay && !endTimeDay) cost = 8;
    else cost = 13;
  }

  return cost;
}

// CLI Interaction
const prompt = require('prompt-sync')({ sigint: true });
const plate = prompt('Enter vehicle plate: ');
const billAmount = bill(plate);

if (billAmount === -1) {
  console.log('Vehicle not found.');
} else {
  console.log(`The bill for ${plate} is: ${billAmount}`);
}
