import { createContext, useContext } from "react";
import { IChildren, IUserData, USER_DEFAULT_VALUE } from "./types";
import { useLocalstorage } from "../utils/useLocalstorage";

export const UserContext = createContext<IUserData>(USER_DEFAULT_VALUE);

export function UserProvider({ children }: IChildren) {
  const [user, setUser] = useLocalstorage("user", USER_DEFAULT_VALUE.user);
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
