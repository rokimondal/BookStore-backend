const express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('./user.model')
const bcrypt = require('bcrypt');
const verifyAdminToken = require('../middlewares/verifyAdminToken')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post('/admin', async (req, res)=>{
    try {
        const {username, password}=req.body;
        const admin = await UserModel.findOne({username});
        if(!admin){
            return res.status(404).send("Admin not found");
        }
        bcrypt.compare(password,admin.password,(err,result)=>{
            if(err){
                console.log(err);
            }
            if(!result){
                return res.status(401).send("Invalid Password");
            }
        })
        const token = jwt.sign({id:admin._id, username:admin.username, role: admin.role},JWT_SECRET,{expiresIn: "1h"});
        res.send({
            message:"Authentication Successful",
            token,
            user:{
                username:admin.username,
                role:admin.role
            }
        })
    } catch (error) {
        console.log("failed to login as admin", error),
        res.status(401).send({message:"failed to login as admin"})
    }

})
// async function createUser() {
//     try {
//         const hashedPassword = await bcrypt.hash('admin9876', 10); // Hash the password
//         const usr = new UserModel({ username: 'Admin', password: hashedPassword, role: 'admin' }); // Ensure role is set
//         await usr.save();
//         console.log("User created:", usr);
//     } catch (error) {
//         console.error("Error creating user:", error);
//     }
// }
// createUser();

module.exports = router;