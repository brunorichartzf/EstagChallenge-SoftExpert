const form = document.querySelector('#homeForm')
const url = 'http:localhost/routers/cadHome.php'
const productUrl = 'http:localhost/routers/cadProduto.php'
const categoryUrl = 'http:localhost/routers/cadCategoria.php'
select = document.querySelector("select");

//Product Caller
select = document.querySelector("select")

const getProducts = () => fetch(url).then((res) => { return res.json(); })
const getCategories = () => fetch(categoryUrl).then((res) => { return res.json(); })

const listProducts = async() => {
    const categories = await getProducts()
    for (const i of categories) {
        const option = document.createElement('option');
        option.textContent = i.name;
        option.value = i.name;
        option.id = i.name + '-' + i.code;
        select.appendChild(option);
    }
}

listProducts()


var valueofProduct
var amount
var productCategory
var productCategoryId
var productId
var taxValue
var unitPrice
var id
var units
var stockAmount

const checkProduct = async () =>{
    valueofProduct = document.getElementById("product").value
    const products = await getProducts()
    const categories = await getCategories()
    for(const a of products) {
        if(a.name == valueofProduct){
            stockAmount = a.amount
            productCategoryId = a.category_code
            for(i of categories){
                if(i.code == productCategoryId){
                    productCategory = i.name
                }
            }
            unitPrice = a.price
            units = stockAmount
            productId = a.code
        }
    }
    for(const b of categories){
        if(b.code == productCategoryId){
            taxValue = b.tax
        }
    }
    taxUnitSetter()
}

const taxUnitSetter = async () => {
    if(document.getElementById("product").value == ""){
        taxValue = ""
        unitPrice = ""
        units = ""
    }
    document.getElementById("taxValue").setAttribute("value", taxValue + "%")
    document.getElementById("unitPrice").setAttribute("value", ("$"+Number(unitPrice).toFixed(2)))
    document.getElementById("units").setAttribute("value", units)
}

const amountSetter = () => {
    amount = Number(document.getElementById("amount").value)
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
    <td><button type="button" id="${product[4]}">Delete</button></td>
    `
    document.querySelector('#cart>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#cart>tbody tr')
    arrayofAmounts = []
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const prodTotal = (unitPrice * amount) * (1+taxValue/100)
    const totalTax = (unitPrice * amount) * (taxValue/100)
    const product = [valueofProduct, unitPrice, amount, taxValue, productId, prodTotal, totalTax]
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


const saveProduct = async () => {
    
    if(isValidFields()){ 
        var product
        const products = await getProducts()
        for(i in products){
            if(products[i].code == productId){
                product = products[i]
            }
        }
        if(Number(amount) > Number(stockAmount)){
            alert("Amount bigger than available stock: "+stockAmount+" Units")
        }else{
        product.amount -= amount
        console.log(product)
        updateTable()
        clearFields()
        console.log("Cadastrando Produto")
        increaseTotal()
        updateProduct(product)
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


const deleteRow = async (event) => {
    
    if (event.target.type == 'button'){
        const id = event.target.id
        var row = document.getElementById(id)
        row.parentNode.parentNode.remove()
        var cont = 0
        for(i of arrayofProducts){
            if(i[4]==id){
                const products = await getProducts()
                var amt
                for(j of products){
                    if(j.code == id){
                        console.log("jamount: "+j.amount)
                        console.log("iamount: "+i[2])
                       amt = Number(j.amount) + Number(i[2])
                       console.log(amt)
                    }
                }
                try {
                    const res = fetch(url+'?id='+id+'&amount='+amt, {
                        method: 'UPDATE',
                    });
                } catch (error) {
                    console.log(error.message);
                }
                clearFields()
                arrayofProducts.splice(cont,1)
            }
            cont++
        }
        decreaseTotal()
        increaseTotal()
    }
    

}


const purchaseDate = () =>{
    return (new Date()).toLocaleDateString()
}

const createPurchase = () => {
    data = new FormData()
    data.append("total", total)
    data.append("tax", totalTax)
    data.append("date", purchaseDate())

    try {
        const res = fetch(url, {
            method: 'POST',
            body: data,
        });
    } catch (error) {
        console.log(error.message);
    }
    for(i of arrayofProducts){
        
        try {
            const res2 = fetch(url+'?productCode='+i[4]+'&itemAmount='+i[2]+'&price='+i[5]+'&itemTax='+i[6], {
                method: 'INSERT_ITEMS',
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    clearTable()
    arrayofProducts = []
    decreaseTotal()
}

const updateProduct = async (product) =>{
    const products = await getProducts()
    var amt
    for(i in products){
        if(products[i].code == product.code){
           amt = product.amount
        }
    }
    try {
        const res = fetch(url+'?id='+product.code+'&amount='+amt, {
            method: 'UPDATE',
        });
    } catch (error) {
        console.log(error.message);
    }
}

const cancel = async () => {
    const products = await getProducts()
    var amt = 0
    for(i of arrayofProducts){
        console.log(i)
        for(j of products){
            if(i[4] == j.code){
                amt = Number(j.amount) + Number(i[2])
                try {
                    const res = fetch(url+'?id='+j.code+'&amount='+amt, {
                        method: 'UPDATE',
                    });
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
        

    }
    location.reload()
}

//Events
document.getElementById("addProduct").addEventListener('click', ()=> saveProduct())
document.getElementById("confirm").addEventListener('click', ()=> createPurchase())
document.getElementById("cancel").addEventListener('click', ()=> cancel())
document.querySelector('#cart>tbody').addEventListener('click', deleteRow)

document.getElementById("product").addEventListener('change', ()=> checkProduct())
document.getElementById("amount").addEventListener('change', ()=> amountSetter())