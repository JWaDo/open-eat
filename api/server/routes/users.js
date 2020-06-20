import express from 'express';
import UserController from '../../controllers/UserController';

const router = express.Router();

router.route('/')
  .get(UserController.get)
;

export default router;