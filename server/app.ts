import express from 'express';
import DatabaseConnection from './db';
import * as dotenv from "dotenv";
import userAuthRouter from './routers/user.routes'
import userVerify from './middleware/userVerify';
import contentRouter from './routers/content.routes';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
dotenv.config(); 
 // Load environment variables before using them
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', userAuthRouter)
app.use('/api/v1/content', userVerify, contentRouter)
DatabaseConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('mongodb connection failed!', err);
  });



