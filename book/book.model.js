const db = require('../config/db');
const { DataTypes } = require('sequelize');
const Book = db.define('Book', {
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false
    },      
    isbn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
    },  
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalCopies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableCopies: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Book;
