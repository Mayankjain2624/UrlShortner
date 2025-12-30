const User=require('../models/user');
const {v4:uuidv4}=require('uuid');
const {setUsersLoggedIn}=require('../services/auth');
async function handleUserSignup(req,res){
    // signup logic here
    console.log(req.body);
    const { name ,email , password }=req.body;
    if(!name || !email || !password){
        return  res.status(400).json({error:'All fields are required'});
    }
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
async function handleUserLogin(req,res){
    const { email , password }=req.body;
    if(!email || !password){
        return  res.status(400).json({error:'All fields are required'});
    }
    try{
        const user= await User.findOne({email,password});
        if(!user){
            return res.status(401).json({error:'Invalid credentials'});
        }
        const sessionToken=uuidv4();
        setUsersLoggedIn(sessionToken,user);
        res.cookie("uid",sessionToken);
        return res.redirect('/urls');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports={handleUserSignup, handleUserLogin

};