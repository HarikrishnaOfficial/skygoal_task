const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', UserController.register);
router.post('/login', UserController.login);


router.get('/users',authMiddleware,UserController.getAllUsers);



module.exports = router;
