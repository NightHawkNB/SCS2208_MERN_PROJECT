const express = require('express')
const router=express.Router()
const {
    getAllFines,
    getFinesAid,
    createFines,
    deleteFines
}=require('../controllers/finesController')

//get all fines
router.get('/', getAllFines)

//get fines for specific borrow id
router.get('/boroow_id',getFinesAid)

//POST new fines
router.post('/',createFines)

//delete fines
router.delete('/:borrow_id',deleteFines)


module.exports=router