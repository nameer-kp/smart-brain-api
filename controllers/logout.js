const logoutHandler = (req,res)=>{

    res.clearCookie('JWT', { path: '/' });

    console.log("logout handler called");
    res.sendStatus(200)


}
module.exports ={
    logoutHandler:logoutHandler
}