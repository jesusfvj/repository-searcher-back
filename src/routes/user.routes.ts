import { Router } from 'express';
import { getAccesToken, getUserData } from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .get('/getAccessToken', getAccesToken)
  .get('/getUserData', getUserData)

export default userRouter;
