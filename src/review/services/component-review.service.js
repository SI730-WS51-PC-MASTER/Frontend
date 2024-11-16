import http from "../../shared/services/http-common.js";

export class ComponentReviewService {
    resourceEndpoint = "https://my-json-server.typicode.com/zrodrigochirinos/json-server-review/componentReviews";
    //resourceEndpoint = "http://localhost:3000/componentReviews";

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    getByComponentId(componentId) {
        return http.get(`${this.resourceEndpoint}?component_id=${componentId}`);
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