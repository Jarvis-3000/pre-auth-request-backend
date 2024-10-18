import { Router } from 'express';
import {
  signupProvider,
  signinProvider,
} from '../controllers/auth';

const router = Router();

router.post('/signup', signupProvider);  // Creates a new provider
router.post('/signin', signinProvider); 

export default router;
