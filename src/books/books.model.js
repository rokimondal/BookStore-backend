const mongoose=require('mongoose')
const bookSchema = mongoose.Schema({
    ISBN:{
        type: String,
        required: true
    },title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now(),
    }
},{
    timestamps : true,
})
const bookModel = mongoose.model('Book',bookSchema);
module.exports = bookModel;