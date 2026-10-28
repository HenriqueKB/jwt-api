const {Router} = require('express');
const router = Router();

const categoryController = require('./category.controller');
// const  = require('../auth/auth.middleware');

router.post('/', categoryController.create);
router.get('/:id', categoryController.findById);
router.get('/email/:email', categoryController.findByName);
router.get('/', categoryController.findAll);
router.delete('/:id', categoryController.delete)
router.put('/:id', categoryController.update)

module.exports = router;