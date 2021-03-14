var mainContainer = document.getElementById("container")
var table = document.getElementById("main_list")
var firstNameInput = document.getElementById("first_name_input")
var lastNameInput = document.getElementById("last_name_input")
var cityNameInput = document.getElementById("city_input")
var addBtn = document.getElementById("add_action")
var popUp = document.getElementById("addRecordPopup")
var errorMsg = document.getElementById("error_msg")
var noDataMsg = document.getElementById("no_data_msg")
var errorMsg = document.getElementById("error_msg")
var editedErrorMsg = document.getElementById("edited_error_msg")
var editPopup = document.getElementById("edit_record")
var editableFirstNameInput = document.getElementById("editable_first_name")
var editableLastNameInput = document.getElementById("editable_last_name")
var editableCityInput = document.getElementById("editable_city")

var idNumber = 0
function generateId(){
    var lineId = idNumber +"line"
    idNumber++
    return lineId
}
function noData(){
if(table.children.length>1){
    noDataMsg.classList.add("hidden")
}else if(table.children.length==1 && noDataMsg.classList.contains("hidden")){
    noDataMsg.classList.remove("hidden")
}
}
function clearInputValues(){
    firstNameInput.value = ""
    lastNameInput.value = ""
    cityNameInput.value = ""
}

function openPopup(){
    popUp.classList.remove("hidden")
    popUp.classList.add("flex")
    mainContainer.style.opacity = "0.1"
}

function closePopUp(){
    if(popUp.classList.contains("flex")){
        popUp.classList.add("hidden")
        popUp.classList.remove("flex")
    }
    mainContainer.style.opacity= "1"
    clearInputValues()
    if(errorMsg.classList.contains("hidden")){
        return true
    }else {
    errorMsg.classList.add("hidden")
    }
}

function closeEditPopup(){
    if(editPopup.classList.contains("flex")){
        editPopup.classList.add("hidden")
        editPopup.classList.remove("flex")
    }
    mainContainer.style.opacity= "1"
    clearInputValues()
    if(editedErrorMsg.classList.contains("hidden")){
        return true
    }else {
    editedErrorMsg.classList.add("hidden")
    }
}

const d = new Date();

var data = []

 

function createEditButton(){
    var editButton = document.createElement("button")
    editButton.innerHTML = '<i class="fa fa-edit"></i>'
    editButton.classList.add("actions_style")
    editButton.setAttribute("id", 'edit_action');
    //function for clicking on edit button
    return editButton
}

function openEditPopup(){
    //open edit popup
editPopup.classList.remove("hidden");
editPopup.classList.add("flex");
mainContainer.style.opacity = "0.1";
var rowIndex = (Array.prototype.indexOf.call(table.children, event.target.parentElement.parentElement))
// fill inputs with correct values
editableFirstNameInput.value = data[rowIndex -1].firstname
editableLastNameInput.value = data[rowIndex -1].lastname
editableCityInput.value = data[rowIndex -1].city
}

function createDeleteButton(){
    var deleteButton = document.createElement("button")
    deleteButton.innerHTML = '<i class="fa fa-trash">'
    deleteButton.classList.add("actions_style")
    deleteButton.setAttribute("id",'delete_action')
    deleteButton.addEventListener("click", function deleteUser(){
    })
    return deleteButton 
}
function createUserRow(){
    var userRow = document.createElement("tr")
        userRow.classList.add("font")
        return userRow

}

function createActionsColumn(){
    var deleteButton = createDeleteButton()
    var editButton = createEditButton()
    var actions = document.createElement("td")
    actions.classList.add("actions")
    actions.appendChild(editButton)
    actions.appendChild(deleteButton)
    return actions
}

function createDate(){
    var date = document.createElement("td")
        date.innerHTML = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()
        return date
}
function createTime(){
    var time = document.createElement("td")
    time.innerHTML = d.getHours() + ":" + d.getMinutes()
    return time
}
function appendChildren(){
    userRow.appendChild(fullNameCell)
    userRow.appendChild(cityNameCell)
    userRow.appendChild(date)
    userRow.appendChild(time)
    userRow.appendChild(actions)
    table.appendChild(userRow)
}

function render(){
    while(table.rows.length>1){ 
        table.deleteRow(1)
    }
    data.forEach(row => {
        var userRow = createUserRow()
        var fullNameCell = document.createElement("td")
        var cityNameCell = document.createElement("td")
        var date = createDate()
        var time = createTime()
        var actions = createActionsColumn()
        fullNameCell.innerHTML = row.firstname + " " + row.lastname
        cityNameCell.innerHTML = row.city
appendChildren
    })
  }

  function addUser(){
      event.preventDefault()
    var user = { 
        firstname: firstNameInput.value,
        lastname: lastNameInput.value,
        city: cityNameInput.value
    }

    data.push(user)
    render()
    noData()
    closePopUp()
}

function editRecord(){
    event.preventDefault()


}




