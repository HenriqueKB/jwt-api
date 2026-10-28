const {Router} = require('express');
const router = Router();

const categoryController = require('./category.controller');
const authMiddleware = require('../auth/auth.middleware');

router.post('/', userController.create);
router.get('/:id', authMiddleware, userController.findById);
router.get('/email/:email', authMiddleware, userController.findByEmail);
router.get('/', authMiddleware, userController.findAll);
router.delete('/:id', authMiddleware, userController.delete)
router.put('/:id', authMiddleware, userController.update)
module.exports = router;