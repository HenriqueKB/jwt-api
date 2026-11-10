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

    findById: async (req, res) => {
        try {
            const book = await bookService.findById(req.params.id);
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
            // Captura req.query para permitir filtros como ?categoryId=2 ou ?search=termo
            const books = await bookService.findAll(req.query);
            res.json(books);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const id = req.params.id;
        const bookData = req.body;
        try {
            const updatedBook = await bookService.update(id, bookData);
            res.json(updatedBook);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    

    delete: async (req, res) => {
        try {
            await bookService.delete(req.params.id);
            res.status(200).json({ message: 'Book deleted successfully!' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = bookController;