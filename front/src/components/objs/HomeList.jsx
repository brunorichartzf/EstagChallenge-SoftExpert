/* eslint-disable react/prop-types */

function HomeList({prod, key, deleteProduct, increaseDB}) {
    
    return(
        <tr key = {key} id={prod.product}>
        <td>{prod.productName}</td>
        <td>${prod.price}</td>
        <td>{prod.amount}</td>
        <td>${((1 + prod.tax/100) * (prod.amount * prod.price )).toFixed(2)}</td>
        <td><button onClick={function(){ deleteProduct(key); increaseDB(prod.product, prod.amount)}}>Delete</button></td>
    </tr>
     )
 
}

export default HomeList