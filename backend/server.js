import 'dotenv/config';
import cors from 'cors';
import express from "express";
import { PostController } from './controllers/index.js';

const serverPort = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());

// post
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.get('/tags', PostController.getLastTags);

app.listen(serverPort, () => {
  console.log('Server is running');
}).on('error', (error) => {
  return console.log(error);
});
