const bookService = require("./book.service.js");

const bookController = {
    create: async (req, res) => {
        try {
            const book = await bookService.create(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findByIsbn: async (req, res) => {
        try {
            const book = await bookService.findByIsbn(req.params.isbn);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findByTitle: async (req, res) => {
        try {
            const book = await bookService.findByTitle(req.params.title);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const books = await bookService.findAll();
            res.json(books);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findByNationality: async (req, res) => {
        try {
            // Corrigido: passa req.params.nationality para o serviço
            const books = await bookService.findByNationality(req.params.nationality);
            res.json(books);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }        
    },

    update: async (req, res) => {
        const id = req.params.isbn;
        const bookData = req.body;
        try {
            const updatedbook = await bookService.update(id, bookData);
            res.json(updatedbook);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    

    delete: async (req, res) => {
        try {
            await bookService.delete(req.params.isbn);
            res.status(200).json({ message: 'Book deleted successfully!' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = bookController;