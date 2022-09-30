const itemsContainer = document.getElementById("items_container");

const searchField = document.getElementById("search_field");
const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const clearButton = document.getElementById("clear_button");
const sortSwitch = document.getElementById("sort_switch");
const countButton = document.getElementById("count_button");
const totalStockDiv = document.getElementById("total_stock");

const brandInput = document.getElementById("brand_input");
const priceInput = document.getElementById("price_input");
const stockInput = document.getElementById("stock_input");

const submitButton = document.getElementById("submit_button");
const editButton = document.getElementById("edit_button");
const editButtonForm = document.getElementById("edit_button_form");

const createButton = document.getElementById("create_button");
const homeButton = document.getElementById("home_button");
const createForm = document.getElementById("create_form");

const options = document.getElementById("aside");

let juicers = [];
let renderedJuicers = [];
id = -1;

const itemTemplate = ({ id, brand, price, stock }) => {
  return `
  <li id="${id}" class="item">
    <div class="card"> 
        <div class=juicer>${brand}</div> 
        <div class="juicer-price">Price - ${price}</div> 
        <div class="juicer-stock">Juicers in stock: ${stock}</div>
        <button id="edit_button_form" onclick="editJuicers(${id})">Edit</button>
    </div>
  </li>`;
};

const insertJuicer = ({ brand, price, stock }) => {
  const juicer = {
    id: id,
    brand: brandInput.value,
    price: priceInput.value,
    stock: stockInput.value,
  };
  id += 1;
  juicers.push(juicer);
  renderedJuicers = juicers;
  clearInputs();
};

const clearInputs = () => {
  brandInput.value = "";
  priceInput.value = "";
  stockInput.value = "";
};

const renderJuicers = (itemsList) => {
  let result = ``;
  itemsList.forEach((item, index) => {
    result += itemTemplate(item, index);
  });
  itemsContainer.innerHTML = result;
};

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  renderJuicers(juicers);
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

const clearSearchInput = () => {
  searchInput.value = "";
};

searchButton.addEventListener("click", (event) => {
  const foundJuicers = juicers.filter(
    (juicer) =>
      juicer.brand.toLowerCase().search(searchInput.value.toLowerCase()) !== -1
  );
  clearSearchInput();
  renderJuicers(foundJuicers);
  totalStockDiv.innerHTML = "";
});

countButton.addEventListener("click", (event) => {
  totalStockDiv.innerHTML = "";
  event.preventDefault();
  console.log(renderedJuicers);
  counttotalStock(renderedJuicers);
});

const counttotalStock = (juicers) => {
  const totalStock = juicers.reduce(function (totalStock, b) {
    return totalStock + parseInt(b.stock);
  }, 0);
  totalStockDiv.insertAdjacentHTML("beforeend", totalStockTemplate(totalStock));
};

const totalStockTemplate = (totalStock) => `${totalStock}`;

const changeValues = (id) => {
  juicers[id].brand = brandInput.value;
  juicers[id].price = priceInput.value;
  juicers[id].stock = stockInput.value;
};

let validation = () => {
  if (brandInput.value =="") {
    alert("Please fill in the brand name!");
    return false;
  } else if (priceInput.value <= 0) {
    alert("Price must be positive!");
    return false;
  } else if (stockInput.value < 0 || stockInput.value == "") {
    alert("Stock can't be negative! If none, enter 0.");
    return false;
  }
  return true;
};

editButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (validation()) {
    changeValues(id);
    clearInputs();
    toggleHomePage();
  }
});

const editJuicers = () => {
  toggleCreatePage();
  title.textContent = "Edit juicer";
  submitButton.style.display = "none";
  editButton.style.display = "block";
};

const toggleHomePage = () => {
  options.style.display = "block";
  searchField.style.display = "flex";
  itemsContainer.style.display = "block";
  createForm.style.display = "none";
  renderJuicers(juicers);
};

const toggleCreatePage = () => {
  options.style.display = "none";
  searchField.style.display = "none";
  itemsContainer.style.display = "none";
  createForm.style.display = "block";
};

createButton.addEventListener("click", () => {
  toggleCreatePage();
});

homeButton.addEventListener("click", () => {
  toggleHomePage();
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (validation()) {
    insertJuicer(id);
    clearInputs;
    toggleHomePage();
  }
});
