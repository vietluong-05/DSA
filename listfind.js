
    // Danh sách xe trong bãi
    function list() {
        this.vehicles.forEach(vehicle => {
            console.log(`${vehicle.time} ${vehicle.plate}`);
        });
    }

    // Tìm xe trong bãi
    function find(plate) {
        let index = this.vehicles.findIndex(vehicle => vehicle.plate === plate);
        return index !== -1 ? index : -1;
    }
module.exports = {list, find}; 
