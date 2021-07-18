import Configuration from "../config";
import 'regenerator-runtime/runtime'

class MovieService {
    config: Configuration = new Configuration();

    async list() {
        return fetch(this.config.BASE_URL + this.config.LIST_MOVIES, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('jwt')
            },
        }).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        });
    }

    handleResponseError(response:any) {
        throw new Error("HTTP error, status = " + response.status);
    }
}

export default MovieService;