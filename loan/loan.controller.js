const loanService = require("./loan.service.js");

const loanController = {
    create: async (req, res) => {
        try {
            // Combina os dados enviados no req.body (bookId, readerId) com o ID do atendente logado
            // Um relacionamento!
            const loanData = {
                ...req.body,
                userId: req.user.id 
                
            };

            const loan = await loanService.create(loanData);
            res.status(201).json(loan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    returnBook: async (req, res) => {
        try {

            const loan = await loanService.returnBook(req.params.id);
            res.json(loan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const loan = await loanService.findById(req.params.id);
            if (!loan) {
                return res.status(404).json({ error: 'Loan not found' });
            }
            res.json(loan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            
            const loans = await loanService.findAll(req.query);
            res.json(loans);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = loanController;