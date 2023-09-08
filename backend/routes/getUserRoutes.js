const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

// Controllers
const {getUserDetails} = require('../controllers/getUserController')

router.use(requireAuth)

router.get('/:id', getUserDetails);

module.exports = router