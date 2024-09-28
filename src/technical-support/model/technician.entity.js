// technician.entity.js
export class Technician {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.stars = data.stars;
        this.status = data.status;
        this.img = data.img;
        // Add other properties if needed
    }
}
