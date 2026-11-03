const { Router } = require('express');
const router = Router();
const authMiddleware = require('../auth/auth.middleware');
const authorController = require('./author.controller');


router.get('/:id', authorController.findById);
router.get('/name/:name', authorController.findByName);
router.get('/', authorController.findAll);
router.get('/nationality/:nationality', authorController.findByNationality)

router.post('/', authMiddleware, authorController.create);
router.delete('/:id', authMiddleware, authorController.delete)
router.put('/:id', authMiddleware, authorController.update)

module.exports = router;