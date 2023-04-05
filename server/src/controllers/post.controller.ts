import { Request, Response } from "express";
import { User } from "../db/Models/User";
import { Post } from "../db/Models/Post";

export async function createPost(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const title = req.body.title;
  const description = req.body.description;
  try {
    const post = await Post.create({
      title: title,
      description: description,
      name: user.dataValues.name,
      userid: user.dataValues.id,
    });

    console.log("Posted!");
    res.status(201).send(post);
    return;
  } catch (error) {
    res.status(400).send("Error on create a post");
    return;
  }
}

export async function readPost(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const post = await Post.findOne({
    where: { id: req.params.postid },
  });

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  try {
    res.status(200).send(post);
    return;
  } catch (error) {
    res.status(400).send("Error to show post");
    return;
  }
}

export async function updatePost(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const post = await Post.findOne({
    where: { id: req.params.postid },
  });

  if (!post) {
    res.status(404).send("Post not found");
    return;
  } else if (post.dataValues.userid != user.dataValues.id) {
    res.status(404).send("Post not found");
    return;
  }

  const newTitle = req.body.title;
  const newDescription = req.body.description;

  try {
    await post.update({
      title: newTitle,
      description: newDescription,
    });

    res.status(201).send("Post updated!");
    return;
  } catch (error) {
    res.status(400).send("Error to update post!");
    return;
  }
}

export async function deletePost(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const post = await Post.findOne({
    where: { id: req.params.postid },
  });

  if (!post) {
    res.status(404).send("Post not found");
    return;
  }

  try {
    await post.destroy();
    res.status(200).send("Post deleted!");
    return;
  } catch (error) {
    res.status(400).send("Error to delete a post");
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

export async function allPostFromUser(req: Request, res: Response) {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  try {
    const posts = await Post.findAll({ where: { userid: user.dataValues.id } });
    res.status(200).send(posts);
    return;
  } catch (error) {
    res.status(400).send("Error to show posts from user");
    return;
  }
}
