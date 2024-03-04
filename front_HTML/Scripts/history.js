const getLocalStorage = () => JSON.parse(localStorage.getItem('dbPurchase')) ?? []

var code = 0

const setHistory = () =>{
    const dbPurchase = getLocalStorage()
    for(const i of dbPurchase){
        createHistoryRow(code, i.totalTax, i.total, i.date )
        console.log(i)
        code += 1
    }
}

const createHistoryRow = (code, tax, total, date) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${code}</td>
    <td>${date}</td>
    <td>$${tax.toFixed(2)}</td>
    <td>$${(total).toFixed(2)}</td>
    <td><button type="button" id="${code}">View</button></td>
    `
    document.querySelector('#history>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#details>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const setProducts = (event) => {
    clearTable()
    const dbPurchase = getLocalStorage()
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