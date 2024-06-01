import { Router } from 'express';
let router = Router();


router.get('/', function(req, res, next) {
  res.send('get called')
});

export default router;
