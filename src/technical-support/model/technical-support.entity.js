// technical-support.entity.js
export class TechnicalSupport {
    constructor(data) {
        this.id = data.id;
        this.technicianId = data.technicianId;
        this.supportType = data.supportType;
        this.dateOfRequest = data.dateOfRequest;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
}
