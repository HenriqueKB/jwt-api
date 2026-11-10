const Loan = require('./loan.model');
const Book = require('../book/book.model');
const Reader = require('../reader/reader.model');
const db = require('../config/db');

const loanService = {
  create: async ({ bookId, readerId, userId }) => {
    const activeLoans = await Loan.findAll({
      where: { readerId, status: 'ATIVO' }
    });

    if (activeLoans.length >= 3) {
      throw new Error('Leitor atingiu o limite máximo de 3 empréstimos ativos.');
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const hasOverdue = activeLoans.some(loan => loan.dueDate < todayStr);
    if (hasOverdue) {
      throw new Error('Leitor possui empréstimos atrasados e não pode realizar novos.');
    }

    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Livro não encontrado.');
    if (book.availableCopies <= 0) {
      throw new Error('Sem cópias disponíveis no momento para este livro.');
    }

    const t = await db.transaction();
    try {
      const loanDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const loan = await Loan.create({
        bookId,
        readerId,
        userId,
        loanDate: loanDate.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'ATIVO'
      }, { transaction: t });

      await book.decrement('availableCopies', { by: 1, transaction: t });

      await t.commit();
      return loan;
    } catch (error) {
      await t.rollback();
      throw new Error('Erro ao registrar empréstimo: ' + error.message);
    }
  },

  returnBook: async (loanId) => {
    const loan = await Loan.findByPk(loanId, { include: [Book] });
    if (!loan) throw new Error('Empréstimo não encontrado.');
    if (loan.status !== 'ATIVO') throw new Error('Este empréstimo já foi encerrado.');

    const t = await db.transaction();
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const today = new Date(todayStr);
      const dueDate = new Date(loan.dueDate);

      let fine = 0.00;

      if (today > dueDate) {
        const diffTime = Math.abs(today - dueDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        fine = diffDays * 1.00;
      }

      await loan.update({
        returnDate: todayStr,
        status: 'DEVOLVIDO',
        fine
      }, { transaction: t });

      await loan.Book.increment('availableCopies', { by: 1, transaction: t });

      await t.commit();
      return loan;
    } catch (error) {
      await t.rollback();
      throw new Error('Erro ao processar devolução: ' + error.message);
    }
  },

  findAll: async (filters = {}) => {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.readerId) where.readerId = filters.readerId;

    return await Loan.findAll({
      where,
      include: [Book, Reader]
    });
  },

  findById: async (id) => {
    return await Loan.findByPk(id, {
      include: [Book, Reader]
    });
  }
};

module.exports = loanService;