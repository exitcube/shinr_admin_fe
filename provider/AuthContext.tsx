import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

export const AuthContext = createContext<IAuthContext>({});

interface IAuthContext {
    token?: string;
}

export const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const value: IAuthContext = useMemo(() => ({}), []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};


export const useAuthContext = () => useContext(AuthContext);
