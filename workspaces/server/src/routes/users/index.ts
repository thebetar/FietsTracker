import { Router } from 'express';
import UsersRouter from './users';

const router = Router();

router.get('/', UsersRouter.getUsers);

export default router;
