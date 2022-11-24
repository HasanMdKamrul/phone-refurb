import { useEffect, useState } from "react";
import { getUserRole } from "../Apis/userApiAndToken";

const UseRole = (email) => {
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      try {
        const data = await getUserRole(email);
        console.log(data?.data);
        setRole(data?.data);
        setLoadingRole(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRole();
  }, [email]);

  return {
    role,
    loadingRole,
  };
};

export default UseRole;
