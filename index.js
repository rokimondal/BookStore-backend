//import packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//import files
require('dotenv').config();

//import router
const bookRouter = require('./src/books/book.route')
const orderRouter = require('./src/orders/order.route')
const userRouter = require('./src/users/user.route')
const adminRouter = require('./src/stats/admin.stats')

//initialise import
const app = express();
const port = process.env.PORT || 5001

//middlewares
app.use(express.json());
app.use(cors({
    origin : ['http://localhost:5173', 'https://book-store-frontend-gules.vercel.app'],
    credentials : true,
}))
app.use('/',(req,res)=>{
    res.send("Book server is running successfully.")
})
//routes
app.use('/api/books', bookRouter)
app.use('/api/orders', orderRouter)
app.use('/api/auth', userRouter)
app.use('/api/admin', adminRouter)



//database
async function main(){
    await mongoose.connect(process.env.DB_URL);
}
main().then(()=>console.log("Mongodb connect successfully")).catch(err=>console.log(err))



app.listen(port, ()=>{
    console.log(`App listening on port ${port} \nHere is the link http://localhost:${port}/`);
})