import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
const User = mongoose.model('User', UserSchema);

export class AuthController{

    public register(req: Request, res: Response){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        var newUser = new User(req.body);

        newUser.save(function(err) {
            if (err){
                res.status(400).json(
                    {
                        "error"   : "Error creating the user, check the email",
                    });
                return;
            }

            var token = sign(newUser.toJSON(), "123456789", { expiresIn : '24h' });
            res.status(201).json(
                {
                    "jwt": token
                });
            return;
        });
    }

    public login (req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        User.findOne({ email : req.body.email, 'password': req.body.password}, { '_id': 1 }, null, function(err, user) {
            if(!user){
                res.status(400).json({
                    "data"   : 'User not found'
                });
                return;
            }
      
            var token = sign(user.toJSON(), "123456789", { expiresIn : '24h' });
            res.status(200).json({
               "jwt"  : token
            });
            return;
          });
    }

}