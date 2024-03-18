import styles from './Home.module.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HomeList from '../objs/HomeList'



function Home() {

    const [product, setProduct] = useState({})
    const url = 'http://localhost/routers/cadHome.php'
    const purchaseUrl = 'http://localhost/routers/cadPurchase.php'
    const productUrl ='http://localhost/routers/cadProduto.php'
    const categoryUrl = 'http://localhost/routers/cadCategoria.php'

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if(name == 'product'){
            setProduct(values => ({...values, [name]: value, 'productName': productNameGetter(value), 'price': productPriceGetter(value), 'tax': taxGetter(value)}))
        }else{
            setProduct(values => ({...values, [name]: value}))
        }
    }

    const [tax, setTax] = useState('-')
    const [unitPrice, setUnitPrice] = useState('-')
    const [unitsAvailable, setUnitsAvailable] = useState('-')


    const handleSelect = (e) => {
        const value = e.target.value
        for(let i of prods){
            if(i.code == value){
                setUnitPrice("$"+i.price)
                setUnitsAvailable(i.amount)
                for(let j of categories){
                    if(j.code == i.category_code){
                        setTax(j.tax+'%')
                    }
                }
            }
            if(value == ""){
                setUnitPrice('-')
                setUnitsAvailable('-')
                setTax('-')
            }
        }   
    }

    const [cart, setCart] = useState([])

    const [amountChanged, setAmountChanged] = useState(false)

    const decreaseDB = async(id, amount) => {
        const response = await axios.get(productUrl)
        const products = response.data

        for(let i of products){
            if(i.code == id){
                await axios.patch(url+'?id='+id+'&amount='+(i.amount-amount))
                setAmountChanged(!amountChanged)
            }
        }
    }

    const increaseDB = async(id, amount) => {
        const response = await axios.get(productUrl)
        const products = response.data

        for(let i of products){
            if(i.code == id){
                await axios.patch(url+'?id='+id+'&amount='+(Number(i.amount)+Number(amount)))
                setAmountChanged(!amountChanged)
            }
        }
    }

    const cancelCart = async() => {
        for(let i of cart){
            await increaseDB(i.product, i.amount)
        }
        window.location.reload()
    }

    const addToCart = (e) => {
        e.preventDefault()
        for(let i of prods){
            if(i.code == Number(product.product)){
                if(i.amount >= Number(product.amount)){
                    setCart(cart => [...cart, product])
                    decreaseDB(i.code, product.amount)
                }else{
                    alert("Item amount bigger than available in stock.")
                }
            }
        }
        console.log(cart)
        clearFields()
    }

    const getDate = () =>{
        return (new Date()).toLocaleDateString()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const purchase = {'total': Number(total), 'tax': Number(totalTax), 'date': getDate()}
        await axios.post(url,purchase) 
        
        for(let i of cart){
            const purchase = {'productCode': i.product, 'itemAmount': i.amount, 'price': ((Number(i.price)*Number(i.amount))*(1+Number(i.tax)/100)), 'itemTax': ((Number(i.price)*Number(i.amount))*Number(i.tax)/100)}
            axios.post(purchaseUrl,purchase)
        }

        window.location.reload()
    }

    const [categories, setCategories] = useState([])

    const [prods, setProds] = useState([])

    useEffect(() => {
        getProds()
        getCategories()
    }, [])

    useEffect(() => {
        getProds()
    }, [amountChanged])

    const getProds = async () => {
        const response = await axios.get(productUrl)
            setProds(response.data)
    }

    const getCategories = async () => {
        const response = await axios.get(categoryUrl)
            setCategories(response.data)
    }

    const productNameGetter = (id) => {
        for(let i of prods){
            if(i.code == id){
                return i.name
            }
        }
    }

    const productPriceGetter = (id) => {
        for(let i of prods){
            if(i.code == id){
                return i.price
            }
        }
    }

    const taxGetter = (id) => {
        for(let i of prods){
            if(i.code == id){
                for(let j of categories){
                    if(j.code == i.category_code){
                        return j.tax
                    }
                }
            }
        }   
    }

    const [totalTax, setTotalTax] = useState(0)
    const [total, setTotal] = useState(0)


    const calcTotal = () => {
        var tot = 0
        var totTax = 0
        for(let i of cart){ 
            tot = (Number(tot) + Number((i.price * i.amount) * (i.tax/100 + 1))).toFixed(2)
            totTax = (Number(totTax) + Number((i.price * i.amount) * (i.tax/100))).toFixed(2)
        }
        setTotal(tot)
        setTotalTax(totTax)
    }

    useEffect(() => {
        calcTotal()
    }, [cart])

    const clearFields = () => {
        let fields = document.querySelectorAll('select')
        fields.forEach(field => field.value = "")
        setUnitPrice('-')
        setUnitsAvailable('-')
        setTax('-')
        fields = document.querySelectorAll('input')
        fields.forEach(field => field.value = "")
    }

    const [, setState] = React.useState(false)

    const deleteProduct = (id) => {
        cart.splice(id,1)
        console.log(cart)
        setState((prev) => !prev)   
        calcTotal()     
    }

    return (
        <div className={`${styles.content}`}>

            <div className={`${styles.pageLeft}`}>
                <form id='homeForm' className={`${styles.form}`} onSubmit={addToCart}>
                    <div className={`${styles.inputs}`}>  
                        <select name="product" className="product" id="product" required onChange={e => {handleSelect(e); handleChange(e)}}>
                            <option value="">Select a Product</option>
                            {prods.map((cat,key) =>
                            <option key = {key} id = {cat.code} value = {cat.code}>{cat.name}</option>
                            )}
                        </select>
                        <input type="number" name='amount' step="1" min="1" className="product" id="amount" placeholder="Amount" required onChange={handleChange}>
                        </input>
                    </div>

                    <div className={`${styles.prices}`}>
                        <label htmlFor="taxValue">Tax: </label>
                        <input type="text" name="taxValue" id="taxValue" value={tax} disabled/>
                        <label htmlFor="unitPrice">Unit price: </label>
                        <input type="text" name="unitPrice" id="unitPrice" value={unitPrice} disabled/>
                        <label htmlFor="units">Units available: </label>
                        <input type="text" name="units" id="units" value={unitsAvailable} disabled/>
                    </div>
                    <button className={`${styles.addProduct}`} id="addProduct">Add Product</button>
                </form>
                
            </div>

            <div className={`${styles.pageRight}`}>
                <div className={`${styles.cartDiv}`}>
                    <table id="cart">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                                <th>Total</th>
                                <th className={`${styles.delete}`}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart.map((prod,key) =>
                            <HomeList
                            prod = {prod}
                            key = {key}
                            deleteProduct={deleteProduct}
                            increaseDB={increaseDB}
                            />
                            )}
                        </tbody>
                    </table>
                </div>

                    <div className={`${styles.totalItem}`}>
                        <div>
                        <label htmlFor="tax">Tax: $</label>
                        <input type="text" name="tax" className={`${styles.tax}`} id="tax" disabled value={totalTax}/>
                        <label htmlFor="total">Total: $</label>
                        <input type="text" name="total" className={`${styles.total}`} id="total" disabled value={total}/>
                        <button id="cancel"onClick={() => cancelCart()}>Cancel</button>
                        <button id="confirm" className={`${styles.confirm}`} onClick={handleSubmit}>Confirm</button>
                        </div>
                    </div>

            </div>

        </div>
    )
  }
  
  export default Home