const usersLoggedIn=new Map();
function setUsersLoggedIn(userId, sessionToken){
    usersLoggedIn.set(userId, sessionToken);
    return sessionToken;
}
function getSessionToken(userId){
    return usersLoggedIn.get(userId);
}
module.exports={setUsersLoggedIn,getSessionToken};