const BASE = "https://my-json-server.typicode.com/mzubkova/db-json/invoices";

function getInvoices() {
  return axios
    .get(BASE)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("error");
      return [];
    });
}

const listContainer = document.querySelector(
  ".invoices-list-section .list-group"
);
const form = document.forms.addInvoice;
const inputNumber = form.elements.number;
const inputCreate = form.elements["date-created"];
const inputSupply = form.elements["date-supplied"];
const inputComment = form.elements.comment;

renderAllInvoices(getInvoices);
form.addEventListener("submit", onFormSubmitHandler);
listContainer.addEventListener("click", onDeleteHandler);

function renderAllInvoices(invoicesList) {
  if (!invoicesList) {
    console.error("Pass the list of invoices!");
    return;
  }

  const fragment = document.createDocumentFragment();
  Object.values(invoicesList).forEach((invoice) => {
    const tr = listItemTemplate(invoice);
    fragment.appendChild(tr);
  });
  listContainer.appendChild(fragment);
}

function listItemTemplate({
  _id,
  number,
  date_created,
  date_supplied,
  comment,
} = {}) {
  function getListInvoices() {
    let result = [];

    for (let i = 1; i <= 1; i++) {
      let div = document.createElement("div");
      div.append(spanCreated, spanNumber, spanSupplied, spanComment, deleteBtn);
      div.classList.add("invoices-lists__table-col");
      result.push(div);
    }

    return result;
  }

  const div = document.createElement("div");
  div.classList.add("list-group-item");
  div.setAttribute("data-invoice-id", _id);

  const spanCreated = document.createElement("div");
  spanCreated.textContent = date_created;
  spanCreated.classList.add("col", "col-3");
  const spanNumber = document.createElement("div");
  spanNumber.textContent = number;
  spanNumber.classList.add("col", "col-3");
  const spanSupplied = document.createElement("div");
  spanSupplied.textContent = date_supplied;
  spanSupplied.classList.add("col", "col-3");
  const spanComment = document.createElement("div");
  spanComment.textContent = comment;
  spanComment.classList.add("col", "col-3");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn--remove");

  div.append(...getListInvoices());

  return div;
}

function onFormSubmitHandler(e) {
  e.preventDefault();
  const numberValue = inputNumber.value;
  const dateCreateValue = inputCreate.value;
  const dateSupplyValue = inputSupply.value;
  const commentValue = inputComment.value;

  if (!numberValue || !dateCreateValue || !dateSupplyValue || !commentValue) {
    alert("Please enter a number, date and comment");
    return;
  }

  if (!/^[0-9]{3,}$/.test(numberValue)) {
    alert(
      "Please only enter numeric characters!(0-9) text field that should have at least 3 symbols"
    );
    return;
  }

  if (!/^[0-9_-]{3,}$/.test(dateCreateValue && dateSupplyValue)) {
    alert("Please only enter numeric characters!(0-9)");
    return;
  }

  if (!/^[a-z0-9_-]{1,160}$/.test(commentValue)) {
    alert("Your comment must be 160 characters or less!");
    return;
  }

  const invoice = createNewInvoice(
    numberValue,
    dateCreateValue,
    dateSupplyValue,
    commentValue
  );
  const listItem = listItemTemplate(invoice);
  listContainer.insertAdjacentElement("afterbegin", listItem);
  form.reset();
}

function createNewInvoice(number, date_created, date_supplied, comment) {
  const newInvoice = {
    number,
    date_created,
    date_supplied,
    comment,
    _id: `invoice-${Math.random()}`,
  };

  getInvoices[newInvoice._id] = newInvoice;

  return { ...newInvoice };
}

function removeInvoice(id) {
  const isConfirm = confirm("You want to delete invoice?");
  if (!isConfirm) return isConfirm;
  delete getInvoices.id;
  return isConfirm;
}

function removeInvoiceFromHtml(confirmed, el) {
  if (!confirmed) return;
  el.remove();
}

function onDeleteHandler({ target }) {
  if (target.classList.contains("btn--remove")) {
    const parent = target.closest("[data-invoice-id]");
    const id = parent.dataset.invoiceId;
    const confirmed = removeInvoice(id);
    removeInvoiceFromHtml(confirmed, parent);
  }
}
getInvoices().then(renderAllInvoices);
