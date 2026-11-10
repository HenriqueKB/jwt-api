const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db');
const express = require('express');
const cors = require('cors')

const Category = require('../category/category.model');
const Author = require('../author/author.model');
const Book = require('../book/book.model');

const authRouter = require('./auth/auth.router.js');
const userRouter = require('./user/user.router.js');
const categoryRouter = require('./category/category.router.js')
const authorRouter = require('./author/author.router.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.use('/v1/category', categoryRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/user', userRouter);
app.use('/v1/author', authorRouter);
db.sync()
app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO: http://localhost:${PORT}`);
});


// 1. Relacionamento 1:N (Category <-> Book)
Category.hasMany(Book, { foreignKey: 'categoryId' });
Book.belongsTo(Category, { foreignKey: 'categoryId' });

// 2. Relacionamento N:N (Author <-> Book via BookAuthor)
Author.belongsToMany(Book, { through: 'BookAuthor', foreignKey: 'authorId' });
Book.belongsToMany(Author, { through: 'BookAuthor', foreignKey: 'bookId' });