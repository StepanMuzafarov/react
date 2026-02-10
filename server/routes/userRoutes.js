import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
  res.json({ message: 'Users endpoint (заглушка)' });
});

export default router;