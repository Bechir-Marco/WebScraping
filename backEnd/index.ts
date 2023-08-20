import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Express = express();

dotenv.config();
app.use(cors());
app.options('*', cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

//Routes
const jumiaRoutes = require('./routes/jumia');
const tunisianetRoutes = require('./routes/tunisianet');
const mytekRoutes = require('./routes/mytek');
const alkitabRoutes = require('./routes/alkitab');

app.use(express.json());

const port = process.env.PORT;
const dbURI = process.env.CONNECTION_STRING;
// Check if api is defined before connecting to MongoDB
if (dbURI) {
  // Database Connection
  mongoose
    .connect(dbURI, {
      dbName: 'dotIt',
    })
    .then(() => {
      console.log('Database Connection is ready dotIt...');
    })
    .catch((err) => {
      console.error('Database Connection Error:', err);
    });
} else {
  console.error('MongoDB connection URI is not defined.');
}


app.use(`/alkitab`, alkitabRoutes);
app.use(`/jumia`, jumiaRoutes);
app.use(`/mytek`, mytekRoutes);
app.use(`/tunisianet`, tunisianetRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is runnnnning at http://localhost:${port}`);
});
