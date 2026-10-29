const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db');
const express = require('express');
const cors = require('cors')

const authRouter = require('./auth/auth.router.js');
const userRouter = require('./user/user.router.js');
const categoryRouter = require('./category/category.router.js')

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

db.sync()
app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO: http://localhost:${PORT}`);
});