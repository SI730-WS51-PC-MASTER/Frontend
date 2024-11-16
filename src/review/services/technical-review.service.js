import http from "../../shared/services/http-common.js";

export class TechnicalReviewService {
    resourceEndpoint = "https://my-json-server.typicode.com/zrodrigochirinos/json-server-review/technicalSupportReviews";
    //resourceEndpoint = "http://localhost:3000/technicalSupportReviews";

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    getByComponentId(technicalSupportId) {
        return http.get(`${this.resourceEndpoint}?technical_support_id=${technicalSupportId}`);
    }

    create(Resource) {
        return http.post(this.resourceEndpoint, Resource);
    }

    update(id, Resource) {
        return http.put(`${this.resourceEndpoint}/${id}`, Resource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}