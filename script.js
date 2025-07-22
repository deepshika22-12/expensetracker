let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("expense-form");
const amountInput = document.getElementById("amount");
const descInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

// Format number as Indian currency (₹1,00,000.00)
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${formatINR(expense.amount)} - ${expense.description} [${expense.category}]
      <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
    total += Number(expense.amount);
  });

  totalDisplay.textContent = formatINR(total);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expense = {
    amount: amountInput.value,
    description: descInput.value,
    category: categoryInput.value,
  };

  expenses.push(expense);
  saveExpenses();
  renderExpenses();

  // Clear form
  form.reset();
});

renderExpenses();
