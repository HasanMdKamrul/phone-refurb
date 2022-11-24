export const saveUserAndTokenGenerate = async (userData, role = "buyer") => {
  try {
    console.log(userData, role);
    const currentUser = {
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
    console.log(data);

    // ** Token Genrate

    if (data.success) {
      // ** token generate now
      console.log(userData?.email);
      const response = await fetch(
        `${process.env.REACT_APP_URL}/jwt?email=${userData?.email}`
      );

      const tokenData = await response.json();
      console.log(tokenData);
      if (tokenData.success) {
        localStorage.setItem("token", tokenData.token);
      }
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
    console.log(data);
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
      `${process.env.REACT_APP_URL}/users?role=${role}`
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
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
