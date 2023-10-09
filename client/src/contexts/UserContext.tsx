import { User } from "@helpers/Constants";
import React, { createContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | undefined;
  updateUser: (user: User | undefined) => void;
};

const initialContext: UserContextType = {
  user: undefined,
  updateUser: () => {},
};

// User Context to easily share user state between components
export const UserContext = createContext<UserContextType>(initialContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Check if user is already logged in
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
    }
  }, []);

  const updateUser = (user: User | undefined) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
