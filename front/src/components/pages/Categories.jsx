import styles from './Categories.module.css'


function Categories() {

    this.setState({alunos : []})

    return (
        <div className={`${styles.content}`}>
            <div className={`${styles.contentLeft}`}>
                <form id='categoryForm'>
                <input type="text" name="categoryName" id="categoryName" className={`${styles.category}`} placeholder="Category Name" required/>
                <input type="number" min="0" name="taxCategory" id="taxCategory" className={`${styles.category}`} placeholder="Tax" required/>
                </form>
                <button className={`${styles.addProduct}`} id="saveCategory">Add Category</button>
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
                            
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
  }
  
  export default Categories