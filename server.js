const express = require('express');
var bcrypt = require('bcryptjs');
const cors= require('cors')
const knex =require('knex');
const { response } = require('express');
const { entries } = require('knex/lib/query/methods');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
require('dotenv').config()
const jwt =require('jsonwebtoken')

const cookieParser = require('cookie-parser');




const app=express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 ,
  credentials: true
  // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
//initialising knex
const db =knex({
  client: 'pg',
  connection: {
  host : '127.0.0.1',
  user : 'nameer',
  password : '123456',
  database : 'smart-brain'
}
});

  db.select('*').from('users').then(data=>{
      console.log(data);
  }) 
  
  const authenticateToken =(req,res,next) =>{   //this function is for aunthenticating the jwt token
    // const authHeader =req.headers['authorization'];
    // const token =authHeader&&authHeader.split(' ')[1];
    token=req.cookies.JWT
    let result
    console.log("from auth",token);
    if(token ==null) return res.sendStatus(401);
    try{

      result =jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user=result //  if the token is valid then the req.user contain our user data

      next()
     
    }
    catch (err){
      throw new Error(err);

    }  
    
  }
  app.get('/',authenticateToken,(req,res)=>{profile.scoreboard(req,res,db)})

// //authorization
app.get('/home',authenticateToken,(req,res)=>{ // we pass authenticateToken as a middle ware for the get request
  res.json(req.user)
})



//here were handling sign in api call
app.post('/signin',signin.signinHandler(db,bcrypt,jwt)) //here we are using advanced function (ie,siginhandler returns another fucntion which receive req,res)
// here handling register api call
app.post('/register',(req,res)=>{register.registerHandler(req,res,db,bcrypt)})

// here we handling profile api call
app.get('/profile/:id',(req,res)=>{profile.profieHandler(req,res,db)})

// here we handle the image count
app.put('/image',(req,res)=>{image.imageHandler(req,res,db)})
// here we handle api call
app.put('/apiCall',(req,res)=>{image.apiHandler(req,res)})

    

// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:


app.listen(3001, ()=>{
    console.log("server is running on port ",3001);
})
