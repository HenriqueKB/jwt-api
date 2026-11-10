require('dotenv').config();
const express = require('express');
const db = require('./config/db');

// Modelos
const User = require('./user/user.model');
const Category = require('./category/category.model');
const Author = require('./author/author.model');
const Book = require('./book/book.model');
const Reader = require('./reader/reader.model.js');
const Loan = require('./loan/loan.model');

// Relacionamentos e Associações
Category.hasMany(Book, { foreignKey: 'categoryId' });
Book.belongsTo(Category, { foreignKey: 'categoryId' });

Author.belongsToMany(Book, { through: 'BookAuthor', foreignKey: 'authorId' });
Book.belongsToMany(Author, { through: 'BookAuthor', foreignKey: 'bookId' });

Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

Reader.hasMany(Loan, { foreignKey: 'readerId' });
Loan.belongsTo(Reader, { foreignKey: 'readerId' });

User.hasMany(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });

// Express e Rotas
const app = express();
app.use(express.json());

app.use('/v1/auth', require('./auth/auth.router.js'));
app.use('/v1/category', require('./category/category.router.js'));
app.use('/v1/author', require('./author/author.router'));
app.use('/v1/book', require('./book/book.router.js'));
app.use('/v1/loan', require('./loan/loan.router.js'));
app.use('/v1/user', require('./user/user.router.js'));
app.use('/v1/reader', require('./reader/reader.router.js'));

// 4. Sincronização do Banco e Inicialização do Servidor
db.sync({ force: false })
  .then(() => {
    console.log('Banco de dados SQLite sincronizado e relacionamentos ativos!');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  })
  .catch((error) => console.error('Erro ao conectar no banco:', error));