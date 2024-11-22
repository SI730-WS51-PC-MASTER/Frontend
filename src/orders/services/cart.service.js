import http from "../../shared/services/http-common.js";
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";

export class cartService {
    resourceEndpoint = "/cart";

    userContextId = useAuthenticationStore().currentUserId;

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
        return http.get(`${this.resourceEndpoint}/user/${this.userContextId}`);
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