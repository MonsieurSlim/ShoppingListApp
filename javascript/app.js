var addToList = document.getElementById("input_list_item");
var addButton = document.getElementsByTagName("button")[0];
var unPurchased = document.getElementById("unPurchased_items");
var purchased = document.getElementById("purchased_items");



//New Task List Item
var createNewItemElement = function(itemString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); // text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
  //Each element needs modifying

  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = itemString;
  
  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}



//Create new list element
var createList = function () {
console.log("createList");//for tests

var listItem = createNewItemElement(addToList.value);
  //Append listItem to incompleteTasksHolder
  unPurchased.appendChild(listItem);
  bindShopEvents(listItem, itemPurchased);
  
  addToList.value = "";

}




//Edit an existing item
var editList = function() {
  console.log("Edit list...");

  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");


//if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
  
}

//Delete an existing task
var deleteList = function() {
  console.log("Delete item...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}



//Mark an item as purchased
var itemPurchased = function() {
  console.log("Item purchased...");
  //Append the shop list item to the #purchased_items
  var listItem = this.parentNode;
  purchased.appendChild(listItem);
  bindShopEvents(listItem, itemUnPurchased);
}



//Mark an item as unPurchased
var itemUnPurchased = function() {
  console.log("Item unPurchased...");
  //Append the shop list item to the #unPurchased_items
  var listItem = this.parentNode;
  unPurchased.appendChild(listItem);
  bindShopEvents(listItem, itemPurchased);
}



var bindShopEvents = function(shopListItem, checkBoxEventHandler) {
console.log("Binding shop events to their functions");//for testing

var checkBox = shopListItem.querySelector("input[type=checkbox]");
var editButton = shopListItem.querySelector("button.edit");
var deleteButton = shopListItem.querySelector("button.delete");

// editButton.attachEvent('onclick', editList);
// editButton.addEventListener('click', editList , false);

// deleteButton.attachEvent('onclick', deleteList);
// deleteButton.addEventListener('click', deleteList , false);

//link edit button to edit task
editButton.onclick = editList;

//link delete button to delete task
deleteButton.onclick = deleteList;

//link checkbox to checkBoxEventHandler
checkBox.onchange = checkBoxEventHandler;

// checkBox.attachEvent('onchange', checkBoxEventHandler);
// checkBox.addEventListener('change', checkBoxEventHandler , false);
}

var ajaxRequest = function() {
  console.log("AJAX request");
}


//Set the click handler to the createList function
addButton.addEventListener("click", createList);
addButton.addEventListener("click", ajaxRequest);


// addButton.onclick = createList;


for (var i = 0 ; i < unPurchased.length ; i++) {
	bindShopEvents(unPurchased.children[i], itemUnPurchased);
}

for (var i = 0 ; i < purchased.length ; i++) {
	bindShopEvents(purchased.children[i], itemPurchased);
}