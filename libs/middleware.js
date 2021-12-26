module.exports = {
    ensureToken(req, res, next) {
        //console.log("Control de acceso");
        //const tokenBrowser = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.SmartBusSchool || req.params.token;
        if(req.cookies.tokenAdmin){
            const jwt = require('jsonwebtoken');
            let JWT_PASS_SECRET = "%%-TiendaDeRelojes-%%";
            jwt.verify(
                req.cookies.tokenAdmin, JWT_PASS_SECRET, (err, decoded) => {
                    if (!err) {
                            req.body.data = decoded;
                            next();
                    } else {
                        res.redirect('/admin/login?msg=token-error');
                    }
                }
            );
        }
        else{
            res.redirect('/admin/login?msg=token-vacio');
        }
    },
}