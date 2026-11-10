const { Router } = require('express');
const router = Router();
const readerController = require('./reader.controller');
const authMiddleware = require('../auth/auth.middleware');

// Todas as rotas de leitor necessitam de autenticação
router.use(authMiddleware);

router.get('/', readerController.findAll);
router.get('/:id', readerController.findById);
router.get('/:id/loans', readerController.getLoans);
router.post('/', readerController.create);
router.put('/:id', readerController.update);
router.delete('/:id', readerController.delete);

module.exports = router;