import React, {useState, FC, ReactNode, createContext} from 'react';
import User from '../model/User';

type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

type UserProviderProps = {
  children: ReactNode;
};
const UserProvider: FC<UserProviderProps> = (props: UserProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
