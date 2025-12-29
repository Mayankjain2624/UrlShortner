const express = require('express');
require('dotenv').config();
const app=express();
const port =3001;
const UrlRoutes=require('./routes/url');
const {connectToDB} = require('./connect.js');
connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Welcome to URL Shortener Service');
});
app.use('/urls',UrlRoutes); 
app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`);
})