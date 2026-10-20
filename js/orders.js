// ===== 我的订单 =====
const orderList = document.getElementById("order-list");

// 每种状态下，客人能做的下一步
function nextAction(order) {
  if (order.status === "Booked") {
    return `<button class="btn" onclick="updateStatus(${order.id}, 'Picked Up')">I Have Picked Up the Car</button>`;
  } else if (order.status === "Picked Up") {
    return `<button class="btn" onclick="updateStatus(${order.id}, 'Returned')">I Have Returned the Car</button>`;
  } else if (order.status === "Returned") {
    return `<p class="hint">Our staff will inspect the car soon. Your final bill will appear here.</p>`;
  } else if (order.status === "Inspected") {
    return `<button class="btn" onclick="updateStatus(${order.id}, 'Paid')">Pay S$${order.rentalCost + order.damageCost} with card ending ${order.cardLast4}</button>`;
  } else {
    return `<p class="hint">Paid in full. Thank you for driving with AZoom!</p>`;
  }
}

function renderOrders() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    orderList.innerHTML = `<p class="hint">Please <a href="login.html">log in</a> to see your orders.</p>`;
    return;
  }

  // 只显示自己的订单
  const bookings = loadBookings().filter(b => b.userEmail === currentUser.email);

  if (bookings.length === 0) {
    orderList.innerHTML = `<p class="hint">You have no bookings yet. <a href="cars.html">Browse our cars</a></p>`;
    return;
  }

  let html = "";
  for (let i = bookings.length - 1; i >= 0; i--) {        // 倒着循环：最新的订单排最上面
    const order = bookings[i];
    html += `
      <div class="order">
        <div class="order-head">
          <h3>${order.carName}</h3>
          <span class="status">${order.status}</span>
        </div>
        <p>${order.startDate} → ${order.endDate}</p>
        <p>Pick up at <b>${order.pickupStore}</b>, return to <b>${order.returnPoint}</b></p>
        <p>Rental: S$${order.rentalCost} · Damage: S$${order.damageCost}${order.damageNote ? " (" + order.damageNote + ")" : ""}</p>
        ${nextAction(order)}
      </div>
    `;
  }
  orderList.innerHTML = html;
}

// 改订单状态：找到那张订单 → 改 status → 存回去 → 重新显示
function updateStatus(orderId, newStatus) {
  const bookings = loadBookings();
  const order = bookings.find(b => b.id === orderId);
  order.status = newStatus;
  saveBookings(bookings);
  renderOrders();
}

renderOrders();
