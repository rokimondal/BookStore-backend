const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).send("Access denied. No token provided")
    }
    jwt.verify(token, JWT_SECRET, (err, user)=>{
        if(err){
            console.log("Please login");
            
            return res.status(403).send({message: "Invalid credentials"})
        }
        req.user=user;
        next();
    })
}

module.exports = verifyAdminToken;