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


const app=express();

app.use(express.json());
app.use(cors());
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

//here were handling sign in api call
app.post('/signin',signin.signinHandler(db,bcrypt)) //here we are using advanced function (ie,siginhandler returns another fucntion which receive req,res)
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
    console.log("server is running on port 3001");
})