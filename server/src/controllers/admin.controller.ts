import { Request, Response } from "express";
import { User } from "../db/Models/User";
import { Post } from "../db/Models/Post";
import jwt from "jsonwebtoken";

export async function adminLogin(req: Request, res: Response) {
  const admin_username = req.body.admin_username;
  const admin_password = req.body.admin_password;
  try {
    if (admin_username == "flowih" && admin_password == "admin") {
      const token = await jwt.sign(
        { admin_username, admin_password },
        "flowih",
        { expiresIn: 600 }
      );

      res.status(201).cookie("admin", token).send("logged");
      return;
    }
    res.status(401).send("Unauthorized!");
    return;
  } catch (error) {
    res.status(400).send("Error to log in admin");
    return;
  }
}

export async function createUser(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const name: string = req.body.name;

  const alreadyExist = await User.findOne({ where: { username: username } });

  if (alreadyExist) {
    res.status(401).send("User already exists, please type another username!");
    return;
  }

  try {
    const savedUser = await User.create({
      name: name,
      username: username,
      password: password,
    });

    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(`Error on create user `);
    return;
  }
}

export async function allUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
    return;
  } catch (error) {
    res.status(400).send("Error to list all users");
    return;
  }
}

export async function oneUser(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: Number(req.params.id) } });
  if (!user) {
    res.status(404).send("User does not exists");
    return;
  }
  try {
    res.status(200).send(user);
    return;
  } catch (error) {
    res.status(400).send("Error to list one user");
    return;
  }
}

export async function updateUser(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: Number(req.params.id) } });
  if (!user) {
    res.status(404).send("User does not exists");
    return;
  }
  try {
    user.update({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
    });
    res.status(200).send(user);
    return;
  } catch (error) {
    res.status(400).send("Error to update user");
    return;
  }
}

export async function deleteUser(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: Number(req.params.id) } });
  if (!user) {
    res.status(404).send("User does not exists");
    return;
  }
  try {
    await Post.destroy({ where: { userid: user.dataValues.id } });
    user.destroy();
    res.status(200).send(user);
    return;
  } catch (error) {
    res.status(400).send("Error to delete user");
    return;
  }
}

// ---------- Posts -----------

export async function createPost(req: Request, res: Response) {
  const title: string = req.body.title;
  const description: string = req.body.description;

  try {
    const savedPost = await Post.create({
      title: title,
      description: description,
    });

    res.status(201).send(savedPost);
  } catch (error) {
    res.status(400).send(`Error on create post`);
    return;
  }
}

export async function allPosts(req: Request, res: Response) {
  try {
    const posts = await Post.findAll();
    res.status(200).send(posts);
    return;
  } catch (error) {
    res.status(400).send("Error to list all posts");
    return;
  }
}

export async function onePost(req: Request, res: Response) {
  const post = await Post.findOne({ where: { id: Number(req.params.id) } });
  if (!post) {
    res.status(404).send("Post does not exists");
    return;
  }
  try {
    res.status(200).send(post);
    return;
  } catch (error) {
    res.status(400).send("Error to list one post");
    return;
  }
}

export async function updatePost(req: Request, res: Response) {
  const post = await Post.findOne({ where: { id: Number(req.params.id) } });
  if (!post) {
    res.status(404).send("User does not exists");
    return;
  }
  try {
    post.update({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(200).send(post);
    return;
  } catch (error) {
    res.status(400).send("Error to update post");
    return;
  }
}

export async function deletePost(req: Request, res: Response) {
  const post = await Post.findOne({ where: { id: Number(req.params.id) } });
  if (!post) {
    res.status(404).send("Post does not exists");
    return;
  }
  try {
    post.destroy();
    res.status(200).send(post);
    return;
  } catch (error) {
    res.status(400).send("Error to delete post");
    return;
  }
}
