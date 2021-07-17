import * as express from "express";
import * as bodyParser from "body-parser";
import { AuthRoutes } from "./routes/authRoute";
import * as mongoose from "mongoose";
import { MovieRoutes } from "./routes/movieRoute";
import { ReviewRoutes } from "./routes/reviewRoute";

class App {

    public app: express.Application = express();
    public routePrv: AuthRoutes = new AuthRoutes();
    public routeMovie: MovieRoutes = new MovieRoutes();
    public routeReview: ReviewRoutes = new ReviewRoutes();
    public mongoUrl: string = 'mongodb+srv://admin:1029@mycluster.mepav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);  
        this.routeMovie.routes(this.app); 
        this.routeReview.routes(this.app);   
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        //this.app.set('superSecret', '1029384756');
    }

    private mongoSetup(): void{
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

}

export default new App().app;