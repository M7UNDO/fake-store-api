const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}
