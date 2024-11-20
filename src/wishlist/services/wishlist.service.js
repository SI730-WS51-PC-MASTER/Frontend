import http from "../../shared/services/http-common.js";

export class WishlistService {
    //resourceEndpoint = "https://my-json-server.typicode.com/zrodrigochirinos/json-server-interaction/wishlist";

    //resourceEndpoint = "http://localhost:3000/wishlist"

    resourceEndpoint = "http://localhost:5175/api/v1/wishlist";

    //Token para pruebas
    authToken="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI3MjgxNjksImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiMiIsImFjIl0sImlhdCI6MTczMjEyMzM2OSwibmJmIjoxNzMyMTIzMzY5fQ.D0Qmk1O0XKs_oUpDOhS4KW5Bl_RRgiX0shfJzprEp7w";



    getAll() {
        return http.get(this.resourceEndpoint, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,  // Usamos el token directamente aquí
            },
        });
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    getUserContext() {
        return this.userContextId;
    }

    create(Resource) {
        return http.post(this.resourceEndpoint, Resource, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            },
        });
    }

    update(id, Resource) {
        return http.put(`${this.resourceEndpoint}/${id}`, Resource, {
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