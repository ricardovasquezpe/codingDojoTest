import Configuration from "../config";
import 'regenerator-runtime/runtime'

class AuthService {
    config: Configuration = new Configuration();

    async login(email:string, password:string) {
        return fetch(this.config.BASE_URL + this.config.LOGIN, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email" : email,
                "password" : password
            })
        }).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        })
        .catch(error => {
            this.handleError(error);
        });
    }

    async register(firstname:string, lastname:string, email:string, password:string) {
        return fetch(this.config.BASE_URL + this.config.LOGIN, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "password": password
            })
        }).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        })
        .catch(error => {
            this.handleError(error);
        });
    }

    handleError(error:any) {
        console.log(error.message);
    }

    handleResponseError(response:any) {
        throw new Error("HTTP error, status = " + response.status);
    }
}

export default AuthService;