import styles from './Products.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


function Products() {

    const [product, setProduct] = useState({})
    const url ='http://localhost/routers/cadProduto.php'
    const categoryUrl = 'http://localhost/routers/cadCategoria.php'

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setProduct(values => ({...values, [name]: value}))
        console.log(product)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(url,product)
        console.log(product)
        window.location.reload()
    }

    const [products, setProducts] = useState([])

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getProducts()
        getCategories()
        getItems()
    }, [])

    const getProducts = async () => {
        const response = await axios.get(url)
            setProducts(response.data)
    }

    const getCategories = async () => {
        const response = await axios.get(categoryUrl)
            setCategories(response.data)
    }

    const itemUrl = 'http://localhost/routers/getAllItemHistory.php'

    const [items, setItems] = useState([])

    const getItems = async () => {
        const response = await axios.get(itemUrl)
            setItems(response.data)
    }

    const deleteProduct= (id) => {
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
        
        
        
        //axios.delete(url+'?id='+id)
        //window.location.reload()
    }

    const categoryNameGetter = (id) => {
        for(let i of categories){
            if(i.code == id){
                return i.name
            }
        }
    }

    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.pageLeft}`}>
                <div className={`${styles.form}`}>
                    <form id="productForm" onSubmit={handleSubmit}>
                    <input type="text" name="productName" id="productName" className={`${styles.product}`} placeholder="Product Name" required onChange={handleChange}/>
                    <input type="number" min="1" name="amountProduct" id="amountProduct" className={`${styles.product}`} placeholder="Amount" required onChange={handleChange}/>
                    <input type="number" min="0.01" step="0.01" name="unitPriceProduct" id="unitPriceProduct" className={`${styles.product}`} placeholder="Unit Price" required onChange={handleChange}/>
                    <select name="category" id="categoryProduct" className={`${styles.product}`} required onChange={handleChange}> 
                    <option value="">Select a Category</option>
                    {categories.map((cat,key) =>
                            <option key = {key} id = {cat.code} value = {cat.code}>{cat.name}</option>
                            )}
                    </select>
                    <button className={`${styles.addProduct}`} id="saveProduct">Add Product</button>
                    </form>
                   

                </div>

            </div>
            <div className={`${styles.pageRight}`}>
                <div className={`${styles.table}`}>
                    <table id={`${styles.tableProduct}`}>
                        <thead>
                            <tr>
                                <th><b>Id</b></th>
                                <th><b>Product</b></th>
                                <th><b>Amount</b></th>
                                <th><b>Unit price</b></th>
                                <th><b>Category</b></th>
                                <th className={`${styles.delete}`}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((prod,key) =>
                            <tr key = {key}>
                                <td>{prod.code}</td>
                                <td>{prod.name}</td>
                                <td>{prod.amount}</td>
                                <td>${prod.price}</td>
                                <td>{categoryNameGetter(prod.category_code)}</td>
                                <td><button onClick={() => deleteProduct(prod.code)}>Delete</button></td>
                            </tr>
                            )}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
  }
  
  export default Products