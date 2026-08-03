import express from 'express';
import { getExample } from '../controllers/exampleController.js';

const router = express.Router();

router.route('/').get(getExample);

export default router;
