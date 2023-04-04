import { createContext, useContext, useState } from "react";
import { IChildren, IPost, IPostData, POST_DEFAULT_VALUE } from "./types";

const PostContext = createContext<IPostData>(POST_DEFAULT_VALUE);

export function PostProvider({ children }: IChildren) {
  const [posts, setPosts] = useState<IPost[]>([]);

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
