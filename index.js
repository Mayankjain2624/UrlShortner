const express = require('express');
require('dotenv').config();
const app=express();
const port =3001;
const UrlRoutes=require('./routes/url');
const UserRoutes=require('./routes/user');
const path=require('path');
const staticRoutes=require('./routes/staticRoutes');
const cookieParser = require('cookie-parser');
const {connectToDB} = require('./connect.js');
const {restrictToAuthenticated , checkAuth} = require('./middlewares/auth.js');
connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.get('/test',(req,res)=>{
    res.render("home");
});
// app.get('/',(req,res)=>{
//     res.send('Welcome to URL Shortener Service');
// });
app.use('/',checkAuth,staticRoutes);
app.use('/urls',restrictToAuthenticated, UrlRoutes); 
app.use('/users',UserRoutes);
app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`);
})