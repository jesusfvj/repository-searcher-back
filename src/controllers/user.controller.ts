import axios from "axios";
import { Request, Response } from 'express';
import generateJWT from "../helpers/generateJWT";

/** Function to get the logging user personal access token from git hub to be able to show their information*/
const getAccesToken = async (req: Request, res: Response) => {
  const code = req.query.code;
  const params = `?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`

  try {
    const response = await axios.post(`https://github.com/login/oauth/access_token${params}`)

    if (!response.data.includes("error")) {
      const token = await generateJWT(response.data);
      return res.status(200).json({
        ok: true,
        data: response.data,
        token
      });
    } else {
      return res.status(503).json({
        ok: false,
        data: response.data,
      });
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

const getUserData = async (req: Request, res: Response) => {
  console.log("hola")
}


export {
  getAccesToken,
  getUserData
}