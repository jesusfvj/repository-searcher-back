import axios from "axios";
import { Request, Response } from 'express';
import generateJWT from "../helpers/generateJWT";
import User from "../models/User";
import { extractToken } from "../utils/checkEmptyHeader";

/** Function to get the logging user's personal access token from git hub to be able to show their information*/
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

/**Function to get the GitHub data fromm the logged user */
const getUserData = async (req: Request, res: Response) => {
  const authorization = req.get("Authorization")
  const hasAuthHeader = extractToken(authorization)
  try {
    if (hasAuthHeader) {
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          "Authorization": authorization
        }
      })
      if (response) {
        const newUser = new User({
          userData: response.data
        });

        await newUser.save();

        return res.status(200).json({
          ok: true,
          data: response.data,
        });
      } else {
        return res.status(503).json({
          ok: false,
          data: response,
        });
      }
    } else {
      const users = await User.find({});
      if (users.length > 0) {
        return res.status(200).json({
          ok: true,
          data: users[0].userData,
        });
      }
    }
  } catch (error) {
    console.log(error)
    return error
  }

}

export {
  getAccesToken,
  getUserData
}