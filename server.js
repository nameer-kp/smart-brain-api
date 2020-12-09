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

var corsOptions = {
  origin: 'https://smart-brain-frontend-nameer.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(cors(corsOptions));
//initialising knex
const db =knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

  db.select('*').from('users').then(data=>{
      console.log(data);
  }) 

  app.get('/',(req,res)=>{res.send("its working")})


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


app.listen(process.env.PORT, ()=>{
    console.log("server is running on port ",process.env.PORT);
})