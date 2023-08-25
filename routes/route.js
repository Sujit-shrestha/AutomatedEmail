const router = require('express').Router();
const {signup , getBill} = require('../CONTROLLER/appController.js')
//http Requests

router.post('/user/signup' , signup )
router.post('/product/getBill' , getBill);

module.exports = router;