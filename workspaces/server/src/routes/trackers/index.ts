import { Router } from 'express';
import TrackersRouter from './trackers';

const router = Router();

router.get('/', TrackersRouter.getTrackers);
router.get('/coords/:id', TrackersRouter.getTrackerCoords);
router.get('/:id', TrackersRouter.getTracker);

router.put('/:id', TrackersRouter.putTracker);

export default router;
