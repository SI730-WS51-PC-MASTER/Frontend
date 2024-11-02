import http from "../../shared/services/http-common.js";

export class cartService {
    resourceEndpoint = "http://localhost:3000/shopping-cart";

    userContextId = 0;

    setUserContext(context) {
        this.userContextId = context;
    }

    getUserContext() {
        return this.userContextId;
    }

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getAllByUserId() {
        return http.get(`${this.resourceEndpoint}?userId=${this.userContextId}`);
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