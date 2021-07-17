import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { MovieSchema } from '../models/movieModel';
import { validationResult } from 'express-validator';

const Movie = mongoose.model('Movie', MovieSchema);

export class MovieController{
    public create(req: Request, res: Response){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.user_id = req.body.jwtDecoded._id;

        var newMovie = new Movie(req.body);

        newMovie.save(function(err) {
            if (err){
                res.status(400).json(
                    {
                        "error"   : "Error creating the movie",
                    });
                return;
            }

            res.status(201).json(
                {
                    "data": newMovie
                });
            return;
        });

    }

    public list(req: Request, res: Response){
        Movie.find({ }, { '_id': 1, 'title':1 }, {sort: {created_at: -1}}, function(err, movies) {
            res.status(200).json(movies);
            return;   
        });
    }

    public delete(req: Request, res: Response){
        Movie.findOneAndRemove({_id: req.query.id}, null, function(err){
            if (err){
                res.status(400).json(
                    {
                        "error"   : "Error removing the movie",
                    });
                return;
            }

            res.status(200).json();
            return;
        });
    }
}