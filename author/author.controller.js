const authorService = require("./author.service.js");

const authorController = {
    create: async (req, res) => {
        try {
            const author = await authorService.create(req.body);
            res.status(201).json(author);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const author = await authorService.findById(req.params.id);
            if (!author) {
                return res.status(404).json({ error: 'Author not found' });
            }
            res.json(author);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findByName: async (req, res) => {
        try {
            const author = await authorService.findByName(req.params.name);
            if (!author) {
                return res.status(404).json({ error: 'Author not found' });
            }
            res.json(author);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const authors = await authorService.findAll();
            res.json(authors);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findByNationality: async (req, res) => {
        try {
            // Corrigido: passa req.params.nationality para o serviço
            const authors = await authorService.findByNationality(req.params.nationality);
            res.json(authors);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }        
    },

    update: async (req, res) => {
        const id = req.params.id;
        const authorData = req.body;
        try {
            const updatedAuthor = await authorService.update(id, authorData);
            res.json(updatedAuthor);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    

    delete: async (req, res) => {
        try {
            await authorService.delete(req.params.id);
            res.status(200).json({ message: 'Author deleted successfully!' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = authorController;