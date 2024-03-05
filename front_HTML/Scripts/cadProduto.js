const form = document.querySelector('#productForm')
const url = 'http:localhost/routers/cadProduto.php'
const categoryUrl = 'http:localhost/routers/cadCategoria.php'
select = document.querySelector("select");

//Create
const createProduct = () => {
    if (isValidFields()) {
        const data = new FormData(form);
        const id = select.options[select.selectedIndex].id;
        data.append("id", id);

        try {
            const res = fetch(url, {
                method: 'POST',
                body: data,
            });
        } catch (error) {
            console.log(error.message);
        }
        updateTable()
        clearFields()
        
    }
}

//Read
const getProducts = () => fetch(url).then((res) => { return res.json(); })

const getCategories = () => fetch(categoryUrl).then((res) => { return res.json(); })

const readCategories = async () => {
    const categories = await getCategories()
    return categories
}

const readProducts = async () => {
    const products = await getProducts()
    return products
}


const listCategories = async() => {
    const categories = await getCategories()
    for (const i of categories) {
        const option = document.createElement('option');
        option.textContent = i.name;
        option.value = i.name;
        option.id = i.code;
        select.appendChild(option);
    }
}

listCategories()

//Delete
const deleteProduct = (id) => {
    try {
        const res = fetch(url+'?id='+id, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error.message);
    }
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
        location.reload()
        console.log("Cadastrando Produto")
    }
}

const createRow = async (product) => {
    const newRow = document.createElement('tr')
    console.log(product.category_code)
    const categories = await readCategories()
    console.log(categories)
    var category
    for(i in categories){
        if (categories[i].code == product.category_code){
            category = categories[i].name
            console.log(category)
        }
    }
    newRow.innerHTML = `
    <td>${product.code}</td>
    <td>${product.name}</td>
    <td>${product.amount}</td>
    <td>$${Number(product.price).toFixed(2)}</td>
    <td>${category}</td>
    <td><button type="button" id="delete-${product.code}">Delete</button></td>
    `
    document.querySelector('#tableProduct>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProduct>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = async () => {
    const dbProduct = await getProducts()
    clearTable()
    dbProduct.forEach(createRow)
}

const deleteRow = (event) => {
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        deleteProduct(index)
        location.reload()
    }


}

updateTable()

//Events
document.getElementById("saveProduct").addEventListener('click', ()=> saveProduct())
document.querySelector('#tableProduct>tbody').addEventListener('click', deleteRow)