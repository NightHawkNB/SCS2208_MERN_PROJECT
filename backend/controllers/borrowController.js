const Borrow = require('../models/borrowModel')
const Books = require('../models/bookModel')
const {updateBorrow} = require('./borrowController')

const getAllBorrows = async (req, res) => {
    const borrow = await Borrow.find({}).sort({createdAt:-1})
    res.status(200).json(borrow)
}

const getBorrow = async (req, res) => {
    const user_id = req.user._id
    await Borrow.find({user_id})

        .then((result) => {
            res.status(200).json(result)
        })

        .catch(err => {
            res.status(404).json({error: err.message})
        })
}

const createBorrow = async (req, res) => {
    const book_id = req.params.id
    const user_id = req.user._id
    const borrow_date = req.borrow_date;
    const duration = req.duration;
    
    const borrow = await Borrow.findOne({_id: book_id})

    const borrowing = await Borrow.create({user_id, book_id, borrow_date, duration})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable - 1}
                await updateBorrow(req, res)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update borrow failed'})
            }
        })
        .catch(() => {
            res.status(400).json({error: "Creating a Borrowing failed"})
        })
    
}

const deleteBorrow = async (req, res) => {

    const book_id = req.params.id
    const user_id = req.user._id
    const book = await Borrow.findOne({_id: user_id})
    const borrowing = await Borrow.findOneAndDelete({book_id, user_id})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable + 1}
                await updateBorrow(req, res)
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

    const book_id = req.params.id
    const user_id = req.user._id
    const book = await Books.findOne({_id: user_id})
    
    const borrowing = await Borrow.findOneAndUpdate({book_id, user_id})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable + 1}
                //await updateBorrow(req, res)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update book failed'})
            }
        })
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