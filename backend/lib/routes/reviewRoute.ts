import { ReviewController } from "../controllers/reviewController";
import {Request, Response, NextFunction} from "express";
import { check } from "express-validator";
import * as interceptor from "../utils/interceptor";

export class ReviewRoutes { 
    public reviewController: ReviewController = new ReviewController();
    
    public routes(app): void {
        app.route('/review/create').post(interceptor, [
            check('user').isLength({ min: 1, max : 20 }).withMessage('User field is not correct'),
            check('rating').isLength({ min: 1, max : 3 }).withMessage('Rating field is not correct'),
            check('review').isLength({ min: 1, max : 200 }).withMessage('Review field is not correct'),
            check('movie_id').isLength({ min: 1 }).withMessage('MovieId field is not correct'),
        ], this.reviewController.create);

        app.route('/review/list').get(interceptor, this.reviewController.list);
        app.route('/review/delete').delete(interceptor, this.reviewController.delete);
    }
}