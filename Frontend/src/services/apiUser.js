const apiUrl = "https://airbnb-backend-rho.vercel.app";

async function login(data) {
  const response = await fetch(`${apiUrl}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "login failed");
  }

  const result = await response.json();
  return result;
}

async function signup(data) {
  const response = await fetch(`${apiUrl}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData?.error?.message || "sigup failed, enter vaild data"
    );
  }

  const result = await response.json();
  return result;
}

async function getUserInfo() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/users/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "get user faild failed");
  }

  const result = await response.json();
  return result;
}

async function getUserbById(id) {
  const response = await fetch(`${apiUrl}/api/users/info/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "get user faild failed");
  }

  const result = await response.json();
  return result;
}

async function UpdateUserInfo(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/users/info`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "update user info failed");
  }

  const result = await response.json();
  return result;
}

export { login, signup, getUserInfo, UpdateUserInfo, getUserbById };
