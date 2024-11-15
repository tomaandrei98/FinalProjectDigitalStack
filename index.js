import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", displayProducts);

async function displayProducts() {
  const products = await getAllProducts();
  const productContainer = document.querySelector(".products");

  productContainer.innerHTML = products.map(mapProductToCard).join(" ");

  productContainer.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      window.location.href = `./pages/details.html?id=${productId}`;
    });
  });
}
