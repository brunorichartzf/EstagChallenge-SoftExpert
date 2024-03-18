/* eslint-disable react/prop-types */


function DetailsList({item, key, productNameGetter}) {
    
    return(
        <tr key = {key} id={item.product}>
            <td>{productNameGetter(Number(item.product_code))}</td>
            <td>${((Number(item.price) - Number(item.tax))/Number(item.amount)).toFixed(2)}</td>
            <td>{item.amount}</td>
            <td>${item.tax}</td>
            <td>${item.price}</td>
        </tr>
     )
 
}

export default DetailsList