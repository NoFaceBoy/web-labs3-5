const sectionItems = document.getElementById("items");
const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const clearButton = document.getElementById("clear_button");
const sortSwitch = document.getElementById("sort_switch");
const countButton = document.getElementById("count_button");
const totalStockDiv = document.getElementById("total_stock");

let juicers = [];
let renderedJuicers = [];

const itemTemplate = (item, id) => `
    <div class="card" id="juicer-${id}"> 
        <div class=juicer "juicer-${id}-brand">${item.brand}</div> 
        <div class="juicer-price" id="juicer-${id}_price">Price - ${item.price}</div> 
        <div class="juicer-stock" id="juicer-${id}_stock">Juicers in stock: ${item.stock}</div> 
    </div>`;

const addJuicers = () => {
  let i = 1;
  while (document.getElementById(`juicer-${i}`)) {
    let stock = document
      .getElementById(`juicer-${i}`)
      .children[2].textContent.split(":")[1];
    let price = document
      .getElementById(`juicer-${i}`)
      .children[1].textContent.split("-")[1];
    let brand = document.getElementById(`juicer-${i}`).children[0].textContent;
    const juicer = {
      stock,
      price,
      brand,
    };
    juicers.push(juicer);
    i += 1;
  }
  renderedJuicers = juicers;
};
addJuicers();

const insertItem = (item, id) => {
  sectionItems.insertAdjacentHTML("beforeend", itemTemplate(item, id));
};

const renderJuicers = (items) => {
  sectionItems.innerHTML = "";
  for (const item of items) {
    insertItem(item, item.id);
  }
  renderedJuicers = items;
};

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  renderJuicers(juicers);
  totalStockDiv.innerHTML = "";
});

sortSwitch.addEventListener("change", (event) => {
  event.preventDefault();
  if (event.target.checked) {
    let sortedJuicers = [];
    for (let juicer of juicers) {
      sortedJuicers.push(juicer);
    }
    sortedJuicers.sort(function (a, b) {
      return b.price - a.price;
    });
    renderJuicers(sortedJuicers);
    totalStockDiv.innerHTML = "";
  } else {
    renderJuicers(juicers);
  }
});

searchButton.addEventListener("click", (event) => {
  const foundJuicers = juicers.filter(
    (juicer) =>
      juicer.brand.toLowerCase().search(searchInput.value.toLowerCase()) !== -1
  );
  clearInput();
  renderJuicers(foundJuicers);
  totalStockDiv.innerHTML = "";
});

countButton.addEventListener("click", (event) => {
  totalStockDiv.innerHTML = "";
  event.preventDefault();
  console.log(renderedJuicers);
  counttotalStock(renderedJuicers);
});
const clearInput = () => {
  searchInput.value = "";
};

const counttotalStock = (juicers) => {
  const totalStock = juicers.reduce(function (totalStock, b) {
    return totalStock + parseInt(b.stock);
  }, 0);
  totalStockDiv.insertAdjacentHTML("beforeend", totalStockTemplate(totalStock));
};

const totalStockTemplate = (totalStock) => `${totalStock}`;
