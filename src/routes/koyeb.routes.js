import express from 'express'
import { koyebGet } from '../controllers/koyeb.controller.js';

const Koyeb = express.Router();

Koyeb.get('/health', koyebGet)

export default Koyeb