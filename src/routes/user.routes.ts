import { Router } from 'express';
import { getAccesToken, getUserData } from '../controllers/user.controller';
import checkJWT from "../middlewares/checkJWT";

const userRouter = Router();

userRouter
  .get('/getAccessToken', getAccesToken)
  .get('/getUserData', checkJWT, getUserData)

export default userRouter;
