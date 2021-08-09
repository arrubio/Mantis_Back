var express = require('express');
var router = express.Router();
var middleware = require('../handlers/middleware');
var api = "http://172.17.0.3:80/"
const fetch = require('node-fetch');

router.post('/', middleware.checkToken, function(req, res, next) 
{

    let bod = {
        date_submitted: "1222458621",
        name: "DESARROLLOS INTERNOS"
    }

    //console.log(JSON.stringify(bod));

    fetch(api+'modelbugs',
    {
        method: 'POST',
        body: JSON.stringify(bod),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data =>
        {
            console.log("Succesfully requested");
            //var newRta = data.replace( /[\r\n]+/gm, " " );
            res.type('application/json').status(200).json
                (
                    {
                        success: true,
                        html: data
                    }
                );
            //console.log(data);
        })
    .catch(err => 
        {
            console.log(err); 
            res.type('application/json').status(500).json
                (
                    {
                        success: false,
                        message: err
                    }
                );
        });
});

module.exports = router;