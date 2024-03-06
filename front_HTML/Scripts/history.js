const url = 'http:localhost/routers/cadHistory.php'

const getHistory = () => fetch(url).then((res) => { return res.json(); })
const getProducts = () => fetch(url,{ method:'GET_PRODUCTS',}).then((res) => { return res.json(); })

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
    const dbPurchase = getLocalStorage()

    const products = await getProducts()

    if (event.target.type == 'button'){
        const index = event.target.id
        const purchase = dbPurchase.at(index)
        
        console.log(purchase)
        var id = 0
        for(const i of purchase.products){
        
        const product = purchase.products[id][0]
        const price = purchase.products[id][1]
        const quantity = purchase.products[id][2]
        const tax = ((purchase.products[id][3]/100) * price)*quantity
        const total = Number(tax)+Number(price*quantity)

        createProductRow(product, price, quantity, tax, total) 
        id+=1
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