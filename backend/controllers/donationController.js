const Donate = require('../models/donationModel')
const Books = require('../models/bookModel')
const {updateBook} = require('./bookController')

const getAllDonations = async (req, res) => {

    const user_id = req.user._id

    await Donate.find({user_id}).sort({createdAt:-1})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json({error: err.message})
        })
}

const createDonation = async (req, res) => {

    const book_id = req.params.id
    const user_id = req.user._id
    const book = await Books.findOne({_id: book_id})

    const reservation = await Reserve.create({book_id, title: book.title, user_id})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable - 1}
                await updateBook(req, res)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update book failed'})
            }
        })
        .catch(() => {
            res.status(400).json({error: "Creating a reservation failed"})
        })

    
}

const deleteDonation = async (req, res) => {

    const book_id = req.params.id
    const user_id = req.user._id
    const book = await Books.findOne({_id: book_id})

    const reservation = await Donate.findOneAndDelete({book_id, user_id})
        .then(async () => {
            try {
                req.body = {nAvailable: book.nAvailable + 1}
                await updateBook(req, res)
            } catch (error) {
                console.log(error)
                res.status(400).json({error: 'Update book failed'})
            }
        })
        .catch(() => {
            res.status(400).json({error: "Updating the available book count failed - Create Reservation"})
        })
}

module.exports = {
    getAllDonations,
    createDonation,
    deleteDonation
}