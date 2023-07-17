const {getAvailableBooks}=require('../controllers/bookController')

const express = require('express')
const router=express.Router()


//getAvailableBooks
router.get('/available',getAvailableBooks)

module.exports=router