import { Router } from 'express';
import TrackingRouter from './tracking';

const router = Router();

router.get('/coords', TrackingRouter.getCoords);

export default router;
