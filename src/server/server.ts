import express from 'express';
import routes from '../routes/routes';
import path from 'path';
import 'reflect-metadata';
import '../database/connection';
import 'express-async-errors';
import { errorHandler } from '../errors/handleErrors';

const app = express();
const port = 3333;
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`));

