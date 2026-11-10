const Book = require('./book.model.js');

const bookService = {
    create: async (bookData) => {
        try {
            return await Book.create(bookData);
        } catch (error) {
            throw new Error('Error creating Book: ' + error.message);
        }
    },

    findById: async (isbn) => {
        return await Book.findByPk(isbn);
    },    

    findByTitle: async (title) => {
        return await Book.findOne({ where: { title } });
    },
    findByYear: async (year) => {
        return await Book.findMany({ where: {year} })

    },
    findAll: async () => {
        return await Book.findAll();
    },

    update: async (id, bookData) => {
        const book = await Book.findByPk(id);
        if (!book) throw new Error('Book not found!');
        
        return await Book.update(bookData);
    },

    delete: async (id) => {
        const book = await Book.findByPk(id);
        if (!book) throw new Error('Book not found!');
        
        return await Book.destroy();
    }
};

module.exports = BookService;