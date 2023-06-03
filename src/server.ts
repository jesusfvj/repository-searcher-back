import express from "express";
import cors from "cors";
import helmet from "helmet";
/* const bodyParser = require("body-parser");
fetch-node*/


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* app.use(bodyParser.json()); */
app.use(helmet());
app.use(cors());


export default app;