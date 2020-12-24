const authenticateToken =(from,jwt,db)=>async (req,res,next) =>{   //this function is for aunthenticating the jwt token
    // const authHeader =req.headers['authorization'];
    // const token =authHeader&&authHeader.split(' ')[1];
    token=req.cookies.JWT
    let result
    console.log("from auth",token);
    if(token ==null) return res.sendStatus(401);
    try{

      result =jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user=  await db('users').where('email','=',result['email'])
        console.log(user);
        if(from==="/home")
            {res.json(user[0])
            }
            
      //  if the token is valid then the req.user contain our user data
      
      next()
     
    }
    catch (err){
      throw new Error(err);

    }  
    
  }
  module.exports ={
    authenticateToken:authenticateToken
}