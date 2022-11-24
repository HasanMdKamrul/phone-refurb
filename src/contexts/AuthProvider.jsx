import React, { createContext } from "react";
import useFirebase from "../Hooke/useFirebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authInfo = useFirebase();
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
