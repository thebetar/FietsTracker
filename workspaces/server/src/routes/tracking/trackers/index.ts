import { Router } from 'express';
import TrackersRouter from './trackers';

const router = Router();

router.get('/', TrackersRouter.getTrackers);

export default router;
