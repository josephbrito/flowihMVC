import { Request, Response } from "express";
import { User } from "../db/Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/secret";
export async function createUser(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const name: string = req.body.name;

  const alreadyExist = await User.findOne({ where: { username: username } });

  if (alreadyExist) {
    res.status(401).send("User already exists, please type another username!");
    return;
  }

  if (password.length < 8) {
    res.status(401).send("Your password needs a minium of 8 characters!");
    return;
  } else if (password.search(/[A-Z]/) < 0) {
    res.status(401).send("Your password needs a upper case letter");
    return;
  } else if (password.search(/[0-9]/) < 0) {
    res.status(401).send("Your password needs a number");
    return;
  }

  try {
    const savedUser = await User.create({
      name: name,
      username: username,
      password: bcrypt.hashSync(password),
    });

    console.log(`User saved!`);
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(`Error on create user ${error}`);
    return;
  }
}

export async function readUser(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: Number(req.params.id) } });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  try {
    res.status(200).send(user.dataValues);
    return;
  } catch (error) {
    res.status(400).send("Error to read user");
    return;
  }
}

export async function updateUser(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send("user not found");
    return;
  }

  const newUsername = req.body.username;
  const newName = req.body.name;
  const oldpassword = req.body.password;
  const newPassword = req.body.new_password;

  const comparePassword = await bcrypt.compareSync(
    oldpassword,
    user.dataValues.password
  );

  if (!comparePassword) {
    res.status(400).send("Incorrect password!");
    return;
  }

  try {
    await user.update({
      name: newName,
      username: newUsername,
      password: newPassword,
    });

    const newToken = await jwt.sign(
      {
        id: user.dataValues.id,
        name: user.dataValues.name,
        username: user.dataValues.username,
        password: user.dataValues.password,
      },
      SECRET_TOKEN,
      { expiresIn: 86400 }
    );

    res.status(201).cookie("nkoe", newToken).send();
    return;
  } catch (error) {
    res.status(400).send("Error to update user");
    return;
  }
}

export async function deleteUser(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send("User not found!");
    return;
  }

  try {
    user!.destroy();
    res.status(200).send("user deleted!");
    return;
  } catch (error) {
    res.status(400).send("Error to delete user");
    return;
  }
}

export async function loginUser(req: Request, res: Response) {
  const username: string = req.body.username;
  const userExists = await User.findOne({ where: { username: username } });

  if (!userExists) {
    res.status(404).send("User or password incorrects!");
    return;
  }

  const password = req.body.password;

  const user = bcrypt.compareSync(password, userExists.dataValues.password);

  if (!user) {
    res.status(401).send("User or password incorrects!");
    return;
  }

  try {
    const token = await jwt.sign(
      {
        id: userExists.dataValues.id,
        name: userExists.dataValues.name,
        username: userExists.dataValues.username,
        password: userExists.dataValues.password,
      },
      SECRET_TOKEN,
      {
        expiresIn: 86400,
      }
    );

    res
      .status(200)
      .cookie("nkoe", token)
      .redirect("/" + userExists.dataValues.id);
  } catch (error) {
    res.status(400).send("Error on login user");
    return;
  }
}
