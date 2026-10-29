const {Router} = require('express');
const router = Router();
const authMiddleware = require('../auth/auth.middleware');
const categoryController = require('./category.controller');


router.get('/:id', categoryController.findById);
router.get('/name/:name', categoryController.findByName);
router.get('/', categoryController.findAll);

router.post('/', authMiddleware, categoryController.create);
router.delete('/:id', authMiddleware, categoryController.delete)
router.put('/:id', authMiddleware, categoryController.update)

module.exports = router;