const Category = require('./category.model.js');

const categoryService = {
    create: async (categoryData) => {
        try {
            return await Category.create(categoryData);
        } catch (error) {
            throw new Error('Error creating category: ' + error.message);
        }
    },
    findByName: async (name) => {
        return await Category.findByName(name);
    },
    findAll: async () => {
        return await User.findAll();
    },
    update: async (name) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found!');
    },

    delete: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found!');
    return await user.destroy();
    }
};

module.exports = categoryService;