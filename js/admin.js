// ===== 员工页 =====

// ---- 门卫：不是员工就送回登录页 ----
const staffUser = getCurrentUser();
if (!staffUser || staffUser.role !== "staff") {
  window.location.href = "../login.html";
}

// 员工页在 admin 文件夹里，退出后要回上一层的首页
function logout() {
  localStorage.removeItem("azoomCurrentUser");
  window.location.href = "../index.html";
}

function renderAdmin() {
  const bookings = loadBookings();

  // ---- 上半部分：已还车、等待验车的订单，每张一个验车表单 ----
  const waiting = bookings.filter(b => b.status === "Returned");
  let cards = "";
  for (let i = 0; i < waiting.length; i++) {
    const b = waiting[i];
    cards += `
      <div class="order">
        <div class="order-head">
          <h3>${b.carName}</h3>
          <span class="status">${b.returnPoint}</span>
        </div>
        <p>Customer: ${b.fullName} (${b.email}) · ${b.startDate} → ${b.endDate}</p>
        <form class="form inspect-form" onsubmit="submitInspection(event, ${b.id})">
          <label for="note-${b.id}">Damage found (leave empty if none)</label>
          <input type="text" id="note-${b.id}" placeholder="e.g. Scratch on rear bumper">
          <label for="cost-${b.id}">Repair charge (S$)</label>
          <input type="number" id="cost-${b.id}" min="0" value="0" required>
          <button type="submit" class="btn">Complete Inspection</button>
        </form>
      </div>
    `;
  }
  document.getElementById("inspect-list").innerHTML =
    cards || `<p class="hint">No cars are waiting for inspection.</p>`;

  // ---- 下半部分：全部订单一览表 ----
  let rows = "";
  for (let i = bookings.length - 1; i >= 0; i--) {
    const b = bookings[i];
    rows += `
      <tr>
        <td>${b.fullName}</td>
        <td>${b.carName}</td>
        <td>${b.startDate} → ${b.endDate}</td>
        <td>${b.returnPoint}</td>
        <td>${b.rentalCost + b.damageCost}</td>
        <td>${b.status}</td>
      </tr>
    `;
  }
  document.getElementById("all-bookings").innerHTML =
    rows || `<tr><td colspan="6">No bookings yet.</td></tr>`;
}

// 员工提交验车结果：记下损坏情况和修理费，状态改成 Inspected
function submitInspection(event, bookingId) {
  event.preventDefault();
  const bookings = loadBookings();
  const b = bookings.find(x => x.id === bookingId);
  b.damageNote = document.getElementById(`note-${bookingId}`).value;
  b.damageCost = Number(document.getElementById(`cost-${bookingId}`).value);
  b.status = "Inspected";
  saveBookings(bookings);
  renderAdmin();
}

renderAdmin();
