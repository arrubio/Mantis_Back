var express = require('express');
var router = express.Router();
var handler = require('../handlers/handlegenerator');
let jwt = require('jsonwebtoken');
var config = process.env.SECRET;

/* GET home page. */
router.post('/', function(req, res, next) 
{
    //search user and return a token if succ

    //this is a test for the jwt. I will do a proper database later
    let username = req.body.email;
    let password = req.body.password;

        let tempUser = 'admin@admin.com';
        let tempPassword = 'password';

        if(username && password)
        {
            if(username === tempUser && password === tempPassword)
            {
                let token = jwt.sign
                (   
                    {username: username, name: username},
                    config,
                    {expiresIn: '6h'}
                );
                res.type('application/json').status(200).json
                (
                    {
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    }
                );
            }
            else
            {
                //credentials are not registered or wrong
                res.type('application/json').status(403).json
                (
                    {
                        success: false,
                        message: 'Incorrect username or password'
                    }
                );
            }
        }
        else
        {
            //credentials are not valid
            res.type('application/json').status(403).json
            (
                {
                    success: false,
                    message: 'Authentication failed!'
                }
            );    
        }
});

module.exports = router;