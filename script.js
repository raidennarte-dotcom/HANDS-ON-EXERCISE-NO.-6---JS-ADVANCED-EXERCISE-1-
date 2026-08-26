let numbers = [];
let displayTotal = false;
let displayHighLow = false;

function insertNumber() {
  const input = document.getElementById("numInput");
  const val = parseInt(input.value, 10);

  if (isNaN(val) || val <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  numbers.push(val);
  input.value = "";
  input.focus();
  render();
}

function clearEntry() {
  document.getElementById("numInput").value = "";
}

function clearItems() {
  numbers = [];
  displayTotal = false;
  displayHighLow = false;
  document.getElementById("sortSelect").value = "";
  render();
}

function removeRow(index) {
  numbers.splice(index, 1);
  render();
}

function editRow(index) {
  const currentVal = numbers[index];
  const newValString = prompt("Enter new number:", currentVal);

  if (newValString === null) return; // Cancel pressed

  const newVal = parseInt(newValString, 10);
  if (isNaN(newVal) || newVal <= 0) {
    alert("Invalid input. Must be a positive number.");
    return;
  }

  numbers[index] = newVal;
  render();
}

function getTotal() {
  displayTotal = true;
  render();
}

function identifyHighLow() {
  displayHighLow = true;
  render();
}

function handleSort() {
  const criterion = document.getElementById("sortSelect").value;
  if (criterion === "asc") {
    numbers.sort((a, b) => a - b);
  } else if (criterion === "desc") {
    numbers.sort((a, b) => b - a);
  }
  render();
}

function render() {
  const table = document.getElementById("numbersTable");
  table.innerHTML = "";

  numbers.forEach((num, index) => {
    const row = document.createElement("tr");

    const numTd = document.createElement("td");
    numTd.innerText = num;
    row.appendChild(numTd);

    const typeTd = document.createElement("td");
    if (num % 2 === 0) {
      typeTd.innerText = "EVEN";
      typeTd.className = "even-label";
    } else {
      typeTd.innerText = "ODD";
      typeTd.className = "odd-label";
    }
    row.appendChild(typeTd);

    const actionsTd = document.createElement("td");

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.className = "action-btn";
    removeBtn.onclick = () => removeRow(index);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "action-btn";
    editBtn.onclick = () => editRow(index);

    actionsTd.appendChild(removeBtn);
    actionsTd.appendChild(editBtn);
    row.appendChild(actionsTd);

    table.appendChild(row);
  });

  const summarySection = document.getElementById("summarySection");
  summarySection.innerHTML = "";

  if (numbers.length > 0) {
    if (displayTotal) {
      const total = numbers.reduce((sum, current) => sum + current, 0);
      summarySection.innerHTML += `<div>TOTAL &nbsp; <span style="text-decoration: underline;">${total}</span></div>`;
    }
    if (displayHighLow) {
      const highest = Math.max(...numbers);
      const lowest = Math.min(...numbers);
      summarySection.innerHTML += `<div>HIGHEST &nbsp; <span style="text-decoration: underline;">${highest}</span></div>`;
      summarySection.innerHTML += `<div>LOWEST &nbsp; <span style="text-decoration: underline;">${lowest}</span></div>`;
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("numInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") insertNumber();
    });
});
