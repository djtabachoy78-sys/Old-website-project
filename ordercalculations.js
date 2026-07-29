let orders = {};
let total = 0;

function addItem(btn) {
  let item = btn.parentNode.parentNode; // go up to .item
  let name = item.getAttribute("data-name");
  let price = parseInt(item.getAttribute("data-price"));
  let img = item.querySelector("img").src;

  if (!orders[name]) {
    orders[name] = { qty: 0, price: price, img: img };
  }
  orders[name].qty++;
  total += price;
  showOrders();
}

function removeItem(btn) {
  let item = btn.parentNode.parentNode;
  let name = item.getAttribute("data-name");
  let price = parseInt(item.getAttribute("data-price"));

  if (orders[name]) {
    orders[name].qty--;
    total -= price;
    if (orders[name].qty <= 0) {
      delete orders[name];
    }
    showOrders();
  }
}

function showOrders() {
  let box = document.getElementById("orders");
  box.innerHTML = "";
  for (let name in orders) {
    let o = orders[name];
    let div = document.createElement("div");
    div.className = "order-item";
    div.innerHTML =
      "<img src='" + o.img + "' class='order-img'>" +
      name + " x" + o.qty +
      " <span>₱" + (o.qty * o.price) + "</span>";
    box.appendChild(div);
  }
  document.getElementById("total").textContent = total;
}

function clearOrders() {
  orders = {};
  total = 0;
  showOrders();
}

function placeOrder() {
  if (total > 0) {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("total", total);
    window.location.href = "confirmation.html"; // go to confirmation page
  } else {
    alert("Your cart is empty.");
  }
}



