const categoryService = require("./category.service.js");

const categoryController = {
    create: async (req, res) => {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    findById: async (req, res) => {
        try {
            const category = await categoryService.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    findByName: async (req, res) => {
        try {
            // Corrigido: passa req.params.name para o findByName do service
            const category = await categoryService.findByName(req.params.name);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    findAll: async (req, res) => {
        try {
            const categories = await categoryService.findAll();
            res.json(categories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const categoryData = req.body;
        try {
            const updatedCategory = await categoryService.update(id, categoryData);
            res.json(updatedCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },    
    delete: async (req, res) => {
        try {
            const category = await categoryService.delete(req.params.id);
            res.status(200).json({ message: 'Category deleted succesfully!'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};

module.exports = categoryController;