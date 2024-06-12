import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import { createServer } from 'node:http';
import socketIO from './sockets';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;
const server = createServer(app);

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(logger);
app.use(express.json());
app.use('/api/', globalRouter);

app.get('/', (request, response) => {
  response.send('Hello World!');
});

// Initialize Socket.IO
socketIO(server);

server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
