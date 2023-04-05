import { createContext, useContext, useEffect, useState } from "react";
import { IChildren, IPost, IPostData, POST_DEFAULT_VALUE } from "./types";

import { useUser } from "./user";
import { api } from "../services";

const PostContext = createContext<IPostData>(POST_DEFAULT_VALUE);

export function PostProvider({ children }: IChildren) {
  const { user } = useUser();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (!Object.keys(user).length) {
      return;
    }
    const fetchPosts = async () => {
      const req = await api.get(`posts/${user.id}/posts`);
      const data: IPost[] = req.data;

      setPosts(data);
    };
    fetchPosts();
  }, [user]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const { posts, setPosts } = useContext(PostContext);

  return { posts, setPosts };
}
