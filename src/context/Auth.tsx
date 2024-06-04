'use client';

import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TokenResponse } from '../@types/user';

type ParamProvider = PropsWithChildren & {
  user: TokenResponse;
};

type ContextType = {
  user: TokenResponse | null;
  setUser: Dispatch<SetStateAction<TokenResponse | null>>;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  setUser: () => null,
});

export const AuthContextProvider = ({ children, user: u }: ParamProvider) => {
  const [user, setUser] = useState<TokenResponse | null>(u);

  // simple guard using useEffect
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  useEffect(() => {}, [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
