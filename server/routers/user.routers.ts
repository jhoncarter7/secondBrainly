import express from 'express';  
import { userSignin, userSignUp } from '../controllers/user.controllers';

const router = express.Router();

router.post('/signup', userSignUp)
router.post('/signin', userSignin)

export default router;