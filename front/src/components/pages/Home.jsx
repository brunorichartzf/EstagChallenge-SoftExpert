import styles from './Home.module.css'




function Home() {

    return (
        <div className={`${styles.content}`}>

            <div className={`${styles.pageLeft}`}>
                <form id='homeForm' className={`${styles.form}`}>
                    <div className={`${styles.inputs}`}>  
                        <select name="product" className="product" id="product" required>
                            <option value="">Select a Product</option>
                        </select>
                        <input type="number" step="1" min="1" className="product" id="amount" placeholder="Amount" required>
                        </input>
                    </div>

                    <div className={`${styles.prices}`}>
                        <label htmlFor="taxValue">Tax: </label>
                        <input type="text" name="taxValue" id="taxValue" value="" disabled/>
                        <label htmlFor="unitPrice">Unit price: </label>
                        <input type="text" name="unitPrice" id="unitPrice" value="" disabled/>
                        <label htmlFor="units">Units available: </label>
                        <input type="text" name="units" id="units" value="" disabled/>
                    </div>
                </form>
                <button className={`${styles.addProduct}`} id="addProduct">Add Product</button>
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
                            
                        </tbody>
                    </table>
                </div>

                    <div className={`${styles.totalItem}`}>
                        <div>
                        <label htmlFor="tax">Tax: </label>
                        <input type="text" name="tax" className={`${styles.tax}`} id="tax" disabled value=""/>
                        <label htmlFor="total">Total: </label>
                        <input type="text" name="total" className={`${styles.total}`} id="total" disabled value=""/>
                        <button id="cancel">Cancel</button>
                        <button id="confirm" className={`${styles.confirm}`}>Confirm</button>
                        </div>
                    </div>

            </div>

        </div>
    )
  }
  
  export default Home