import http from "../../shared/services/http-common.js";

export class TechnicianService {
    resourceEndpoint = "/technicians";

    getAll() {
        console.log(`Fetching from ${this.resourceEndpoint}`);
        return http.get(this.resourceEndpoint);
    }

    /**
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(technicianResource) {
        return http.post(this.resourceEndpoint, technicianResource);
    }

    update(id, technicianResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, technicianResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }**/
}
