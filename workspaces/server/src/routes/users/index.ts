import { Router } from 'express';
import UsersRouter from './users';

const router = Router();

router.get('/', UsersRouter.getUsers);
router.delete('/:id', UsersRouter.deleteUser);

export default router;
