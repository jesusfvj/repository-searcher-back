import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from './routes/user.routes';
import graphQLrouter from './routes/graphql.routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/user', userRouter);
app.use('/graphql', graphQLrouter);


export default app;