import axios from "axios";
import { Request, Response } from 'express';
import User from "../models/User";
import { extractToken } from "../utils/checkEmptyHeader";

const getUserData = async (req: Request, res: Response) => {
  const authorization = req.get("Authorization")
  const hasAuthHeader = extractToken(authorization)
  try {
    if (hasAuthHeader) {
      const query = `query {
        viewer {
          login
          avatarUrl
          bio
          company
          location
          name
          updatedAt
          url
          websiteUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 100) {
            totalCount
            nodes {
              name
              description
              isPrivate
              url
              createdAt
              updatedAt
              diskUsage
              primaryLanguage {
                name
              }
              stargazerCount
              forkCount
            }
          }
        }
      }
      `
      
      const response = await axios.post("https://api.github.com/graphql",
        {query: query},
        {headers: {
          "Authorization": authorization
        },
      })
      if (response) {
        /**If an user exits, then delete it. Only one user at a time will be storage */
        const existingUser = await User.findOne({});

        if (existingUser) {
          await User.deleteMany({});
        }

        const newUser = new User({
          userData: response.data.data.viewer
        });

        await newUser.save();

        return res.status(200).json({
          ok: true,
          data: newUser.userData,
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
  getUserData
}