const bcrypt = require('bcrypt');
const User = require('./user.model');

const userService = {
    create: async (userData) => {
        try {
            userData.password = await bcrypt.hash(userData.password, 10);
            return await User.create(userData);
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },
    findById: async (id) => {
        return await User.findByPk(id);
    },
    findByEmail: async (email) => {
        return await User.findOne({ where: { email } });
    },
    findAll: async () => {
        return await User.findAll();
    },
    update: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found!');
    },

    delete: async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found!');
    return await user.destroy();
    }
};

module.exports = userService;