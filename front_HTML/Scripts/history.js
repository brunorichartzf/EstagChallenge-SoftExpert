const url = 'http:localhost/routers/cadHistory.php'
const productsUrl = 'http:localhost/routers/cadProduto.php'

const getHistory = () => fetch(url).then((res) => { return res.json(); })
const getProducts = (code) => fetch(url+'?code='+code,{ method:'GET_PRODUCTS',}).then((res) => { return res.json(); })
const getProductsList = () => fetch(productsUrl).then((res) => { return res.json(); })

var code = 0

const setHistory = async () =>{
    const history = await getHistory()
    for(const i of history){
        console.log(i)
        createHistoryRow(i.code, i.tax, i.total, i.order_date )
        
        code += 1
    }
}

const createHistoryRow = (code, tax, total, date) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${code}</td>
    <td>${date}</td>
    <td>$${Number(tax).toFixed(2)}</td>
    <td>$${Number(total).toFixed(2)}</td>
    <td><button type="button" id="${code}">View</button></td>
    `
    document.querySelector('#history>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#details>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const setProducts = async (event) => {
    clearTable()

    if (event.target.type == 'button'){
        const index = event.target.id
        const products = await getProducts(index)
        const productsList = await getProductsList()
        console.log(productsList)

        var productName
        for(const i of products){
        
        for(const j of productsList){
            if(i.product_code == j.code){
                productName = j.name
            }
        }

        createProductRow(productName, ((i.price - i.tax)/i.amount), i.amount, i.tax, i.price) 
        }
    }


}

const createProductRow = (product, price, quantity, totalTax, total) =>{
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${product}</td>
    <td>$${Number(price).toFixed(2)}</td>
    <td>${quantity}</td>
    <td>$${Number(totalTax).toFixed(2)}</td>
    <td>$${Number(total).toFixed(2)}</td>
    `
    document.querySelector('#details>tbody').appendChild(newRow)
}



setHistory()

document.querySelector('#history>tbody').addEventListener('click', setProducts)