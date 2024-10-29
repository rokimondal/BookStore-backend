const BookModel = require('./books.model')

const postABook = async (req, res) => {
    try {
        const newBook = await BookModel({ ...req.body })
        await newBook.save()
        res.status(200).send({ message: "Book posted successfully", book: newBook })
    } catch (error) {
        console.log("error creating book", error);
        res.status(500).send("failed to post book");
    }
}

const getAllBooks = async (req, res)=>{
    try {
        const books = await BookModel.find().sort({createdAt : -1})
        res.status(200).send(books)
    } catch (error) {
        console.log("error fetching books", error);
        res.status(500).send("failed to fetch books");
    }
}

const getASingleBook = async (req, res)=>{
    try {
        const {id} = req.params;
        const sanitizedId = id.trim().replace(/^:/, '');
        const book = await BookModel.findById(sanitizedId)
        if(!book){
            return res.status(404).send("Book is not found");
        }
        res.status(200).send(book)
    } catch (error) {
        console.log("error fetching book", error);
        res.status(500).send("failed to fetch book");
    }
} 

const updateBook = async (req, res)=>{
    try {
        const {id} = req.params;
        const sanitizedId = id.trim().replace(/^:/, '');
        const updatedBook = await BookModel.findByIdAndUpdate(sanitizedId, req.body, {new: true})
        if(!updatedBook){
            return res.status(404).send("Book is not found");
        }
        res.status(200).send({message : "update Successfully", book : updatedBook})
    } catch (error) {
        console.log("error updating book", error);
        res.status(500).send("failed to update a book");
    }
}

const deleteBook = async (req, res)=>{
    try {
        const {id} = req.params;
        const sanitizedId = id.trim().replace(/^:/, '');
        const deletedBook = await BookModel.findByIdAndDelete(sanitizedId)
        if(!deletedBook){
            return res.status(404).send("Book is not found");
        }
        res.status(200).send({message : "delete Successfully", book : deletedBook})
    } catch (error) {
        console.log("error deleting book", error);
        res.status(500).send("failed to delete a book");
    }
}

module.exports = {postABook, getAllBooks, getASingleBook, updateBook, deleteBook}