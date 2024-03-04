//Product Caller
const getLocalStorageProduct = () => JSON.parse(localStorage.getItem('dbProduct')) ?? []
const readProduct = () => getLocalStorageProduct()
const setLocalStorageProduct = (dbProduct) =>localStorage.setItem("dbProduct", JSON.stringify(dbProduct))

const getLocalStorageCategory = () => JSON.parse(localStorage.getItem('db_category')) ?? []
const readCategory = () => getLocalStorageCategory()



const categories = readCategory()

const products = readProduct()
select = document.querySelector("select")




for (const i of products) {
    const option = document.createElement('option')
    option.textContent = i.productName
    option.value = i.productName
    select.appendChild(option)
}

var valueofProduct
var amount
var productCategory
var taxValue
var unitPrice
var id
var units

const checkProduct = () =>{
    valueofProduct = document.getElementById("product").value
    
    for(const a of products) {
        if(a.productName == valueofProduct){
            const stockAmount = readProduct()[document.getElementById("product").options.selectedIndex - 1].amount
            productCategory = a.category
            unitPrice = a.unitPrice
            units = stockAmount
        }
    }
    for(const b of categories){
        if(b.name == productCategory){
            taxValue = b.tax
        }
    }
    taxUnitSetter()
}

const taxUnitSetter = () => {
    if(document.getElementById("product").value == ""){
        taxValue = ""
        unitPrice = ""
        units = ""
    }
    document.getElementById("taxValue").setAttribute("value", (Number(taxValue).toFixed(2) + "%"))
    document.getElementById("unitPrice").setAttribute("value", ("$"+Number(unitPrice).toFixed(2)))
    document.getElementById("units").setAttribute("value", units)
}

const amountSetter = () => {
    amount = document.getElementById("amount").value
}


var arrayofProducts=[]
var arrayofAmounts=[]

const createRow = (product, index) => {
    const newRow = document.createElement('tr')
    arrayofAmounts.push(product[2])
    console.log(arrayofAmounts)
    newRow.innerHTML = `
    <td>${product[0]}</td>
    <td>$${Number(product[1]).toFixed(2)}</td>
    <td>${product[2]}</td>
    <td>$${((product[2]*product[1])*(1+product[3]/100)).toFixed(2)}</td>
    <td><button type="button" id="${index}">Delete</button></td>
    `
    document.querySelector('#cart>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#cart>tbody tr')
    arrayofAmounts = []
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const product = [valueofProduct, unitPrice, amount, taxValue, id]
    arrayofProducts.push(product)
    console.log(product)
    clearTable()
    arrayofProducts.forEach(createRow)
}

const isValidFields = () => {
    return document.getElementById('homeForm').reportValidity()
}

var total = 0

var totalValue = 0
var tax
var totalTax = 0

const increaseTotal = () => {
    decreaseTotal()
    for(const e of arrayofProducts){
        totalValue = (e[2]*e[1])
        tax = (e[2]*e[1])*(e[3]/100)
        total = (total + (totalValue+tax))
        totalTax += tax
    }
    document.getElementById("total").setAttribute("value",("$"+total.toFixed(2)))
    document.getElementById("tax").setAttribute("value",("$"+totalTax.toFixed(2)))
}

const decreaseTotal = (id) => {
    total = 0
    totalTax= 0
}

const isItemPresent = () => {
    const item = document.getElementById("product").value
    console.log(item)
    for (const i of arrayofProducts){
        if (i[0] == item){
            alert("Item already in cart, please delete to edit amount.")
            return false
        }else{return true}
    }
    return true
}

const saveProduct = () => {
    if(isValidFields()){
        id = document.getElementById("product").options.selectedIndex - 1
        const stockAmount = readProduct()[id].amount
        const product = readProduct()[id]
        if(Number(amount) > Number(stockAmount)){
            alert("Amount bigger than available stock: "+stockAmount+" Units")
        }else{
        product.amount -= amount
        updateTable()
        clearFields()
        console.log("Cadastrando Produto")
        increaseTotal()
        updateProduct(product,id)
        }
    }
    
}

const clearFields = () => {
    const fields = document.querySelectorAll('.product')
    fields.forEach(field => field.value = "")
    taxValue = ""
    unitPrice = ""
    taxUnitSetter()
}


const deleteRow = (event) => {
    
    if (event.target.type == 'button'){
        console.log(event.target.id)
        const id = event.target.id
        var row = document.getElementById(id)
        row.parentNode.parentNode.remove()
        arrayofProducts.splice(id,1)
        console.log(arrayofProducts)
        decreaseTotal()
        increaseTotal()
    }
    

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbPurchase')) ?? []
const setLocalStorage = (dbProduct) =>localStorage.setItem("dbPurchase", JSON.stringify(dbProduct))

const purchaseDate = () =>{
    return (new Date()).toLocaleDateString()
}

const createPurchase = () => {
    const dbPurchase = getLocalStorage()
    const purchase = {
        products: arrayofProducts,
        totalTax: totalTax,
        total: total,
        date: (new Date()).toLocaleDateString()
    }
    dbPurchase.push(purchase)
    setLocalStorage(dbPurchase)
    location.reload()
}

const updateProduct = (product, index) =>{
    const dbProduct = readProduct()
    dbProduct[index] = product
    setLocalStorageProduct(dbProduct)
}


//Events
document.getElementById("addProduct").addEventListener('click', ()=> saveProduct())
document.getElementById("confirm").addEventListener('click', ()=> createPurchase())
document.querySelector('#cart>tbody').addEventListener('click', deleteRow)
document.getElementById("product").addEventListener('change', ()=> checkProduct())
document.getElementById("amount").addEventListener('change', ()=> amountSetter())