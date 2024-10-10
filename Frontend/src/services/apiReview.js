const apiUrl = "https://airbnb-backend-xi-rouge.vercel.app;

async function AddReview(data) {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(data);
  const response = await fetch(`${apiUrl}/api/reviews`, {
    method: "Post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Add Review faild");
  }

  const result = await response.json();
  return result;
}

export { AddReview };
