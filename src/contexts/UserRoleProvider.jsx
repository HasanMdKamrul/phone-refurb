import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserRole } from "../Apis/userApiAndToken";
import { AuthContext } from "./AuthProvider";

export const UserRoleContext = createContext();

const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRole = async () => {
      try {
        const data = await getUserRole(user?.email);
        console.log(data?.data);
        setRole(data?.data);
        setLoadingRole(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRole();
  }, [user?.email]);

  return (
    <UserRoleContext.Provider value={{ role, loadingRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export default UserRoleProvider;
