import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { PrismaClient } from '@prisma/client'

const serverPort = process.env.SERVER_PORT;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.listen(serverPort, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Express server is running');
});
