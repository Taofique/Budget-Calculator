let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
let tempAmount = 0;

// Setting Budget Functions

totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  // if Bad input
  if (tempAmount == "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Setting Budget
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;

    //clearing input and set the input to placeholder text
    totalAmount.value = "";
    totalAmount.placeholder = "Enter Total Amount";
  }
});

// Disabling Edit and Delete button Functions

const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

// Modifying list elements function for modal pop up and edit

const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = parseInt(balanceValue.innerText);
  let currentExpense = parseInt(expenditureValue.innerText);
  let parentAmount = parseInt(parentDiv.querySelector(".amount").innerText);

  if (edit) {
    // Open modal for editing
    const modal = document.getElementById("editModal");
    const productEdit = document.getElementById("productEdit");
    const amountEdit = document.getElementById("amountEdit");
    const saveChanges = document.getElementById("saveChanges");

    // Pre-fill modal inputs
    productEdit.value = parentDiv.querySelector(".product").innerText;
    amountEdit.value = parentAmount;

    // Show the modal
    modal.style.display = "block";

    // Save changes handler
    saveChanges.onclick = () => {
      const newProduct = productEdit.value;
      const newAmount = parseInt(amountEdit.value);

      if (!isNaN(newAmount)) {
        // Update balance and expenditure
        balanceValue.innerText = currentBalance + parentAmount - newAmount;
        expenditureValue.innerText = currentExpense - parentAmount + newAmount;

        // Update parent element
        parentDiv.querySelector(".product").innerText = newProduct;
        parentDiv.querySelector(".amount").innerText = newAmount;

        // Close modal
        modal.style.display = "none";
      } else {
        alert("Please enter a valid amount.");
      }
    };

    // Close modal on click of 'X'
    document.getElementById("closeModal").onclick = () => {
      modal.style.display = "none";
    };

    return; // Exit function for edit mode
  }

  // Update balance and expenditure for non-edit mode
  balanceValue.innerText = currentBalance + parentAmount;
  expenditureValue.innerText = currentExpense - parentAmount;

  // Remove element
  parentDiv.remove();
};

// Creating list function

const listCreator = (expenseName, expenseValue) => {
  let subListContent = document.createElement("div");
  subListContent.classList.add("sublist-content", "flex-space");
  list.appendChild(subListContent);
  subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  subListContent.appendChild(editButton);
  subListContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(subListContent);
};

// Addiing expenses function

checkAmountButton.addEventListener("click", () => {
  // Checking if empty
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  // Enabling buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  // Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  // Total balance = budget - total expense
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Creating list
  listCreator(productTitle.value, userAmount.value);
  //Clearing inputs
  productTitle.value = "";
  userAmount.value = "";
});
