const { Router } = require('express');
const router = Router();
const authMiddleware = require('../auth/auth.middleware');
const loanController = require('./loan.controller.js');
// Todas as rotas estão protegidas, já que é irracional deixar empréstimos expostos

router.use(authMiddleware);

router.get('/', loanController.findAll);
router.get('/:id', loanController.findById);
router.post('/', loanController.create);
router.post('/:id/return', loanController.returnBook);

module.exports = router;