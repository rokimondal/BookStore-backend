const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        landmark: {
            type: String,
            required: true
        },
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: true
            },
            quantity:{
                type:Number,
                required:true
            }
    }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        default: "Pending"
    }
}, {
    timestamps: true
})


const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;