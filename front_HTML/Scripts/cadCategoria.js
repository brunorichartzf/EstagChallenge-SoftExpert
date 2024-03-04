const url = 'http:localhost/cadCategoria.php'
const form = document.querySelector('#categoryForm')
//Set
const setLocalCategory = (dbCategory) => localStorage.setItem("db_category", JSON.stringify(dbCategory))

//Create
const createCategory = (category) => {
    const dbCategory = readCategory()
    dbCategory.push(category)
    setLocalCategory(dbCategory)
}

//Read
const readCategory = () => JSON.parse(localStorage.getItem("db_category")) ?? []

const pullCategory = () => {
    const categories = fetch(url)
    
}
 pullCategory()


//Delete
const deleteCategory = (index) => {
    const dbCategory = readCategory()
    dbCategory.splice(index,1)
    setLocalCategory(dbCategory)
}

const isValidFields = () => {
    console.log("Verifying")
    return document.getElementById("categoryForm").reportValidity()
}

//Layout Interactions
    //Clear Fields
const clearFields = () => {
    const fields = document.querySelectorAll('.category')
    fields.forEach(field => field.value = "")
}

    //Save
const saveCategory = () => {
    if (isValidFields()) {
        const category = {
            name: (document.getElementById('categoryName').value).replace(/</g, "&lt;").replace(/>/g, "&gt;"),
            tax: document.getElementById('taxCategory').value
        }
        createCategory(category)
        clearFields()
        updateTable()
        console.log("Registering Category")
    }
}

const postCategory = () => {
        if (isValidFields()) {
            const data = new FormData(form);
            try {
                const res = fetch(url, {
                    method: 'POST',
                    body: data
                });
            } catch (error) {
                console.log(error.message);
            }
            clearFields()
            updateTable()
        }
}

    //Delete

    //Update Table
var categoryId = 0
const createRow = (category, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${categoryId}</td>
    <td>${category.name}</td>
    <td>${Number(category.tax).toFixed(2)}%</td>
    <td><button type="button" id="delete-${index}">Delete</button></td>
    `
    document.querySelector('#tableCategory>tbody').appendChild(newRow)
    categoryId++
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableCategory>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbCategory = readCategory()
    clearTable()
    categoryId = 0
    dbCategory.forEach(createRow)
}

const deleteRow = (event) => {
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        deleteCategory(index)
        updateTable()
        
    }


}

updateTable()

//Events
document.getElementById("saveCategory").addEventListener('click', ()=> postCategory())
document.querySelector('#tableCategory>tbody').addEventListener('click', deleteRow)