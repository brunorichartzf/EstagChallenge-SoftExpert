import styles from './Categories.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

import CategoryList from '../objs/CategoryList'

function Categories() {

    const [category, setCategory] = useState({})
    const url ='http://localhost/routers/cadCategoria.php'
    const productsUrl ='http://localhost/routers/cadProduto.php'

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCategory(values => ({...values, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(url,category)
        console.log(category)
        window.location.reload()
    }

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
        getProducts()
    }, [])

    const getCategories = async () => {
        const response = await axios.get(url)
            setCategories(response.data)
    }

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await axios.get(productsUrl)
        setProducts(response.data)
        
    }

    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.contentLeft}`}>
                <form id='categoryForm' onSubmit={handleSubmit}>
                <input type="text" name="categoryName" id="categoryName" className={`${styles.category}`} placeholder="Category Name" required onChange={handleChange}/>
                <input type="number" min="0" name="taxCategory" id="taxCategory" className={`${styles.category}`} placeholder="Tax" required onChange={handleChange}/>
                <button className={`${styles.addProduct}`} id="saveCategory">Add Category</button>
                </form>
                
            </div>

            <div className={`${styles.contentRight}`}>
                <div className={`${styles.table}`}>
                    <table id='tableCategory'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Category</th>
                                <th>Tax</th>
                                <th className={`${styles.delete}`}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        categories.map((cat,key) =>
                            <CategoryList
                                category={cat}
                                key = {key}
                                url = {url}
                                products = {products}
                                
                            />
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
  }
  
  export default Categories