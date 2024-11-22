import http from "../../shared/services/http-common.js";

export class TechnicalReviewService {
    //resourceEndpoint = "https://my-json-server.typicode.com/zrodrigochirinos/json-server-review/technicalSupportReviews";
    //resourceEndpoint = "http://localhost:3000/technicalSupportReviews";
    resourceEndpoint = "/technical-support-review";
    //Token para pruebas
    //authToken="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI3MjgxNjksImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiMiIsImFjIl0sImlhdCI6MTczMjEyMzM2OSwibmJmIjoxNzMyMTIzMzY5fQ.D0Qmk1O0XKs_oUpDOhS4KW5Bl_RRgiX0shfJzprEp7w";

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    getByTechnicalId(technicalSupportId) {
        return http.get(`${this.resourceEndpoint}/${technicalSupportId}`);
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