const featuredIds = [1, 3, 7];
const featuredGrid = document.getElementById("featured-cars");

let html = "";
for (let i = 0; i < featuredIds.length; i++) {
  const car = cars.find(c => c.id === featuredIds[i]);
  html += carCardHTML(car);
}
featuredGrid.innerHTML = html;
