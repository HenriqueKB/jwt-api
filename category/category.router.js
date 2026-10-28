const {Router} = require('express');
const router = Router();

const categoryController = require('./category.controller');

router.post('/', categoryController.create);
router.get('/:id', categoryController.findById);
router.get('/name/:name', categoryController.findByName);
router.get('/', categoryController.findAll);
router.delete('/:id', categoryController.delete)
router.put('/:id', categoryController.update)

module.exports = router;