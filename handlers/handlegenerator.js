let jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

class HandleGenerator
{
    login(req, res)
    {
        //search username and password in database

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
                    
                    {username: username},
                    secret,
                    {expiresIn: '6h'}
                );
                res.send(200).json
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
                res.send(403).json
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
            res.send(403).json
            (
                {
                    success: false,
                    message: 'Authentication failed!'
                }
            );    
        }
    }
}

module.exports = HandleGenerator;