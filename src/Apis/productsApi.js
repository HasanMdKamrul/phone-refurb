// ** products api save (seller only)

export const loadProducts = async (bookingData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/addproduct`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
    const response = await fetch(
      `${process.env.REACT_APP_URL}/products?email=${email}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
