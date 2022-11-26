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
    // console.log("sell", email);
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

// ** advertise product

export const productAdvertiseOrReported = async (product, email) => {
  //   console.log(product._id);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/advertiseproducts/${product._id}?email=${email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ** get all the advertise products

export const getAdvertiseProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/advertiseproducts?advertise=advertise`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// ** get all the advertise products

export const getReportedProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/reportedproducts?reported=reported`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// **  Delete Reported Product

export const deleteReportedProduct = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
