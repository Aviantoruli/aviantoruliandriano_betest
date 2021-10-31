const router = require('express').Router()
const UserController = require('../controller/userController')
const { authe } = require('../middleware/oauth')

router.get('/token', UserController.tokenGenerate)

router.post('/create', UserController.create)

router.get('/users', UserController.findAll)

router.get('/user', UserController.findOne)

router.delete('/delete', authe, UserController.delete)

router.patch('/update', authe, UserController.update)

module.exports = router