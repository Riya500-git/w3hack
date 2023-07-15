const express = require('express')
const router = express.Router()
const xdcController = require('../controllers/xdcController.js')

//tags seen below in swagger are used to give heading to group of apis.

router.post('/mintToken', xdcController.mintToken)
router.post('/fetchProjects', xdcController.fetchProjects)

module.exports = router
