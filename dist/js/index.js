const tasks = [
  {
    _id: "5ba37c48185c0c98e6880bed",
    number: 63805,
    date_created: "23-11-2015",
    date_supplied: "20-06-2016",
    comment: "ad do labore nisi qui dolore Lorem sint tempor velit",
  },
  {
    _id: "5ba37c486790868e50ae1d80",
    number: 60568,
    date_created: "11-07-2017",
    date_supplied: "10-12-2016",
    comment: "labore eu cupidatat nisi mollit ex laboris ut aliquip deserunt",
  },
  {
    _id: "5ba37c482a821da190f890a3",
    number: 23596,
    date_created: "22-08-2016",
    date_supplied: "17-11-2015",
    comment:
      "deserunt consectetur eu tempor do aliquip deserunt aliqua do adipisicing",
  },
  {
    _id: "5ba37c481ebf9bc589fef5d0",
    number: 42175,
    date_created: "24-09-2014",
    date_supplied: "30-06-2018",
    comment: "veniam et est aliquip non ut cupidatat occaecat ipsum qui",
  },
  {
    _id: "5ba37c48c2d8c45a2a04a91e",
    number: 88299,
    date_created: "18-10-2017",
    date_supplied: "24-01-2014",
    comment: "do minim elit nulla mollit culpa officia do pariatur ullamco",
  },
  {
    _id: "5ba37c48671ae1de6d480a60",
    number: 40593,
    date_created: "27-08-2018",
    date_supplied: "12-02-2018",
    comment:
      "eiusmod mollit nostrud aliquip nulla Lorem proident dolore nostrud quis",
  },
  {
    _id: "5ba37c48c2882eacf4c434f4",
    number: 14266,
    date_created: "25-12-2017",
    date_supplied: "31-10-2016",
    comment: "labore eu do dolore deserunt sunt elit nulla magna officia",
  },
  {
    _id: "5ba37c484d2f231ddf2e824e",
    number: 74644,
    date_created: "25-11-2016",
    date_supplied: "15-07-2017",
    comment:
      "amet consequat adipisicing mollit eu nostrud anim pariatur eiusmod ullamco",
  },
  {
    _id: "5ba37c48e44ac4fed3bc9d41",
    number: 55509,
    date_created: "16-02-2014",
    date_supplied: "29-08-2015",
    comment: "duis sint culpa magna adipisicing id id Lorem minim ad",
  },
  {
    _id: "5ba37c486024775344d497e6",
    number: 18041,
    date_created: "30-01-2018",
    date_supplied: "05-06-2016",
    comment:
      "incididunt esse amet reprehenderit in exercitation in incididunt exercitation aliqua",
  },
];
(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputNumber = form.elements["number"];
  const inputCreate = form.elements["date-created"];
  const inputSupply = form.elements["date-supplied"];
  const inputComment = form.elements["comment"];

  renderAllTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error("Pass the list of invoices!");
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const tr = listItemTemplate(task);
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
        div.append(spanCreated, spanNumber, spanSupplied, spanComment);
        div.classList.add("invoices-lists__table-col");
        result.push(div);
      }

      return result;
    }

    const div = document.createElement("div");
    div.classList.add("list-group-item");
    div.setAttribute("data-task-id", _id);

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

    if (
      !/^[0-9]{3,}$/.test(numberValue && dateCreateValue && dateSupplyValue)
    ) {
      alert("Please only enter numeric characters!(0-9)");
      return;
    }

    if (!/^[a-z0-9_-]{1,160}$/.test(commentValue)) {
      alert("Your comment must be 160 characters or less!");
      return;
    }

    const task = createNewTask(
      numberValue,
      dateCreateValue,
      dateSupplyValue,
      commentValue
    );
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  function createNewTask(number, date_created, date_supplied, comment) {
    const newTask = {
      number,
      date_created,
      date_supplied,
      comment,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }
})(tasks);
