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
        });
    }

    async register(firstName:string, lastName:string, email:string, password:string) {
        return fetch(this.config.BASE_URL + this.config.REGISTER, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstname": firstName,
                "lastname": lastName,
                "email": email,
                "password": password
            })
        }).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            }
            return response.json();
        })
    }

    handleError(error:any) {
        console.log(error.message);
    }

    handleResponseError(response:any) {
        throw new Error("HTTP error, status = " + response.status);
    }
}

export default AuthService;