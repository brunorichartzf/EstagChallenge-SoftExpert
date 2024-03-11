import styles from './Products.module.css'

function Products() {

    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.pageLeft}`}>
                <div className={`${styles.form}`}>
                    <form id="productForm">
                    <input type="text" name="productName" id="productName" className={`${styles.product}`} placeholder="Product Name" required/>
                    <input type="number" min="1" name="amountProduct" id="amountProduct" className={`${styles.product}`} placeholder="Amount" required/>
                    <input type="number" min="0.01" step="0.01" name="unitPriceProduct" id="unitPriceProduct" className={`${styles.product}`} placeholder="Unit Price" required/>
                    <select name="category" id="categoryProduct" className={`${styles.product}`} required> 
                    <option value="">Select a Category</option>
                    </select>
                    </form>
                    <button className={`${styles.addProduct}`} id="saveProduct">Add Product</button>

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

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
  }
  
  export default Products