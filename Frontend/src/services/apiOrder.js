const apiUrl = "http://localhost:5000";
// const apiUrl = "https://airbnb-clone-backend-phi.vercel.app";

async function AddOrder(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Add Order faild");
  }

  const result = await response.json();
  return result;
}

async function UpdateOrder({ orderId, data }) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
    method: "PuT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Add Order faild");
  }

  const result = await response.json();
  return result;
}

async function getUserOrder() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/orders/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Get Orders faild");
  }

  const result = await response.json();
  return result;
}

async function getHostOrder() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/orders/host`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Get Orders faild");
  }

  const result = await response.json();
  return result;
}

export { AddOrder, getUserOrder, getHostOrder, UpdateOrder };
