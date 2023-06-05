import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload, Secret} from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: string;
}

const checkJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const token = req.headers["x-token"] as string;
  const secret = process.env.TOKEN_SECRET as Secret;

  try {
    
    jwt.verify(token, secret) as TokenPayload

    next();

  } catch (error:any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        ok: false,
        data: "Token expired",
      });
    } else if (!token) {
      return res.status(401).json({
        ok: false,
        data: "Non-existent token",
      });
    }
  }
};

export default checkJWT;