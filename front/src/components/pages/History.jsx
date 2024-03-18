import styles from './History.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import HistoryList from '../objs/HistoryList'
import DetailsList from '../objs/DetailsList'

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
                            <HistoryList
                            purchase = {purchase}
                            key = {key}
                            loadPurchases={loadPurchases}
                            />
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
                            <DetailsList
                            item = {item}
                            key={key}
                            productNameGetter={productNameGetter}
                            />
                    )}
                    </tbody>
                </table>

                </div>

            </div>

        </div>
    )
  }
  
  export default History