const orderList = document.getElementById("order-list");

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

  const bookings = loadData("azoomBookings").filter(b => b.userEmail === currentUser.email);
  if (bookings.length === 0) {
    orderList.innerHTML = `<p class="hint">You have no bookings yet. <a href="cars.html">Browse our cars</a></p>`;
    return;
  }

  let html = "";
  for (let i = bookings.length - 1; i >= 0; i--) {
    const order = bookings[i];
    let damage = `S$${order.damageCost}`;
    if (order.damageNote) {
      damage += ` (${safe(order.damageNote)})`;
    }
    html += `
      <div class="order">
        <div class="order-head">
          <h3>${order.carName}</h3>
          <span class="status">${order.status}</span>
        </div>
        <p>${order.startDate} → ${order.endDate}</p>
        <p>Pick up at <b>${order.pickupStore}</b>, return to <b>${order.returnPoint}</b></p>
        <p>Rental: S$${order.rentalCost} · Damage: ${damage}</p>
        ${nextAction(order)}
      </div>
    `;
  }
  orderList.innerHTML = html;
}

function updateStatus(orderId, newStatus) {
  const bookings = loadData("azoomBookings");
  const order = bookings.find(b => b.id === orderId);
  order.status = newStatus;
  saveData("azoomBookings", bookings);
  renderOrders();
}

renderOrders();
