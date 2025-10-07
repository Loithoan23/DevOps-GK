const API_URL = '/products';

const form = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const list = document.getElementById('productList');

async function fetchProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();
  renderProducts(products);
}
function renderProducts(products) {
  list.innerHTML = '';
  products.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td>${p.price}₫</td>
      <td>
        <button class="delete" onclick="deleteProduct(${i})">Xóa</button>
      </td>
    `;
    list.appendChild(tr);
  });
}
form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  if (!name || !price) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  });

  form.reset();
  fetchProducts();
});

async function deleteProduct(index) {
  await fetch(`${API_URL}/${index}`, { method: 'DELETE' });
  fetchProducts();
}

// Load khi mở trang
fetchProducts();
