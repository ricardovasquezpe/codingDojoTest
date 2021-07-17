import { MovieController } from "../controllers/movieController";
import {Request, Response, NextFunction} from "express";
import { check } from "express-validator";
import * as interceptor from "../utils/interceptor";

export class MovieRoutes { 
    public movieController: MovieController = new MovieController();
    
    public routes(app): void {
        app.route('/movie/create').post(interceptor, [
            check('title').isLength({ min: 1, max : 20 }).withMessage('Title field is not correct')
        ], this.movieController.create);

        app.route('/movie/list').get(interceptor, this.movieController.list);
        app.route('/movie/delete').delete(interceptor, this.movieController.delete);
    }

}