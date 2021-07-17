import {Request, Response, NextFunction} from "express";
import { AuthController } from "../controllers/authController";
import { check } from "express-validator";
import { verify } from 'jsonwebtoken';
import { CustomValidators } from "../utils/customValidators";

export class AuthRoutes { 
    public authController: AuthController = new AuthController() ;
    public customValidators: CustomValidators = new CustomValidators();
    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'API Working Correctly now'
            })
        });

        app.route('/auth/register').post([
            check('firstname').isLength({ min: 1, max : 20 }).withMessage('Firstname field is not correct'),
            check('lastname').isLength({ min: 1, max : 20 }).withMessage('Lastname field is not correct'),
            check('email').isLength({ min: 1 }).isEmail().withMessage('Email field is not correct'),
            check('password').isLength({ min: 6, max : 20 }).withMessage('Password field is not correct')
        ], this.authController.register);

        app.route('/auth/login').post([
            check('email').isLength({ min: 1 }).withMessage('email field is required'),
            check('password').isLength({ min: 1 }).withMessage('Password field is required')
          ], this.authController.login);
    }
}