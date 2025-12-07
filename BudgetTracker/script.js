//BUDGET CLASS
class Budget {
    constructor() {
        this.incomes = []; //array to store income
        this.expenses = []; //array to store expense
    }

    //add a new income
    addIncome(description, amount) {
        const income = {
            id: Date.now(),
            description: description,
            amount: amount
        };
        //add to incomes array
        this.incomes.push(income);

        return income;
    }

    //add a new expense
    addExpense(description, amount) {
        const expense = {
            id: Date.now(),
            description: description,
            amount: amount
        };
        //add to expenses array
        this.expenses.push(expense);

        return expense;
    }

    //calculate the total income
    calculateTotalIncome() {
        let total = 0;

        this.incomes.forEach(function(income) {
            total = total + income.amount;
        });

        return total;
    }

    //calculate the total expenses
    calculateTotalExpenses() {
        let total = 0;

        this.expenses.forEach(function(expense) {
            total = total + expense.amount;
        });

        return total;
    }

    //calculate net income
    calculateNetIncome() {
        return this.calculateTotalIncome() - this.calculateTotalExpenses();
    }

    //get all incomes
    getIncomes() {
        return this.incomes;
    }

    //get all expenses
    getExpenses() {
        return this.expenses;
    }
}

const myBudget = new Budget();

//VALIDATION
function validateInput(description, amount) {
    //check if description is empty
    if (description === '' || description.trim() === '') {
        alert('Please enter a description');
        return false;
    }
    //check if amount is a valid number
    if (isNaN(amount)) {
        alert('Please enter a valid number for the amount');
        return false;
    }
    //check if amount is zero or negative
    if (amount <= 0) {
        alert('Please enter an amount greater than 0');
        return false;
    }

    //all validation passed
    return true;
}

//CALCULATION
//Function to add incomes
function updateIncome() {
    const allIncomeInputs = document.querySelectorAll('.budget-table--income input[type="number"]');
    let total = 0;

    //loop through each income
    allIncomeInputs.forEach(function(input){
        let value = parseFloat(input.value); //get the number from the box
        if (!isNaN(value)) { //ensure its a number
            total = total + value; //add to our total
        }
    });

    //update the income total in the income table
    document.getElementById('income-total').textContent = '$' + total.toFixed(2);

    //update the income total in the summary table
    document.getElementById('summary-income').textContent = '$' + total.toFixed(2);

    //recalculate net income
    updateNetIncome();
}

//function to add the expenses
function updateExpenses() {
    const allExpenseInputs = document.querySelectorAll('.budget-table--expenses input[type="number"]');
    let total = 0;

    //loop through the expenses
    allExpenseInputs.forEach(function(input) {
        let value = parseFloat(input.value); //get the number from the box
        if (!isNaN(value)) { //ensure its a number
            total = total + value; //add to our total
        }
    });

    //update the expense total in the expense table
    document.getElementById('expenses-total').textContent = '$' + total.toFixed(2);

    //update the expense total in the summary table
    document.getElementById('summary-expenses').textContent = '$' + total.toFixed(2);

    //recalculate net income
    updateNetIncome();
}

//Function to calculate the net income
function updateNetIncome() {
    // get the income total and remove dollar sign
    let incomeText = document.getElementById('income-total').textContent;
    let income = parseFloat(incomeText.replace('$', ''));

    let expensesText = document.getElementById('expenses-total').textContent;
    let expenses = parseFloat(expensesText.replace('$', ''));

    //subtract expenses from income
    let netIncome = income - expenses;

    //update net income in summary table
    document.getElementById('summary-net').textContent = '$' + netIncome.toFixed(2);
}

//BUTTON FUNCTIONALITY
const addIncomeBtn = document.getElementById('add-income-btn');
const addExpenseBtn = document.getElementById('add-expense-btn');

const incomeDescInput = document.getElementById('income-description');
const incomeAmountInput = document.getElementById('income-amount');

const expenseDescInput = document.getElementById('expense-description');
const expenseAmountInput = document.getElementById('expense-amount');

//Function to add a new income row
function addIncome() {
    let description = incomeDescInput.value.trim();
    let amount = parseFloat(incomeAmountInput.value);

    //Validation
    if (!validateInput(description, amount)) {
        return;
    }

    //Add to Budget class
    const newIncome = myBudget.addIncome(description, amount);

    //Find where the new row will go 
    let incomeTableBody = document.querySelector('.budget-table--income tbody');
    let addRow = incomeTableBody.querySelector('.budget-table__row--add');

    //Create a new row
    let newRow = document.createElement('tr');
    newRow.className = 'budget-table__row';
    newRow.setAttribute('data-id', newIncome.id);
    newRow.innerHTML = `
        <th scope="row" class="budget-table__label">
            <input type="text" class="budget-table__input budget-table__input--text" value="${description}">
        </th>
        <td class="budget-table__cell">
            <input type="number" class="budget-table__input" value="${amount}" step="0.01" min="0">
        </td>
    `;

    //Insert the new row before the Add Income row
    incomeTableBody.insertBefore(newRow, addRow);

    //Event listener to update totals
    let newInput = newRow.querySelector('input[type="number"]');
    newInput.addEventListener('input', updateIncome);

    //Clear the input fields
    incomeDescInput.value = '';
    incomeAmountInput.value = '';

    //Update the totals using Budget class
    updateIncome();
}

//Function to add a new expense row
function addExpense() {
    let description = expenseDescInput.value.trim();
    let amount = parseFloat(expenseAmountInput.value);

    //Validation
    if (!validateInput(description, amount)) {
        return;
    }

    //Add to Budget class
    const newExpense = myBudget.addExpense(description, amount);

    //Find where the new row will go 
    let expenseTableBody = document.querySelector('.budget-table--expenses tbody');
    let addRow = expenseTableBody.querySelector('.budget-table__row--add');

    //Create a new row
    let newRow = document.createElement('tr');
    newRow.className = 'budget-table__row';
    newRow.setAttribute('data-id', newExpense.id);
    newRow.innerHTML = `
        <th scope="row" class="budget-table__label">
            <input type="text" class="budget-table__input budget-table__input--text" value="${description}">
        </th>
        <td class="budget-table__cell">
            <input type="number" class="budget-table__input" value="${amount}" step="0.01" min="0">
        </td>
    `;

    //Insert the new row before the Add Expense row
    expenseTableBody.insertBefore(newRow, addRow);

    //Event listener to update totals
    let newInput = newRow.querySelector('input[type="number"]');
    newInput.addEventListener('input', updateExpenses);

    //Clear the input fields
    expenseDescInput.value = '';
    expenseAmountInput.value = '';

    //Update the totals using Budget class
    updateExpenses();
}

//listen for button clicks
addIncomeBtn.addEventListener('click', addIncome);
addExpenseBtn.addEventListener('click', addExpense);

//listen to changes in existing inputs
document.querySelectorAll('.budget-table--income input[type="number"]').forEach(function(input) {
    input.addEventListener('input', updateIncome);
});

document.querySelectorAll('.budget-table--expenses input[type="number"]').forEach(function(input) {
    input.addEventListener('input', updateExpenses);
});