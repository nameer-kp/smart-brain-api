const profieHandler =(req,res,db) =>{
    const { id } = req.params;

    console.log("getting request for ",req.params);
    db.select('*').from('users').where({
        id:id
    }).then(user=>{
        if(user.length){ //because the user return empty array if didnt found any user
            res.json(user[0]);
            
        }
        else{
            res.status(400).json("Not Found");
        }
    })
    .catch(err =>{
        res.status(400).json("Not Found");
    })
}

module.exports={
    profieHandler:profieHandler
}