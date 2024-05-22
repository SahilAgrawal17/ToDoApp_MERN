const router = require('express').Router()
const userControl = require('../controllers/userControl')
const auth = require('../middleware/auth')

router.post("/register", userControl.registerUser)
router.post("/login", userControl.loginUser)
router.get('/verify', userControl.verifiedToken)

module.exports = router