import express from 'express';
import { generateQuizFromText } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/generate-quiz
router.post('/generate-quiz', generateQuizFromText);

export default router;
