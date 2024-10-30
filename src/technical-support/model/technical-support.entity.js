// technical-support.entity.js
export class TechnicalSupport {
    constructor(data) {
        this.id = data.id;
        this.dateOfRequest = data.dateOfRequest;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.supportType = data.supportType;
        this.technicianId = data.technicianId;
        // Add other properties if needed
    }
}
