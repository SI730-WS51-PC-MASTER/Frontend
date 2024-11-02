import http from "../../shared/services/http-common.js";

export class WishlistService {
    resourceEndpoint = "https://my-json-server.typicode.com/zrodrigochirinos/json-server-interaction/wishlist";

    //resourceEndpoint = "http://localhost:3000/wishlist"

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
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