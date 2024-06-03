function handleFormData(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expenseDetails = {
        amount: amount,
        description: description,
        category: category,
    }
    const uniqueKey = description;
    localStorage.setItem(uniqueKey, JSON.stringify(expenseDetails));
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    displayExpenses();
}

function displayExpenses() {
    const expenseList = document.querySelector('ul');
    expenseList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let expense = JSON.parse(localStorage.getItem(key));

        let listItem = document.createElement('li');
        listItem.textContent = `${expense.amount}-${expense.category}-${expense.description}  `;

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit Details';
        editButton.addEventListener('click', function () {
            localStorage.removeItem(key);
            listItem.remove();

            document.getElementById('amount').value = expense.amount;
            document.getElementById('category').value = expense.category;
            document.getElementById('description').value = expense.description;
        })
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function(){
            localStorage.removeItem(key);
            listItem.remove();
        })
        listItem.className ='list-group-item'
        listItem.appendChild(editButton);
        listItem.appendChild(deleteBtn);
        expenseList.appendChild(listItem);
    }
}
document.addEventListener("DOMContentLoaded", displayExpenses);