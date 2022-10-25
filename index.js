console.clear();
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import accountRouters from './routes/account.js';
import authRouter from './routes/auth.js';
import authSessionRouter from './routes/authSession.js';
import authTokenRouter from './routes/authToken.js';
dotenv.config();
const port = process.env.Port || 3000;
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.text());
app.use('/account', accountRouters);
app.use('/auth', authRouter);
app.use('/auth-session', authSessionRouter);
app.use('/auth-token', authTokenRouter);
app.listen(port, () => console.log(`servidor en el puerto ${port}`));
