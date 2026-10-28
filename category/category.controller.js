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
            const category = await categoryService.findByEmail(req.params.email);
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
            const category = await categoryService.findAll();
            res.json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const category = req.body;
        try {
            const updatedCategory = await categoryService.update(id, category);
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