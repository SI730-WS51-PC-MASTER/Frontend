import http from "../../shared/services/http-common.js";

export class cartService {
    resourceEndpoint = "http://localhost:3000/cart";

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(cartResource) {
        return http.post(this.resourceEndpoint, cartResource);
    }

    update(id, cartResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, cartResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}