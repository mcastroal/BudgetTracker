// =====================
// BUDGET CLASS (OOP)
// =====================
class Budget {
    constructor() {
        this.incomes = []; // Array to store income objects
        this.expenses = []; // Array to store expense objects
    }

    // Method to add a new income item
    addIncome(description, amount) {
        // Create an icome object with unique ID
        const income = {
            id: Date.now(),
            description: description,
            amount: amount
        };

        // Add the new income to the incomes array
        this.incomes.push(income);

        // Return the income object so it can be used in the UI
        return income;
    }

    // Method to add a new expense item
    addExpense(description, amount) {
        // Create an expense object with unique ID
        const expense = {
            id: Date.now(),
            description: description,
            amount: amount
        };

        // Add to new expense to the expenses array
        this.expenses.push(expense);

        // Return the expense object so it can be used in th UI
        return expense;
    }

    // Method to calculate the sum of all incomes
    calculateTotalIncome() {
        let total = 0;

        //Loop through all income items and sum their amounts
        this.incomes.forEach(function(income) {
            total = total + income.amount;
        });

        return total;
    }

    // Method to calculate the sum of all expenses
    calculateTotalExpenses() {
        let total = 0;

        //Loop through all expense items and sum their amounts
        this.expenses.forEach(function(expense) {
            total = total + expense.amount;
        });

        return total;
    }

    // Method to calculate net income
    calculateNetIncome() {
        return this.calculateTotalIncome() - this.calculateTotalExpenses();
    }

    // Getter method to retrieve all incomes
    getIncomes() {
        return this.incomes;
    }

    // Getter method to retrieve all expenses
    getExpenses() {
        return this.expenses;
    }
}

// Global Budget class to use throughout application
const myBudget = new Budget();

//===================
// INPUT VALIDATION
//===================
function validateInput(description, amount) {
    // Check if description is empty
    if (description === '' || description.trim() === '') {
        alert('Please enter a description');
        return false; // Validation failed
    }

    // Check if amount is a not a number
    if (isNaN(amount)) {
        alert('Please enter a valid number for the amount');
        return false; // Validation failed
    }

    // Check if amount is zero or negative
    if (amount <= 0) {
        alert('Please enter an amount greater than 0');
        return false; // Validation Failed
    }

    // All validation checks passed
    return true;
}

//=========================
// CALCULATION FUNCTIONS
//=========================
// Function to calculate and update total income
function updateIncome() {
    // Select all number input fields in the income table
    const allIncomeInputs = document.querySelectorAll('.budget-table--income input[type="number"]');
    let total = 0;

    // Loop through each income input field
    allIncomeInputs.forEach(function(input){
        let value = parseFloat(input.value); // Convert string to number
        // Only add to total if its a valid number
        if (!isNaN(value)) {
            total = total + value; // Add to our total
        }
    });

    // Update the income total at bottom of income table
    document.getElementById('income-total').textContent = '$' + total.toFixed(2);

    // Update the income total in the summary table at the top of the page
    document.getElementById('summary-income').textContent = '$' + total.toFixed(2);

    // Recalculate net income
    updateNetIncome();
}

// Function to calculate and update total expenses
function updateExpenses() {
    // Select all number input fields in the expenses table
    const allExpenseInputs = document.querySelectorAll('.budget-table--expenses input[type="number"]');
    let total = 0;

    // Loop through the each expense input field
    allExpenseInputs.forEach(function(input) {
        let value = parseFloat(input.value); // Convert string to number
        // Only add to total if its a valid number
        if (!isNaN(value)) {
            total = total + value; // Add to our total
        }
    });

    // Update the expense total at bottom of expense table
    document.getElementById('expenses-total').textContent = '$' + total.toFixed(2);

    // Update the expense total in the summary table at the top of the page
    document.getElementById('summary-expenses').textContent = '$' + total.toFixed(2);

    // Recalculate net income
    updateNetIncome();
}

// Function to calculate the net income
function updateNetIncome() {
    // Get the income total and remove dollar sign
    let incomeText = document.getElementById('income-total').textContent;
    let income = parseFloat(incomeText.replace('$', '')); // Convert to number
   
    //Get the expenses total and remove dollar sign
    let expensesText = document.getElementById('expenses-total').textContent;
    let expenses = parseFloat(expensesText.replace('$', '')); // Convert to number

    // Calculate net income
    let netIncome = income - expenses;

    // Update thee net income display in summary table
    document.getElementById('summary-net').textContent = '$' + netIncome.toFixed(2);
}

//======================
// ELEMENT REFERENCES
//======================
// Get references to the Add buttons
const addIncomeBtn = document.getElementById('add-income-btn');
const addExpenseBtn = document.getElementById('add-expense-btn');

// Get references to income input fields
const incomeDescInput = document.getElementById('income-description');
const incomeAmountInput = document.getElementById('income-amount');

//Get references to expense input fields
const expenseDescInput = document.getElementById('expense-description');
const expenseAmountInput = document.getElementById('expense-amount');

//==========================
// ADD INCOME FUNCTIONALITY
//==========================
// Function to add a new income row to the table
function addIncome() {
    // Get the values from the input fields
    let description = incomeDescInput.value.trim(); // Remove extra whitespace
    let amount = parseFloat(incomeAmountInput.value); // Convert to number

    // Validate the input using validatio function
    if (!validateInput(description, amount)) {
        return;
    }

    // Add income to Budget class
    const newIncome = myBudget.addIncome(description, amount);

    // Find the income table body where the new row will go 
    let incomeTableBody = document.querySelector('.budget-table--income tbody');

    // Find the Add Income row to insert before it
    let addRow = incomeTableBody.querySelector('.budget-table__row--add');

    // Create a new table row element
    let newRow = document.createElement('tr');
    newRow.className = 'budget-table__row';
    newRow.setAttribute('data-id', newIncome.id);
    // HTML contents of the new row
    newRow.innerHTML = `
        <th scope="row" class="budget-table__label">
            <input type="text" class="budget-table__input budget-table__input--text" value="${description}">
        </th>
        <td class="budget-table__cell">
            <input type="number" class="budget-table__input" value="${amount}" step="0.01" min="0">
        </td>
    `;

    // Insert the new row before the Add Income row
    incomeTableBody.insertBefore(newRow, addRow);

    // Add event listener to the new amount input to ensure totals update
    let newInput = newRow.querySelector('input[type="number"]');
    newInput.addEventListener('input', updateIncome);

    // Clear the input fields for next entry
    incomeDescInput.value = '';
    incomeAmountInput.value = '';

    // Recalculate and update all totals
    updateIncome();
}

//=============================
// ADD EXPENSE FUNCTIONALITY
//=============================
// Function to add a new expense row to the table
function addExpense() {
    let description = expenseDescInput.value.trim(); // Remove extra whitespace
    let amount = parseFloat(expenseAmountInput.value); // Convert to number

    // Validate the input using validation function
    if (!validateInput(description, amount)) {
        return;
    }

    // Add the expense to Budget class
    const newExpense = myBudget.addExpense(description, amount);

    // Find the expense table body where the new row will go 
    let expenseTableBody = document.querySelector('.budget-table--expenses tbody');

    // Find the ADD Expense row to insert before it
    let addRow = expenseTableBody.querySelector('.budget-table__row--add');

    // Create a new table row element
    let newRow = document.createElement('tr');
    newRow.className = 'budget-table__row';
    newRow.setAttribute('data-id', newExpense.id);
    // HTML contents of new row
    newRow.innerHTML = `
        <th scope="row" class="budget-table__label">
            <input type="text" class="budget-table__input budget-table__input--text" value="${description}">
        </th>
        <td class="budget-table__cell">
            <input type="number" class="budget-table__input" value="${amount}" step="0.01" min="0">
        </td>
    `;

    // Insert the new row before the Add Expense row
    expenseTableBody.insertBefore(newRow, addRow);

    // Add event listener to the new amount input to ensure totals update
    let newInput = newRow.querySelector('input[type="number"]');
    newInput.addEventListener('input', updateExpenses);

    // Clear the input fields for the next entry
    expenseDescInput.value = '';
    expenseAmountInput.value = '';

    // Recalculate and update all totals
    updateExpenses();
}

//==================
// EVENT LISTENERS
//==================
// Listen for button clicks
addIncomeBtn.addEventListener('click', addIncome);
addExpenseBtn.addEventListener('click', addExpense);

// Listen to changes in existing inputs
document.querySelectorAll('.budget-table--income input[type="number"]').forEach(function(input) {
    input.addEventListener('input', updateIncome);
});

document.querySelectorAll('.budget-table--expenses input[type="number"]').forEach(function(input) {
    input.addEventListener('input', updateExpenses);
});
