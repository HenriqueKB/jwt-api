const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const LogoutList = require('./logoutList.model');

// Fallback para garantir que a chave secreta nunca fique undefined em dev
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao_dev_123';

const authService = {
    login: async (email, password) => {
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new Error('Email ou senha inválidos');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Email ou senha inválidos');
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return { token };
    },

    logout: async (token) => {
        await LogoutList.create({ token });
    },

    verifyToken: async (token) => {
        const isBlacklisted = await LogoutList.findOne({ where: { token } });
        if (isBlacklisted) {
            throw new Error('Token revogado');
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Token inválido ou expirado');
        }
    }
};

module.exports = authService;