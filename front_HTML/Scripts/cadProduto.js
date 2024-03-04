const getLocalStorage = () => JSON.parse(localStorage.getItem('dbProduct')) ?? []
const getLocalStorageCategory = () => JSON.parse(localStorage.getItem('db_category')) ?? []
const setLocalStorage = (dbProduct) =>localStorage.setItem("dbProduct", JSON.stringify(dbProduct))

//Create
const createProduct = (product) => {
    const dbProduct = getLocalStorage()
    dbProduct.push(product)
    setLocalStorage(dbProduct)
}

//Read
const readProduct = () => getLocalStorage()
const readCategory = () => getLocalStorageCategory()
const categories = readCategory()
select = document.querySelector("select");

for (const i of categories) {
    const option = document.createElement('option');
    option.textContent = i.name;
    option.value = i.name;
    select.appendChild(option);
}

//Delete
const deleteProduct = (index) => {
    const dbProduct = readProduct()
    dbProduct.splice(index,1)
    setLocalStorage(dbProduct)
}

//Functions
const isValidFields = () => {
    return document.getElementById('productForm').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.product')
    fields.forEach(field => field.value = "")
}

//Layout Interaction

    //Save
const saveProduct = () => {
    if(isValidFields()){
        const product = {
            productName: (document.getElementById('productName').value).replace(/</g, "&lt;").replace(/>/g, "&gt;"),
            amount: document.getElementById('amountProduct').value,
            unitPrice: document.getElementById('unitPriceProduct').value,
            category: document.getElementById('categoryProduct').value
        }
        createProduct(product)
        clearFields()
        updateTable()
        console.log("Cadastrando Produto")
    }
}
var productId = 0
const createRow = (product, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${productId}</td>
    <td>${product.productName}</td>
    <td>${product.amount}</td>
    <td>$${Number(product.unitPrice).toFixed(2)}</td>
    <td>${product.category}</td>
    <td><button type="button" id="delete-${index}">Delete</button></td>
    `
    document.querySelector('#tableProduct>tbody').appendChild(newRow)
    productId ++
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProduct>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbProduct = readProduct()
    clearTable()
    productId = 0
    dbProduct.forEach(createRow)
}

const deleteRow = (event) => {
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        deleteProduct(index)
        updateTable()
    }


}

updateTable()

//Events
document.getElementById("saveProduct").addEventListener('click', ()=> saveProduct())
document.querySelector('#tableProduct>tbody').addEventListener('click', deleteRow)