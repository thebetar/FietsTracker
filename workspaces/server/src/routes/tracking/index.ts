import { Router } from 'express';
import TrackersRouter from './trackers/index';
import TrackingRouter from './tracking';

const router = Router();

router.get('/coords', TrackingRouter.getCoords);
router.use('/trackers', TrackersRouter);

export default router;
