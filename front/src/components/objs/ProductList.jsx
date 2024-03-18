/* eslint-disable react/prop-types */
import axios from 'axios'

const deleteProduct= (id, items, url) => {
    var hasProduct = false
    for(let i of items){
        if(i.product_code == id){
            hasProduct = true
        }
    }
    if(hasProduct){
        alert("Error: Can't delete this product. A History item requires it.")
    }else{
        axios.delete(url+'?id='+id)
        window.location.reload()
    }
}



function ProductList({prod, key, catName, items, url}) {

           return(
           <tr key = {key}>
                <td>{prod.code}</td>
                <td>{prod.name}</td>
                <td>{prod.amount}</td>
                <td>${prod.price}</td>
                <td>{catName}</td>
                <td><button onClick={() => deleteProduct(prod.code, items, url)}>Delete</button></td>
            </tr>
                            )
        
  }

export default ProductList