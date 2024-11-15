import { getCart, saveCart, removeFromCart } from "./localStorageUtils.js";

let productToRemove = null;

function updateCartTable() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td><a href="../pages/details.html?id=${item.id}">${item.name}</a></td>
      <td>${item.price} RON</td>
      <td>
        <button class="decrease-qty" data-id="${item.id}">-</button>
        ${item.quantity}
        <button class="increase-qty" data-id="${item.id}">+</button>
      </td>
      <td>${subtotal} RON</td>
      <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
    `;

    cartItemsContainer.appendChild(row);
  });

  cartTotal.textContent = total;
}

function handleQuantityChange(event) {
  const productId = event.target.getAttribute("data-id");
  const cart = getCart();

  const product = cart.find((item) => item.id === productId);

  if (event.target.classList.contains("increase-qty")) {
    product.quantity += 1;
  } else if (event.target.classList.contains("decrease-qty")) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      productToRemove = product;
      showModal();
      return;
    }
  }

  saveCart(cart);
  updateCartTable();
}

function handleRemoveProduct(event) {
  const productId = event.target.getAttribute("data-id");
  removeFromCart(productId);
  updateCartTable();
}

function handleClearCart() {
  localStorage.removeItem("cart");
  updateCartTable();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartTable();

  document.getElementById("cart-items").addEventListener("click", (event) => {
    if (
      event.target.classList.contains("increase-qty") ||
      event.target.classList.contains("decrease-qty")
    ) {
      handleQuantityChange(event);
    } else if (event.target.classList.contains("remove-item")) {
      handleRemoveProduct(event);
    }
  });

  document
    .getElementById("clear-cart")
    .addEventListener("click", handleClearCart);
});

function showModal() {
  const modal = document.getElementById("confirmation-modal");
  modal.style.display = "flex";
}

function hideModal() {
  const modal = document.getElementById("confirmation-modal");
  modal.style.display = "none";
}

document.getElementById("confirm-remove").addEventListener("click", () => {
  if (productToRemove) {
    removeFromCart(productToRemove.id);
    updateCartTable();
    hideModal();
    productToRemove = null;
  }
});

document.getElementById("cancel-remove").addEventListener("click", () => {
  hideModal();
});
