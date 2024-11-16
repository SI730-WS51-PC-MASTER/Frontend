import http from "../../shared/services/http-common.js";

export class ComponentService {
    resourceEndpoint = 'https://my-json-server.typicode.com/AlexlmL/dbserver_PCMaster/components';

    //resourceEndpoint = "http://localhost:3000/components"

    getAll() {
        console.log(this.resourceEndpoint);
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(categoryResource) {
        return http.post(this.resourceEndpoint, categoryResource);
    }

    update(id, categoryResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, categoryResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}