let array = [];
let selectedIndex = null;
let sortDirection = {};

window.onload = function () {
    addFilterInputs();
    addSortHandlers();
};

function onFormSubmit() {
    if (validate()) {
        const formData = readFormData();
        if (selectedIndex === null) {
            array.push(formData);
        } else {
            array[selectedIndex] = formData;
        }
        resetForm();
        printArray();
    }
}

function readFormData() {
    return {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        salary: parseFloat(document.getElementById("salary").value),
        city: document.getElementById("city").value.trim()
    };
}

function printArray() {
    const tableBody = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";

    const filteredArray = array.filter(filterRow);

    filteredArray.forEach((record, index) => {
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).innerText = record.fullName;
        newRow.insertCell(1).innerText = record.email;
        newRow.insertCell(2).innerText = record.salary;
        newRow.insertCell(3).innerText = record.city;
        newRow.insertCell(4).innerHTML =
            `<a onclick="onEdit(${index})">Módosítás</a> 
             <a onclick="onDelete(${index})">Törlés</a>`;
    });
}

function onEdit(index) {
    const record = array[index];
    document.getElementById("fullName").value = record.fullName;
    document.getElementById("email").value = record.email;
    document.getElementById("salary").value = record.salary;
    document.getElementById("city").value = record.city;
    selectedIndex = index;
}

function onDelete(index) {
    if (confirm("Biztosan törlöd ezt a adatot?")) {
        array.splice(index, 1);
        resetForm();
        printArray();
    }
}

function clearAll() {
    if (confirm("Biztosan törlöd az összes adatot?")) {
        array = [];
        resetForm();
        printArray();
    }
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedIndex = null;
}

function validate() {
    let valid = true;
    let name = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let salary = document.getElementById("salary").value.trim();
    let city = document.getElementById("city").value.trim();

    if (name.length < 2 || name.length > 50) {
        alert("A név 2 és 50 karakter között kell legyen.");
        valid = false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert("Hibás email formátum.");
        valid = false;
    }
    if (isNaN(salary) || salary <= 0) {
        alert("A fizetésnek pozitív számnak kell lennie.");
        valid = false;
    }
    if (city.length < 2 || city.length > 50) {
        alert("A város neve 2 és 50 karakter között kell legyen.");
        valid = false;
    }

    return valid;
}

function addFilterInputs() {
    const table = document.getElementById("employeeList");
    const headerRow = table.tHead.rows[0];
    const filterRow = table.tHead.insertRow(1);

    for (let i = 0; i < headerRow.cells.length; i++) {
        const cell = document.createElement("th");
        if (i < 4) {
            const input = document.createElement("input");
            input.setAttribute("data-index", i);
            input.setAttribute("placeholder", "Szűrés...");
            input.addEventListener("keyup", printArray);
            cell.appendChild(input);
        }
        filterRow.appendChild(cell);
    }
}

function filterRow(row) {
    const filters = document.querySelectorAll("thead tr:nth-child(2) input");
    return [...filters].every((input, i) => {
        const value = input.value.toLowerCase();
        return row[Object.keys(row)[i]].toString().toLowerCase().includes(value);
    });
}

function addSortHandlers() {
    const headers = document.querySelectorAll("#employeeList thead tr:first-child th");
    headers.forEach((th, index) => {
        if (index < 4) {
            th.style.cursor = "pointer";
            th.addEventListener("click", () => {
                sortDirection[index] = !sortDirection[index];
                array.sort((a, b) => {
                    const key = Object.keys(a)[index];
                    const aVal = a[key].toString().toLowerCase();
                    const bVal = b[key].toString().toLowerCase();
                    if (aVal < bVal) return sortDirection[index] ? -1 : 1;
                    if (aVal > bVal) return sortDirection[index] ? 1 : -1;
                    return 0;
                });
                printArray();
            });
        }
    });
}
