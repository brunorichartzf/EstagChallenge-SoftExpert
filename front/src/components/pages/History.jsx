import styles from './History.module.css'


function History() {

    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.contentLeft}`}>
                <div className={`${styles.tableHistory}`}>
                <table id="history" className={`${styles.history}`}>
                    <tr>
                        <th>Code</th>
                        <th>Date</th>
                        <th>Tax</th>
                        <th>Total</th>
                        <th className={`${styles.delete}`}></th>
                    </tr>
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
                    </tbody>
                </table>

                </div>

            </div>

        </div>
    )
  }
  
  export default History