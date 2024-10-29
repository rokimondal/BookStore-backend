const express = require('express')
const router = express.Router();
const {postABook, getAllBooks, getASingleBook, updateBook, deleteBook} = require('./book.controller')
const verifyAdminToken = require('../middlewares/verifyAdminToken')
//post a book
router.post('/create-book', verifyAdminToken, postABook)

//get all books
router.get('/', getAllBooks)

//get a single book
router.get('/:id', getASingleBook)

//update book
router.put("/edit/:id", verifyAdminToken, updateBook)

//delete book
router.delete("/:id", verifyAdminToken, deleteBook)

module.exports = router