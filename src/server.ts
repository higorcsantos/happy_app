import express from 'express';
import 'express-async-errors';
import  router from './routes';
import path from 'path';
import 'reflect-metadata';
import './database/connection';
import  errorHandler  from './errors/handleErrors';

const app = express();
const port = 3333;
app.use(express.json());
app.use(router);
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`));

