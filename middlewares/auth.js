const { getSessionToken } = require('../services/auth');
function restrictToAuthenticated(req, res, next){
    const sessionToken = req.cookies.uid;
    if(!sessionToken){
        return res.render("login");
    }
    const user = getSessionToken(sessionToken);
    if(!user){
        return res.render("login");
    }
    req.user = user;
    next();
}
function checkAuth(req, res, next){
    const sessionToken = req.cookies.uid;
    if(sessionToken){
        const user = getSessionToken(sessionToken); 
        if(user){
            req.user = user;
        }
    }
    next();
}
module.exports = {restrictToAuthenticated ,checkAuth};