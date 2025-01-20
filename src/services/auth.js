export const sendOTP = async (number) => {
  return await fetch(`${process.env.REACT_APP_AUTH_API_URL}/phone/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({ number: number }),
  })
    .then((res) => res.json())
    .catch((err) => {
      return new Promise.resolve({
        status: "error",
        message: err.message,
      });
    });
};

export const verifyOTP = async (number, otp) => {
  return await fetch(`${process.env.REACT_APP_AUTH_API_URL}/phone/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ number, otp }),
  })
    .then((res) => res.json())
    .catch((err) => {
      return new Promise.resolve({
        status: "error",
        message: err.message,
      });
    });
};

export const getUserData = async () => {
  return await fetch(`${process.env.REACT_APP_DATA_API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      return Promise.resolve({
        status: "error",
        message: err.message,
      });
    });
}

export const updateUserData = async (data) => {
  return await fetch(`${process.env.REACT_APP_DATA_API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      return Promise.resolve({
        status: "error",
        message: err.message,
      });
    });
}
