import styles from './History.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function History() {

    const purchaseUrl = 'http://localhost/routers/purchaseHistory.php'
    const itemUrl = 'http://localhost/routers/itemHistory.php'
    const productUrl ='http://localhost/routers/cadProduto.php'

    const [purchases, setPurchases] = useState([])
    const [items, setItems] = useState([])

    const getPurchases = async () => {
        const response = await axios.get(purchaseUrl)
            setPurchases(response.data)
    }

    useEffect(() => {
        getPurchases()
    }, [])

    const loadPurchases = async(id) => {
        const response = await axios.get(itemUrl,{
            params:{
                code: id
            }
        })
            setItems(response.data)
            console.log(response.data)
    }

    const [prods, setProds] = useState([])

    const getProds = async () => {
        const response = await axios.get(productUrl)
            setProds(response.data)
    }

    useEffect(() => {
        getProds()
    }, [])

    const productNameGetter = (id) => {
        for(let i of prods){
            if(i.code == id){
                return i.name
            }
        }
    }


    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.contentLeft}`}>
                <div className={`${styles.tableHistory}`}>
                <table id="history" className={`${styles.history}`}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Date</th>
                            <th>Tax</th>
                            <th>Total</th>
                            <th className={`${styles.delete}`}></th>
                        </tr>
                    </thead>
                    <tbody>
                    {purchases.map((purchase,key) =>
                            <tr key = {key} id={purchase.product}>
                                <td>{purchase.code}</td>
                                <td>{purchase.order_date}</td>
                                <td>${purchase.tax}</td>
                                <td>${purchase.total}</td>
                                <td><button onClick={() => loadPurchases(purchase.code)}>View</button></td>
                            </tr>
                            )}
                    </tbody>
                </table>

                </div>

            </div>
            <div className={`${styles.contentRight}`}>
                <div className={`${styles.tableDetails}`}>
                <table id="details" className={`${styles.details}`}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Tax</th>
                            <th>Total</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {items.map((item,key) =>
                            <tr key = {key} id={item.product}>
                                <td>{productNameGetter(Number(item.product_code))}</td>
                                <td>${((Number(item.price) - Number(item.tax))/Number(item.amount)).toFixed(2)}</td>
                                <td>{item.amount}</td>
                                <td>${item.tax}</td>
                                <td>${item.price}</td>
                            </tr>
                    )}
                    </tbody>
                </table>

                </div>

            </div>

        </div>
    )
  }
  
  export default History