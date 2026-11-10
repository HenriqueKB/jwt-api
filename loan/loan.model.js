const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Loan = db.define('Loan', {
  loanId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  loanDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('ATIVO', 'DEVOLVIDO', 'ATRASADO'),
    allowNull: false,
    defaultValue: 'ATIVO'
  },
  fine: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
});

module.exports = Loan;