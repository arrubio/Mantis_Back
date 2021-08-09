let jwt = require('jsonwebtoken');
var config = process.env.SECRET;

let checkToken = (req, res, next) =>
{
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token)
    {
        if(token.startsWith('Bearer'))
        {
            token = token.slice(7, token.length);

            jwt.verify(token, config, (err, decoded) =>
            {
                if(err)
                {
                    return res.json(
                        {
                            success: false,
                            message: 'Token is not valid'
                        }
                    );
                }
                else
                {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    }
    else
    {
        return res.json
        (
            {
                success: false,
                message: 'Auth Token is not supplied'
            }
        );
    }
};

module.exports = 
{
    checkToken: checkToken
}