export const saveUserAndTokenGenerate = async (userData, role = "buyer") => {
  try {
    // console.log(userData, role);
    const currentUser = {
      name: userData?.displayName,
      email: userData?.email,
      role: role,
    };

    const response = await fetch(`${process.env.REACT_APP_URL}/users`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    });

    const data = await response.json();
    // console.log(data);

    return data;

    // ** Token Genrate
  } catch (error) {
    console.log(error.message);
  }
};

// ** generate jwt token after any login

export const generateJwt = async (email) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/jwt?email=${email}`
    );

    const tokenData = await response.json();
    console.log(tokenData);
    if (tokenData.success) {
      localStorage.setItem("token", tokenData.token);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// ** Get a specific user role
export const getUserRole = async (email) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/usersrole?email=${email}`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// ** load sellers and buyers

export const loadSellersAndBuyers = async (role) => {
  try {
    console.log(role);
    const response = await fetch(
      `${process.env.REACT_APP_URL}/users?role=${role}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// ** Delete seller and buyer

export const deleteSellerAndBuyer = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// ** Seller verification

export const sellerVerification = async (seller) => {
  try {
    console.log(seller._id);
    const response = await fetch(
      `${process.env.REACT_APP_URL}/sellerverify/${seller?._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          //   authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(seller),
      }
    );

    const { data } = await response.json();

    if (data.modifiedCount > 0) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
