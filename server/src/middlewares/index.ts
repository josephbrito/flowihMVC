import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/secret";

interface IUserToken {
  id: number;
  username: string;
  password: string;
  iat: number;
  exp: number;
}

export async function verifyHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.nkoe;

  if (!token) {
    res.status(401).send("Unauthorized!");
    return;
  }

  try {
    const user: IUserToken | any = await jwt.verify(token, SECRET_TOKEN);

    if (!user) {
      res.status(401).send("Unauthorized!");
      return;
    }

    if (!(user.id == req.params.id)) {
      res.status(401).send("You don't have authorized!");
      return;
    }

    next();
  } catch (error) {
    res.status(401).send("unauthorized");
    return;
  }
}
