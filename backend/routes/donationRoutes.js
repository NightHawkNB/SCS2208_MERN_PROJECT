const express = require('express')
const router = express.Router()

// Controllers
const {
    getAllReserves,
    createReserve,
    deleteReserve
} = require('../controllers/donationController')


router.get('/', getAllDonations)

router.post('/:id', createDonation)

router.delete('/:id', deleteDonation)

module.exports = router