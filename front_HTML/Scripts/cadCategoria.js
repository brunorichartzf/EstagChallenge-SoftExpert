const url = 'http:localhost/routers/cadCategoria.php'
const productUrl = 'http:localhost/routers/cadProduto.php'

const form = document.querySelector('#categoryForm')

//Read
const getCategories = () => fetch(url).then((res) => { return res.json(); })
const getProducts = () => fetch(productUrl).then((res) => { return res.json(); })


//Delete
const deleteCat = async(id) =>{
    var hasCategory = false
    const categories = await getProducts()

    for(i of categories){
        if(i.category_code == id){
            hasCategory = true
        }
    }

    if(hasCategory){
        alert("Error: Can't delete category. A product requires it.")
    }else{
        try {
            const res = fetch(url+'?id='+id, {
                method: 'DELETE',
            });
        } catch (error) {
            console.log(error.message);
        }
    }
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
const postCategory = () => {
        if (isValidFields()) {
            const data = new FormData(form)
            try {
                const res = fetch(url, {
                    method: 'POST',
                    body: data
                });
            } catch (error) {
                console.log(error.message);
            }
            clearFields()
            location.reload()
        }
}

    //Update Table
const createRow = (dbCategory) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${dbCategory.code}</td>
    <td>${(dbCategory.name).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
    <td>${Number(dbCategory.tax).toFixed(2)}%</td>
    <td><button type="button" id="${dbCategory.code}">Delete</button></td>
    `
    document.querySelector('#tableCategory>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableCategory>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updTable = async() => {
    const dbCategory = await getCategories()
    clearTable()
    dbCategory.forEach(createRow)
    
}

const deleteRow = async (event) => {
    if (event.target.type == 'button'){
        const index = event.target.id
        console.log(index)
        await deleteCat(index)
        location.reload()
        
    }


}

updTable()

//Events
document.getElementById("saveCategory").addEventListener('click', ()=> postCategory())
document.querySelector('#tableCategory>tbody').addEventListener('click', deleteRow)