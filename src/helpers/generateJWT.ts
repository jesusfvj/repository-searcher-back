import jwt, {Secret} from "jsonwebtoken";

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET as Secret,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;
