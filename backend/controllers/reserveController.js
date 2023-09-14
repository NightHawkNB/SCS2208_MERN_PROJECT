const Reserve = require('../models/reserveModel')
const Books = require('../models/bookModel')
const {updateBook} = require('./bookController')

const getAllReserves = async (req, res) => {
    
    const {_id, userType} = req.user
    // console.log(_id,userType)
    if(userType === 'normal'){
        await Reserve.find({user_id:_id}).sort({createdAt:-1})
            .then((result) => {
                console.log("dedeed")
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(404).json({error: err.message})
            })
    }else if (userType !== 'normal'){
        await Reserve.find().sort({createdAt:-1})
        .then((result) => {
            // console.log("dedswswweed")

            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json({error: err.message})
        })
    }
}

const createReserve = async (req, res) => {

    const book_id = req.params.id
    const user_id = req.user._id
    const book = await Books.findOne({_id: book_id})

    await Reserve.create({book_id, title: book.title, user_id})
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

const deleteReserve = async (req, res) => {

    const book_id = req.params.id
    const user_id = req.user._id
    const book = await Books.findOne({_id: book_id})

    await Reserve.findOneAndDelete({book_id, user_id})
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
    getAllReserves,
    createReserve,
    deleteReserve
}