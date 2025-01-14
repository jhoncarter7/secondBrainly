import express from 'express';  
import { userSignUp } from '../controllers/user.controllers';

const router = express.Router();

router.post('/signup', userSignUp)
router.post('/signin', ()=>{})

export default router;