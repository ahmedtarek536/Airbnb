const apiUrl = "http://localhost:5000";
// const apiUrl = "https://airbnb-clone-backend-phi.vercel.app";

async function AddProduct(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Add product faild");
  }

  const result = await response.json();
  return result;
}

async function DeleteProduct(productId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/products/${productId}`, {
    method: "Delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Delete product faild");
  }

  const result = await response.json();
  return result;
}

async function getUserProduts() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/api/products/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Get User product faild");
  }

  const result = await response.json();
  return result;
}

async function getUserProdutsById(id) {
  const response = await fetch(`${apiUrl}/api/products/user/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Get User product faild");
  }

  const result = await response.json();
  return result;
}

async function getProdutcById(productId) {
  const response = await fetch(`${apiUrl}/api/products/product/${productId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Get product faild");
  }

  const result = await response.json();
  return result;
}

async function getProducts(query) {
  const response = await fetch(`${apiUrl}/api/products?query=${query}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Get product faild");
  }

  const result = await response.json();
  return result;
}

export {
  AddProduct,
  getUserProduts,
  getUserProdutsById,
  DeleteProduct,
  getProdutcById,
  getProducts,
};
