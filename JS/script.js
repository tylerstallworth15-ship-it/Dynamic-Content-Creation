const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let totalPrice = 0;

function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

function removeItem(event) {
  const item = event.target.closest('li');
  const subtotal = parseFloat(item.dataset.subtotal) || 0;
  updateTotalPrice(-subtotal);
  item.remove();
}

function changeQuantity(event) {
  const input = event.target;
  const item = input.closest('li');
  const price = parseFloat(item.dataset.price);
  const oldSubtotal = parseFloat(item.dataset.subtotal) || 0;

  let qty = parseInt(input.value);
  if (isNaN(qty) || qty < 1) {
    qty = 1;
    input.value = 1;
}

  const newSubtotal = price * qty;
  item.dataset.subtotal = newSubtotal.toFixed(2);

  const itemTotal = item.querySelector('.item-total');
  itemTotal.textContent = '$' + newSubtotal.toFixed(2);

  updateTotalPrice(newSubtotal - oldSubtotal);
}

function addProduct() {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  if (name === '' || isNaN(price) || price <= 0) {
    alert('Enter a valid product name and price.');
    return;
  }

  const li = document.createElement('li');
  li.classList.add('cart-item');

  const quantity = 1;
  const subtotal = price * quantity;

  li.dataset.price = price;
  li.dataset.subtotal = subtotal.toFixed(2);

  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;

  const priceSpan = document.createElement('span');
  priceSpan.textContent = '$' + price.toFixed(2);

  const qtyInput = document.createElement('input');
  qtyInput.type = "number";
  qtyInput.min = '1';
  qtyInput.value = '1';
  qtyInput.classList.add('quantity-input');
  qtyInput.addEventListener('change', changeQuantity);

  const totalSpan = document.createElement('span');
  totalSpan.classList.add('item-total');
  totalSpan.textContent = '$' + subtotal.toFixed(2);

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', removeItem);

  li.appendChild(nameSpan);
  li.appendChild(priceSpan);
  li.appendChild(qtyInput);
  li.appendChild(totalSpan);
  li.appendChild(removeButton);

  cart.appendChild(li);
  updateTotalPrice(subtotal);

  productNameInput.value= '';
  productPriceInput.value = '';
  productNameInput.focus();
}

addProductButton.addEventListener('click', addProduct);

productPriceInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addProduct();
  }
});

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const label = card.querySelector('p').textContent;

    if (label === 'Avocado') {
      productNameInput.value = 'Avocado';
      productPriceInput.value = 2.50;
    }
    
    if (label === 'Almond Milk') {
      productNameInput.value = 'Almond Milk';
      productPriceInput.value = 3.99;
    }

    if (label === 'Bananas') {
      productNameInput.value = 'Bananas';
      productPriceInput.value = 1.29;
    }
  });
});