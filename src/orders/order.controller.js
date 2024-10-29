const OrderModel = require("./order.model")

const createAOrder = async (req, res) => {
    try {
        newOrder = await OrderModel({ ...req.body });
        await newOrder.save();
        res.status(200).send({ message: "Order created successfully", order: newOrder })
    } catch (error) {
        console.log("error creating order", error);
        res.status(500).send("failed to create order");
    }
}

const getOrderByEmail = async (req,res)=>{
    try {
        const {email}=req.params;
        const orders = await OrderModel.find({email}).sort({createdAt : -1});
        if(orders.length === 0){
            return res.status(404).send("Orders not found")
        }
        res.status(200).send(orders)
    } catch (error) {
        console.log("error fetching orders", error);
        res.status(500).send("failed to fetch orders");
    }
}
module.exports = { createAOrder, getOrderByEmail}