import http from "../../shared/services/http-common.js";

export class ComponentService {

    //resourceEndpoint = 'https://my-json-server.typicode.com/AlexlmL/dbserver_PCMaster/components';
    resourceEndpoint = "https://localhost:44345/api/v1/component";
    //resourceEndpoint = "http://localhost:3000/components"
    //Token para pruebas
    authToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI2MzYyMDYsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiMSIsImFlYSJdLCJpYXQiOjE3MzIwMzE0MDYsIm5iZiI6MTczMjAzMTQwNn0.j8IYA9xMcmIsN3T1V6Uo0FOs9V_CELdSxyx3neIRDvg";


    getAll() {
        return http.get(this.resourceEndpoint, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,  // Usamos el token directamente aquí
            },
        });
    }
    getById(componentId) {
        return http.get(`${this.resourceEndpoint}/${componentId}`, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,  // También se usa aquí
            },
        });
    }
    create(categoryResource) {
        return http.post(this.resourceEndpoint, categoryResource, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        });
    }

    update(id, categoryResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, categoryResource, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        });
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        });
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}