import express from 'express';
import DatabaseConnection from './db';
import * as dotenv from "dotenv";
import userAuthRouter from './routers/user.routers'


dotenv.config();  // Load environment variables before using them
const app = express();

app.use(express.json());
app.use('/api', userAuthRouter)
DatabaseConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('mongodb connection failed!', err);
  });


