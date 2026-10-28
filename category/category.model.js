const db = require('../config/db');
const { DataTypes } = require('sequelize');
const Category = db.define('Category', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
    },  
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
});

module.exports = Category;
