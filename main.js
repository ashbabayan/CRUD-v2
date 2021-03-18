var mainContainer = document.getElementById("container");
var table = document.getElementById("main_list");
var tableBody = document.getElementById("table_body");
var firstNameInput = document.getElementById("first_name_input");
var lastNameInput = document.getElementById("last_name_input");
var cityNameInput = document.getElementById("city_input");
var addBtn = document.getElementById("add_action");
var popUp = document.getElementById("add_record_popup");
var deleteConfirmPopup = document.getElementById("delete_confirmation_popup")
var invalidAddErrorMsg = document.getElementById("validation_adding_error_message");
var noDataMsg = document.getElementById("no_data_msg");
var invalidEditErrorMsg = document.getElementById("validation_editing_error_message");
var editPopup = document.getElementById("edit_record_popup");
var editableFirstNameInput = document.getElementById("editable_first_name");
var editableLastNameInput = document.getElementById("editable_last_name");
var editableCityInput = document.getElementById("editable_city");
var searchInput = document.getElementById("searchbox");
var pageRowsQty = document.getElementById("page_rows_count")
var numbers = /\d/;

const d = new Date();
var data = [];
var userIndex;



const closeConfirmPopup = () => {
    deleteConfirmPopup.classList.add("hidden")
}
const checkAddRecordValidation = () => {
    return (!(firstNameInput.value && lastNameInput.value && cityNameInput.value));
}

const checkNumberValidation = () => {
    return ((numbers.test(firstNameInput.value) || numbers.test(lastNameInput.value) || numbers.test(cityNameInput.value)));
}

const checkEditRecordValidation = () => {
    return (!(editableFirstNameInput.value && editableLastNameInput.value && editableCityInput.value));
}

const checkEditedNumberValidation = () => {
    return (numbers.test(editableFirstNameInput.value) || numbers.test(editableLastNameInput.value) || numbers.test(editableCityInput.value));
}

const toggleEmptyDataMsg = () => {
    if (table.rows.length > 1) {
        noDataMsg.classList.add("hidden");
    } else if (table.rows.length == 1 && noDataMsg.classList.contains("hidden")) {
        noDataMsg.classList.remove("hidden");
    }
}

const setRowsQty = () => {

}

const clearInputValues = () => {
    firstNameInput.value = "";
    lastNameInput.value = "";
    cityNameInput.value = "";
}

window.onclick = function(event) {
    if (event.target == popUp) {
        popUp.classList.add("hidden");
        mainContainer.style.opacity= "1";
        clearInputValues()        
    } else if (event.target == deleteConfirmPopup) {
        deleteConfirmPopup.classList.add("hidden");
        mainContainer.style.opacity = "1";
        clearInputValues()
    } else if (event.target == editPopup) {
        editPopup.classList.add("hidden");
        mainContainer.style.opacity = "1";
        clearInputValues()
    }
}

const openAddRecordPopup = () => {
    popUp.classList.remove("hidden");
    popUp.classList.add("popup_style");
    mainContainer.style.opacity = "0.1";
}

const closeAddRecordPopUp = () => {
    if (popUp.classList.contains("popup_style")) {
        popUp.classList.add("hidden");
        popUp.classList.remove("popup_style");
    }
        mainContainer.style.opacity= "1";
        clearInputValues();
    if (invalidAddErrorMsg.classList.contains("hidden")) {
        return true
    } else {
        invalidAddErrorMsg.classList.add("hidden")
    }
}

const openEditPopup = () => {
    editPopup.classList.remove("hidden");
    editPopup.classList.add("popup_style");
    mainContainer.style.opacity = "0.1";
}

const closeEditPopup = () => {
    if (editPopup.classList.contains("popup_style")) {
        editPopup.classList.add("hidden");
        editPopup.classList.remove("popup_style");
    }
    mainContainer.style.opacity= "1";
    clearInputValues();
    if (invalidEditErrorMsg.classList.contains("hidden")) {
        return true;
    } else {
        invalidEditErrorMsg.classList.add("hidden");
    }
}

const createEditButton = (index) => {
    var editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa fa-edit"></i>';
        editButton.classList.add("actions_style");
        editButton.setAttribute("id", 'edit_action');
        editButton.addEventListener("click", (e) => {
            openEditPopup();
            editableFirstNameInput.value = data[index].firstname;
            editableLastNameInput.value = data[index].lastname;
            editableCityInput.value = data[index].city;
            userIndex = index;
        })
    return editButton
}

const deleteRecord = (index) => {
    data.splice(index, 1);
            render(data);
            closeConfirmPopup ()
}


const createDeleteButton = (index) => {
    var deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa fa-trash">';
        deleteButton.classList.add("actions_style");
        deleteButton.setAttribute("id",'delete_action');
        deleteButton.addEventListener("click", (e) => {
            deleteConfirmPopup.classList.remove("hidden")
        })
    return deleteButton 
}

const createActionsColumn = (index) => {
    var deleteButton = createDeleteButton(index);
    var editButton = createEditButton(index);
    var actions = document.createElement("td");
        actions.classList.add("actions");
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
    return actions
}

const createDate = () => {
    var date = document.createElement("td");
        date.innerHTML = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();
    return date
}

const createTime = () => {
    var time = document.createElement("td");
        time.innerHTML = d.getHours() + ":" + d.getMinutes();
    return time
}

const createUserRow = () => {
    var userRow = document.createElement("tr");
        userRow.classList.add("user_record");
    return userRow
}

const render = (data) => {
    while (table.rows.length > 1) { 
        table.deleteRow(1);
    }
    data.forEach ((row, index) => {
        var userRow = createUserRow()
        var fullNameCell = document.createElement("td");
        var cityNameCell = document.createElement("td");
        var date = createDate();
        var time = createTime();
        var actions = createActionsColumn(index);
        fullNameCell.innerHTML = row.firstname + " " + row.lastname;
        cityNameCell.innerHTML = row.city;
        userRow.appendChild(fullNameCell);
        userRow.appendChild(cityNameCell);
        userRow.appendChild(date);
        userRow.appendChild(time);
        userRow.appendChild(actions);
        tableBody.appendChild(userRow);
    });
    toggleEmptyDataMsg()
}

const addUser = () => {
    var user = { 
        firstname: firstNameInput.value,
        lastname: lastNameInput.value,
        city: cityNameInput.value
    }
    if (checkAddRecordValidation() || checkNumberValidation()) {
        invalidAddErrorMsg.classList.remove("hidden");
        return
    }
    data.push(user);
    render(data)
    closeAddRecordPopUp();
}

const editRecord = () => {
    if (checkEditRecordValidation() || checkEditedNumberValidation()) {
        invalidEditErrorMsg.classList.remove("hidden")
        return
    } 
    data[userIndex].firstname = editableFirstNameInput.value;
    data[userIndex].lastname = editableLastNameInput.value;
    data[userIndex].city = editableCityInput.value;
    render(data);
    closeEditPopup()
}

const search = () => {
    const searchedData = data.filter (row  => {
       return row.firstname.toLowerCase().includes(searchInput.value.toLowerCase()) || row.lastname.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    render(searchedData)
}