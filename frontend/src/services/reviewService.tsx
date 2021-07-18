import Configuration from "../config";
import 'regenerator-runtime/runtime'

class ReviewService {
    config: Configuration = new Configuration();

    async list(movieId: String) {
        return fetch(this.config.BASE_URL + this.config.LIST_REVIEWS + "?movieId=" + movieId, {
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

    async create(user:string, rating:number, review:string, movieId:string) {
        return fetch(this.config.BASE_URL + this.config.CREATE_REVIEW, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                "user": user,
                "rating": rating,
                "review": review,
                "movie_id": movieId
            })
        }).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        })
    }

    async delete(reviewId: String) {
        return fetch(this.config.BASE_URL + this.config.DELETE_REVIEW + "?id=" + reviewId, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('jwt')
            },
        }).then(response => {
            return {};
        });
    }

    handleResponseError(response:any) {
        throw new Error("HTTP error, status = " + response.status);
    }
}

export default ReviewService;