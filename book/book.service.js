const Book = require('./book.model.js');
const Category = require('../category/category.model.js');
const Author = require('../author/author.model.js');

const bookService = {
    create: async (bookData) => {
        try {
            // Separa os IDs dos autores dos dados do livro
            const { authorIds, ...data } = bookData;
            
            // Garante que availableCopies inicie igual ao totalCopies no cadastro
            if (data.availableCopies === undefined) {
                data.availableCopies = data.totalCopies;
            }

            const book = await Book.create(data);

            // Se forem enviados IDs de autores, faz o vínculo na tabela pivô BookAuthor
            if (authorIds && authorIds.length > 0) {
                await book.setAuthors(authorIds);
            }

            return book;
        } catch (error) {
            throw new Error('Error creating Book: ' + error.message);
        }
    },

    findById: async (id) => {
        // Traz o livro junto com a Categoria e a lista de Autores
        return await Book.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: Author, as: 'authors', through: { attributes: [] } }
            ]
        });
    },    

    findByTitle: async (title) => {
        return await Book.findOne({ where: { title } });
    },

    findByYear: async (year) => {
        // Corrigido de findMany para findAll
        return await Book.findAll({ where: { year } });
    },

    findAll: async (filters = {}) => {
        const where = {};

        if (filters.categoryId) {
            where.categoryId = filters.categoryId;
        }

        return await Book.findAll({
            where,
            include: [
                { model: Category, as: 'category' },
                { model: Author, as: 'authors', through: { attributes: [] } }
            ]
        });
    },
    
    update: async (id, bookData) => {
        const book = await Book.findByPk(id);
        if (!book) throw new Error('Book not found!');
        
        const { authorIds, ...data } = bookData;
        
        // Corrigido: chama update na instância 'book'
        await book.update(data);

        // Se passar novos autores na atualização, reatribui a lista
        if (authorIds) {
            await book.setAuthors(authorIds);
        }

        return book;
    },

    delete: async (id) => {
        const book = await Book.findByPk(id);
        if (!book) throw new Error('Book not found!');
        
        // Corrigido: chama destroy na instância 'book'
        return await book.destroy();
    }
};

module.exports = bookService;