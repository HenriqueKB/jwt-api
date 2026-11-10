const Category = require('./category.model.js');

const categoryService = {
    create: async (categoryData) => {
        try {
            return await Category.create(categoryData);
        } catch (error) {
            throw new Error('Error creating category: ' + error.message);
        }
    },

    findById: async (categoryId) => {
        return await Category.findByPk(categoryId);
    },    

    findByName: async (name) => {
        return await Category.findOne({ where: { name } });
    },

    findAll: async () => {
        return await Category.findAll();
    },

    update: async (categoryId, categoryData) => {
        const category = await Category.findByPk(categoryId);
        if (!category) throw new Error('Category not found!');
        
        return await category.update(categoryData);
    },

    delete: async (categoryId) => {
        const category = await Category.findByPk(categoryId);
        if (!category) throw new Error('Category not found!');
        
        return await category.destroy();
    }
};

module.exports = categoryService;