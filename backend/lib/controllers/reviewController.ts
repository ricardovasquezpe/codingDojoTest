import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ReviewSchema } from '../models/reviewModel';
import { validationResult } from 'express-validator';

const Review = mongoose.model('Review', ReviewSchema);

export class ReviewController{

    public create(req: Request, res: Response){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.user_id = req.body.jwtDecoded._id;

        var newReview = new Review(req.body);

        newReview.save(function(err) {
            if (err){
                res.status(400).json(
                    {
                        "error"   : "Error creating the review",
                    });
                return;
            }

            res.status(201).json(
                {
                    "data": newReview
                });
            return;
        });
    }

    public list(req: Request, res: Response){
        Review.find({ 'movie_id' : req.query.movieId }, { '_id': 1, 'user':1, 'review':1, 'rating':1, 'user_id' : 1 }, {sort: {created_at: -1}}, function(err, reviews) {
            res.status(200).json(reviews);
            return;   
        });
    }

    public delete(req: Request, res: Response){
        Review.findOneAndRemove({_id: req.query.id}, null, function(err){
            if (err){
                res.status(400).json(
                    {
                        "error"   : "Error removing the review",
                    });
                return;
            }

            res.status(200).json();
            return;
        });
    }

}