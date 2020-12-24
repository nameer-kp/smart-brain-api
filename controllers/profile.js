const profieHandler =(req,res,db) =>{
    const { id } = req.params;

    console.log("getting request for ",req.params);
    db.select('name','entries').from('users').where({
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

const scoreboard = (req,res,db)=>{
    console.log("getting request for scoreboard");
    db.select('name','entries').from('users').orderBy('entries', 'desc').limit(10)
    .then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log("error from scoreboard",err);
    })
}

module.exports={
    profieHandler:profieHandler,
    scoreboard:scoreboard
}