import { Router } from 'express';
import { getUserData } from '../controllers/graphql.controller';
import checkJWT from "../middlewares/checkJWT";

const graphQLrouter = Router();

graphQLrouter
  .get('/getUserData', checkJWT, getUserData)

export default graphQLrouter;
