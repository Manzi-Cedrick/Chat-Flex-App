const express = require('express');
const router = express.Router();
const protectServer = require('../middleware/ProtectionMiddle');
const {accessChat , fetchChats,createGroupChat,renameGroup,addGroup,removeGroup} = require('../controllers/chatControllers')
router.route('/').post(protectServer,accessChat);
router.route('/').get(protectServer,fetchChats);
router.route('/group').post(protectServer,createGroupChat);
router.route('/grouprename').put(protectServer,renameGroup);
router.route('/groupadd').put(protectServer,addGroup);
router.route('/groupremove').put(protectServer,removeGroup);
module.exports = router;