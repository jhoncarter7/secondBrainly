import express from 'express';
import { generateShareLink, shareableLink } from '../controllers/link.controller';

const router = express.Router();

router.post("/share", generateShareLink);
router.post("/:shareId", shareableLink);

export default router;
