const express = require('express')
const router = express.Router()

// Controllers
const {
    getAllDonations,
    createDonation,
    deleteDonation
} = require('../controllers/donationController')


router.get('/', getAllDonations)

router.post('/:id', createDonation)

router.delete('/:id', deleteDonation)

module.exports = router