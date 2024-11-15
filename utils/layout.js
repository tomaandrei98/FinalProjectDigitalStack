export function mapProductToCard(product) {
  return `
        <div class="card flex-col  items-center justify-around gap-20">
            <div class="info  flex-col items-center gap-20">
                <div class="img">
                    <img src=${product.imageURL} alt="">
                </div>
                <div class="name">
                    <h4>${product.name}</h4>
                </div>
                <div class="price">${product.price} RON</div>
            </div>
             <button class="details-btn" data-id="${product.id}">Details</button>
        </div>
    `;
}

export function mapProductToAdminTableRow(product) {
  return `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img width="50px" src=${product.imageURL} /></td>
            <td>${product.details} </td>
            <td>
                <button class="edit-btn" data-productId=${product.id}>Edit</button>
            </td>
            <td>
                <button class="delete-btn" data-productId=${product.id}>Delete</button>
            </td>
        </tr>
    `;
}

export function mapProductToDetailsCard(product) {
  return `
    <div class="details-card card flex-row items-center gap-20">
        <div class="img">
            <img src="${product.imageURL}" alt="${product.name}" />
        </div>
        <div class="info flex-col items-start gap-10">
            <h2>${product.name}</h2>
            <p>${product.details}</p>
            <p>Price: ${product.price} RON</p>
            <p>In Stock: ${product.stock}</p>
            <button id="add-to-cart" class="details-btn add-to-cart">Add to Cart</button>
        </div>
    </div>
  `;
}