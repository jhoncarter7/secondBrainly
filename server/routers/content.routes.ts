import express from 'express';
import { createContent, deleteContent, getContent } from '../controllers/content.controller';


const router = express.Router();

router.get('/getContent',  getContent)
router.delete('/delete/:id', deleteContent)
router.post('/create', createContent)

export default router;