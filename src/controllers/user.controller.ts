import axios from "axios";
import { Request, Response } from 'express';
import generateJWT from "../helpers/generateJWT";
import User from "../models/User";
import { retrieveAccessToken } from "../utils/stringManipulation";

/** Function to get the logging user's personal access token from git hub to be able to show their information*/
const getAccesToken = async (req: Request, res: Response): Promise<any> => {
  const login = req.get("login")
  const code = req.query.code;
  const params = `?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`
  try {

    if (login) {
      const filter = { 'userData.login': login };
      const foundUser = await User.findOne(filter)
      if (foundUser) {
        const token = await generateJWT(foundUser.id);
        return res.status(200).json({
          ok: true,
          data: foundUser,
          token: token,
        });
      }
    }

    const response = await axios.post(`https://github.com/login/oauth/access_token${params}`)

    if (!response.data.includes("error")) {
      const token = await generateJWT(response.data);
      const accessToken = retrieveAccessToken(response.data)

      const query = `query {
        viewer {
          id
          login
          avatarUrl
          bio
          company
          location
          name
          updatedAt
          url
          followers(first: 100){
            totalCount
            nodes{
              id
          login
          avatarUrl
          bio
          company
          location
          name
          updatedAt
          url
          following{
            totalCount
          }
          followers{
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
          following(first: 100){
            totalCount
            nodes{
              id
              login
              avatarUrl
              bio
              company
              location
              name
              updatedAt
              url
              following{
                totalCount
              }
              followers{
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

      const graphQLresponse = await axios.post("https://api.github.com/graphql",
        { query: query },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          },
        })

      if (graphQLresponse) {

        const filter = { 'userData.id': graphQLresponse.data.data.viewer.id };
        const foundUser = await User.findOne(filter)
        if (foundUser) {
          return res.status(200).json({
            ok: true,
            data: foundUser,
            token: token,
          });
        } else {
          const newUser = new User({
            userData: graphQLresponse.data.data.viewer,
          });
          await newUser.save();

          return res.status(200).json({
            ok: true,
            data: {
              userData: graphQLresponse.data.data.viewer,
              token: token,
            }
          });
        }
      }
    } else {
      return res.status(503).json({
        ok: false,
        data: response.data,
      });
    }
  } catch (error) {
    return error
  }
}

const getUserData = async (req: Request, res: Response): Promise<any> => {
  const login = req.get("login")
  try {
    if(login){
    const foundUser = await User.findOne({ 'userData.login': login });
    if (foundUser) {
      return res.status(200).json({
        ok: true,
        data: foundUser
      });
    }} else {
      return res.status(503).json({
        ok: false,
        data: "no user",
      });
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