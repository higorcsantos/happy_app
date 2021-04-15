import express from 'express';
import routes from './routes';
import path from 'path'
import 'reflect-metadata';
import './database/connection'

const app = express();
const port = 3333;
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')))

app.listen(port, () => console.log(`Server is running on port ${port}`));

