import { createContext, useContext, useState } from "react";
import { IChildren, IUser, IUserData, USER_DEFAULT_VALUE } from "./types";

export const UserContext = createContext<IUserData>(USER_DEFAULT_VALUE);

export function UserProvider({ children }: IChildren) {
  const [user, setUser] = useState<IUser>({} as IUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const { user, setUser } = useContext(UserContext);

  return { user, setUser };
}
