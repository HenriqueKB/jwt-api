const {Router} = require('express');
const router = Router();
const bookController = require('./book.controller');


router.get('/:id', bookController.findById);
router.get('/name/:name', bookController.findByTitle);
router.get('/', bookController.findAll);
router.get('/year/:year', bookController.findByYear)

router.post('/', bookController.create);
router.delete('/:id', bookController.delete)
router.put('/:id', bookController.update)

module.exports = router;