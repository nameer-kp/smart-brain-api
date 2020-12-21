const registerHandler = (req,res,db,bcrypt)=>{

    const {email,name,password} =req.body;
    if(!email||!name||!password){
        return res.status(400).json('check your entry field')
    }
    bcrypt.hash(password, 10).then(function(hash) {
        // Store hash in your password DB.
        db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email

        }).into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined:new Date()
                }).then(response=>{
                    res.json(response[0]);
                })                             
            }).then(trx.commit)
            .catch(trx.rollback)
        }).catch(err =>{
            res.status(401).json('already registered')
        });
    });
    

}

module.exports={
    registerHandler:registerHandler
}