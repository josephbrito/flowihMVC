import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.admin;

  if (!token) {
    res.status(401).send("Unauthorized!");
    return;
  }

  const verify = await jwt.verify(token, "flowih");

  if (!verify) {
    res.status(401).send("Unauthorized");
    return;
  }

  next();
}
