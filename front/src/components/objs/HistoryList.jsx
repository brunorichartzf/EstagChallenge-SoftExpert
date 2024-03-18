/* eslint-disable react/prop-types */


function HistoryList({purchase, key, loadPurchases}) {
    
    return(
        <tr key = {key} id={purchase.product}>
            <td>{purchase.code}</td>
            <td>{purchase.order_date}</td>
            <td>${purchase.tax}</td>
            <td>${purchase.total}</td>
            <td><button onClick={() => loadPurchases(purchase.code)}>View</button></td>
        </tr>
     )
 
}

export default HistoryList