import { getProductById } from "../api/products.js";
import { mapProductToDetailsCard } from "../utils/layout.js";
import { addToCart } from "../utils/localStorageUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.getElementById("product-details").innerHTML =
      "<p>Invalid Product ID</p>";
    return;
  }

  const product = await getProductById(productId);

  if (!product) {
    document.getElementById("product-details").innerHTML =
      "<p>Product not found</p>";
    return;
  }

  const detailsCard = mapProductToDetailsCard(product);

  document.getElementById("product-details").innerHTML = detailsCard;

  document.getElementById("add-to-cart").addEventListener("click", () => {
    addToCart(product);

    const alert = document.getElementById("alert");
    alert.textContent = `"${product.name}" has been added to your cart.`;
    alert.classList.remove("hidden");
    alert.classList.add("show");

    setTimeout(() => alert.classList.remove("show"), 3000);
  });
});
