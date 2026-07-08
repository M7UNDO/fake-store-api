const BASE_URL = "https://fakestoreapi.com/products";

function adjustProductPrice(product) {
  let finalPrice = product.price;

  if (product.category === "electronics") {
    if (product.title.includes("Monitor")) {
      finalPrice = product.price * 15;
    } else if (product.title.includes("SSD") || product.title.includes("Hard Drive")) {
      finalPrice = product.price * 22;
    } else {
      finalPrice = product.price * 18;
    }
  } else if (product.category === "jewelery") {
    if (product.price > 500) {
      finalPrice = product.price * 12;
    } else if (product.price < 20) {
      finalPrice = product.price * 35;
    } else {
      finalPrice = product.price * 18;
    }
  } else {
    if (product.price < 15) {
      finalPrice = product.price * 25;
    } else {
      finalPrice = product.price * 18;
    }
  }

  const roundedToFifty = Math.round(finalPrice / 50) * 50;
  const priceString = `${roundedToFifty}.00`;

  return {
    ...product,
    price: priceString
  };
}

export async function getProducts() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.map(adjustProductPrice);
}

export async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return adjustProductPrice(data);
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}