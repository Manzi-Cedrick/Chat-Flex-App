const router= require('express').Router()
const protectServer = require('../middleware/ProtectionMiddle');
const {sendMessage,getAllMessages} = require('../controllers/MessageControllers')
router.route('/sendMessage').post(protectServer,sendMessage)
router.route('/:id').get(protectServer,getAllMessages)
module.exports = router