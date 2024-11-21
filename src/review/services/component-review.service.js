import http from "../../shared/services/http-common.js";

export class ComponentReviewService {
    //resourceEndpoint = "https://my-json-server.typicode.com/zrodrigochirinos/json-server-review/componentReviews";
    //resourceEndpoint = "http://localhost:3000/componentReviews";
    resourceEndpoint = "/component-review";

    //Token para pruebas
    //authToken="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI3NjE0MjQsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiMiIsImFkIl0sImlhdCI6MTczMjE1NjYyNCwibmJmIjoxNzMyMTU2NjI0fQ.vIjk3xZlOrrLLFJoj46RKTLxWchbc9Udud1gqS8JLvw";



    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    getByComponentId(componentId) {
        return http.get(`${this.resourceEndpoint}/${componentId}`);
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