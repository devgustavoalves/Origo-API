import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getUsers, registerUser } from './controllers/userController.js';
import { createProperty, getProperties } from './controllers/propertyController.js';
import { get } from 'node:http';

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());


app.post('/register', registerUser)
app.get('/users', getUsers)


app.post('/properties', createProperty)
app.get('/properties', getProperties)


app.get('/', (req, res) => {
  res.send('Origo API Rodando! 🚀');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});