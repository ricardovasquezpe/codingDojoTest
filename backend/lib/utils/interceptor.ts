import { verify } from 'jsonwebtoken';
var config = require('../config/config.json');

module.exports = function(req,res,next){
    var bearerHeader = req.headers['authorization'];
    var token;
    req.authenticated = false;
    if (!bearerHeader){
        res.status(400).json(
            {
                "error"   : "JWT not valid",
            });
        return;
    }

    var bearer = bearerHeader.split(" ");
        token = bearer[1];
        verify(token, config.jwtToken, function (err, decoded){
            if (err){
                res.status(400).json(
                    {
                        "error"   : "JWT not valid",
                    });
                return;
            } else {
                req.body.jwtDecoded = decoded;
                next();
            }
        });
}