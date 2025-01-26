import express from 'express';
import DatabaseConnection from './db';
import * as dotenv from "dotenv";
import userAuthRouter from './routers/user.routes'
import userVerify from './middleware/userVerify';
import contentRouter from './routers/content.routes';
import linkRouter from './routers/link.routes'
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config(); 
 // Load environment variables before using them
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use('/api/v1', userAuthRouter)
app.use('/api/v1/content', userVerify, contentRouter)
app.use('/api/v1/link', userVerify, linkRouter)
DatabaseConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('mongodb connection failed!', err);
  });



