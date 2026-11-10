const { Router } = require('express');
const router = Router();
const authMiddleware = require('../auth/auth.middleware');
const bookController = require('./book.controller');

// Rotas Públicas (Leitura)
// O GET '/' vai responder tanto a listagem normal quanto buscas com filtro (?categoryId=X ou ?search=termo)
router.get('/', bookController.findAll);
router.get('/:Id', bookController.findById);

// Rotas Protegidas (Escrita e Alteração por atendentes/admins)
router.post('/', authMiddleware, bookController.create);
router.put('/:id', authMiddleware, bookController.update);
router.delete('/:id', authMiddleware, bookController.delete);

module.exports = router;