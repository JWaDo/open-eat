import express from 'express';
import UserController from '../../controllers/UserController';
import JWT from '../../services/jwt';

const router = express.Router();

router.route('/')
  .get(JWT.grantedType('admin'), UserController.get);

router.route('/register')
  .post(UserController.register);

router.route('/login')
  .post(UserController.login);

router.route('/:id')
  .put(UserController.put)
;

export default router;