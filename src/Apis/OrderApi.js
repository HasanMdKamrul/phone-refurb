export const saveOrder = async (order) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
