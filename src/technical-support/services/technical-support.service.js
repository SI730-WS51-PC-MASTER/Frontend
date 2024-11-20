import http from "../../shared/services/http-common.js";

export class TechnicalSupportService {
    //resourceEndpoint = "https://my-json-server.typicode.com/OscarGAV/technical-support-json-server/technical-support";
    resourceEndpoint = 'http://localhost:5175/api/v1/technical-support';

    //Token para pruebas (este token se genera localmente en cada bd nuestra de nuestro equipo)
    authToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI2OTU0NTYsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiMSIsInN0cmluZyJdLCJpYXQiOjE3MzIwOTA2NTYsIm5iZiI6MTczMjA5MDY1Nn0.pK8O5YX7lecHAWhjkxuMYbDO_qcz6FTRXEWar4vfyjs";

    getAll() {
        return http.get(this.resourceEndpoint, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,  // Usamos el token directamente aquí
            },
        });
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,  // También se usa aquí
            },
        });
    }

    create(technicalSupportResource) {
        return http.post(this.resourceEndpoint, technicalSupportResource, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        });
    }

    update(id, technicalSupportResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, technicalSupportResource, {
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
}
