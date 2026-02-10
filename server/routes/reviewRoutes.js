import { Router } from 'express';

const router = Router();

router.get('/reviews', (req, res) => {
  res.json({ message: 'Reviews endpoint (заглушка)' });
});

export default router;