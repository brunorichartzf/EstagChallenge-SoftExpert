const url = 'http:localhost/routers/cadCategoria.php'
const form = document.querySelector('#categoryForm')

//Read
const getCategories = () => fetch(url).then((res) => { return res.json(); })


//Delete
const deleteCat = (id) =>{
    try {
        const res = fetch(url+'?id='+id, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error.message);
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
            location.reload()
        }
}

    //Update Table
const createRow = (dbCategory) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${dbCategory.code}</td>
    <td>${dbCategory.name}</td>
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
    var i = 0
    dbCategory.forEach(createRow)
    
}

const deleteRow = (event) => {
    if (event.target.type == 'button'){
        const index = event.target.id
        console.log(index)
        deleteCat(index)
        location.reload()
        
    }


}

updTable()

//Events
document.getElementById("saveCategory").addEventListener('click', ()=> postCategory())
document.querySelector('#tableCategory>tbody').addEventListener('click', deleteRow)