const Author = require('./author.model.js');

const authorService = {
    create: async (authorData) => {
        try {
            return await Author.create(authorData);
        } catch (error) {
            throw new Error('Error creating author: ' + error.message);
        }
    },

    findById: async (id) => {
        return await Author.findByPk(id);
    },    

    findByName: async (name) => {
        return await Author.findOne({ where: { name } });
    },
    findByNationality: async (nationality) => {
        return await Author.findAll({ where: { nationality} });

    },
    findAll: async () => {
        return await Author.findAll();
    },

    update: async (id, authorData) => {
        const author = await Author.findByPk(id);
        if (!author) throw new Error('author not found!');
        
        return await author.update(authorData);
    },

    delete: async (id) => {
        const author = await Author.findByPk(id);
        if (!author) throw new Error('author not found!');
        
        return await author.destroy();
    }
};

module.exports = authorService;