const Category = require('./category.model.js');

const categoryService = {
    create: async (categoryData) => {
        try {
            return await Category.create(categoryData);
        } catch (error) {
            throw new Error('Error creating category: ' + error.message);
        }
    },
    findById: async (id) => {
        return await Category.findById(id);
    },    
    findByName: async (name) => {
        return await Category.findOne({ where: { name } });
    },
    findAll: async () => {
        return await Category.findAll();
    },
    update: async (id) => {
    const Category = await Category.findByPk(id);
    if (!Category) throw new Error('Category not found!');
    },

    delete: async (id) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Category not found!');
    return await Category.destroy();
    }
};

module.exports = categoryService;