import express, { json } from 'express';
import routes from './routes';
import './database/connection'

const app = express();
const port = 3333;
app.use(json());
app.use(routes)

app.listen(port, () => console.log("Server is Running"));

