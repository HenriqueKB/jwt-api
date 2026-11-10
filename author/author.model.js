const db = require('../config/db');
const { DataTypes } = require('sequelize');
const Author = db.define('Author', {
    authorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
    },  
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: true
    }
    
});

module.exports = Author;
