import jwt from "jsonwebtoken";

export const jwtHelper = (payload: any, secret: string) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });

  return token;
};
