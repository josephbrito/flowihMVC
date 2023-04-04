import React from "react";

// types for user context
export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserData {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const USER_DEFAULT_VALUE = {
  user: {} as IUser,
  setUser: () => {},
};

// end types for user context

// typer for post context
export interface IPost {
  id: number;
  title: string;
  description: string;
  userid: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPostData {
  posts: IPost[];
  setPosts: (post: IPost[]) => void;
}

export const POST_DEFAULT_VALUE = {
  posts: [],
  setPosts: () => {},
};
// end typer for post context
export interface IChildren {
  children?: React.ReactNode;
}
