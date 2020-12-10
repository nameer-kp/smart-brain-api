const signinHandler = (db,bcrypt)=>(req,res)=>{
    
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data =>{
        
        bcrypt.compare(req.body.password, data[0].hash, function(err, result) {  //this method checks the entered password
            // result == true
            if(result){
                return db('users')
                .where('email','=',req.body.email)
                .then(users=>{
                    console.log(users);
                    res.json(users[0])
                })
                .catch(err=>{
                    res.status(400).json("error login")
                })
            }
            else{
                res.json('error login')
            }
        })
    }).catch(err=>{
        res.status(400).json([])
    })

}
module.exports ={
    signinHandler:signinHandler
}