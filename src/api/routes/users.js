const { Router } = require('express');
const tokenCheck = require('../middlewares/tokenCheck');

const router = Router();

const UserController = require('../controllers/UserController');

router.post('/users/auth', UserController.auth);

router.get('/users', tokenCheck, UserController.getAll);
router.post('/users', UserController.register);
router.put('/users/:id', tokenCheck, UserController.update);
router.delete('/users/:id', tokenCheck, UserController.delete);

module.exports = router;
