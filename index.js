console.clear();
import express from 'express';
import dotenv from 'dotenv';
import routers from './routes/account.js';
dotenv.config();
const port = process.env.Port || 3000;
const app = express();
app.use(express.json());
app.use(express.text());
app.use('/account',routers);
app.get('/raiz',(req,res)=>{
  res.send()
})
app.listen(port, () => console.log(`servidor en el puerto ${port}`));
