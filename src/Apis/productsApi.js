// ** products api save (seller only)

export const loadProducts = async (bookingData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/addproduct`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

// ** get seller products

export const getSellerProducts = async (email) => {
  try {
    console.log(email);
    const response = await fetch(
      `${process.env.REACT_APP_URL}/products?email=${email}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
