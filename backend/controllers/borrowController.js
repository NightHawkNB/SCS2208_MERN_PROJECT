const Borrow = require('../models/borrowModel')
const Books = require('../models/bookModel')
const {updateBook} = require('./bookController')
const {getABook} = require('./bookController')

const getAllBorrows = async (req, res) => {
    const borrow = await Borrow.find({}).sort({createdAt:-1})
    res.status(200).json(borrow)
}

const getBorrow = async (req, res) => {
    const _id = req.params
    await Borrow.findOne({_id})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json({error: err.message})
        })
}

const createBorrow = async (req, res) => {
    const book_id = req.body.book_id
    const user_id = req.body.user_id
    const duration = 2;
    
    const book = await Books.findOne({_id: book_id})

    await Borrow.create({user_id, book_id, duration})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable - 1}
                req.params.id = book_id
                await updateBook(req, res)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update book failed'})
            }
        })
        .catch(() => {
            res.status(400).json({error: "Creating a Borrowing failed"})
        })
    
}

const deleteBorrow = async (req, res) => {

    const book_id = req.body.book_id
    const user_id = req.body.user_id

    const book = await Books.findOne({_id: book_id})
    await Borrow.findOneAndDelete({book_id, user_id})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable + 1}
                req.params.id = book_id
                await updateBook(req, res)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update book failed'})
            }
        })
        .catch(() => {
            res.status(400).json({error: "Updating the available book count failed - Create Borrowing"})
        })
}

const updateBorrow = async (req, res) => {

    const book_id = req.body.id
    const user_id = req.body._id
    const book = await Books.findOne({_id: user_id})
    
    await Borrow.findOneAndUpdate({book_id, user_id}, {...req.body})
        .then((result) => res.status(200).json(result))
        .catch(() => {
            res.status(400).json({error: "Updating the available book count failed - Create Borrowing"})
        })
}

module.exports = {
    getAllBorrows,
    getBorrow,
    createBorrow,
    deleteBorrow,
    updateBorrow
}