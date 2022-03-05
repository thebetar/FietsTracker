import { Router } from 'express';
import AuthRouter from './auth';

const router = Router();

router.post('/login', AuthRouter.login);
router.post('/signup', AuthRouter.signup);

export default router;
