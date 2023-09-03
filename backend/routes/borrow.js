const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

// Controllers
const {
    getAllBorrows,
    getBorrow,
    createBorrow,
    deleteBorrow,
    updateBorrow,
} = require('../controllers/borrowController')

router.use(requireAuth)

router.get('/', getAllBorrows)

router.get('/:id', getBorrow)

router.post('/', createBorrow)

router.delete('/:id', deleteBorrow)

router.patch('/:id', updateBorrow)

module.exports = router