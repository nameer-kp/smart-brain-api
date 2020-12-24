require('dotenv').config()

const signinHandler = (db,bcrypt,jwt)=>(req,res)=>{
    
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
                    if(users.length<1){
                        res.status(400).json("error login")

                    }
                    // jwt token creation
                    const accessToken =jwt.sign(users[0],process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
                    res.cookie('JWT', accessToken, {
                        maxAge: 86_400_000,
                        httpOnly: false,
                        
                        });
                    res.status(200)
                    .json(users[0]);
                    
                })
                .catch(err=>{
                    res.status(400).json("error login")
                })
            }
            
        })
    }).catch(err=>{
        res.status(400).json([])
    })

}
module.exports ={
    signinHandler:signinHandler
}