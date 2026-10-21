const carGrid = document.getElementById("car-grid");

let html = "";
for (let i = 0; i < cars.length; i++) {
  html += carCardHTML(cars[i]);
}
carGrid.innerHTML = html;
