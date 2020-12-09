const Clarifai = require('clarifai')
const { response } = require('express')

const app = new Clarifai.App({
  apiKey:'588fbe9a305a4bc1881b25df1f0052b2'
})
const apiHandler =(req,res)=>{
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.imageUrl)
  .then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(400).json('api error')
  })
}


const imageHandler =(req,res,db) =>{
    const { id } = req.body;
    console.log("getting request for ",req.body);
    db('users').where('id', '=', id)
  .increment({
    entries:1
  }).returning('entries')
  .then(entries=>{
      console.log(entries);
      res.json(entries[0])
  }).catch(err=>{
      res.status(400).json("entry updation failed")
  })
}

module.exports={
    imageHandler:imageHandler,
    apiHandler:apiHandler
}