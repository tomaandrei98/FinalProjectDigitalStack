import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", displayProducts);

async function displayProducts() {
  const products = await getAllProducts();
  document.querySelector(".products").innerHTML = products
    .map(mapProductToCard)
    .join(" ");
}
