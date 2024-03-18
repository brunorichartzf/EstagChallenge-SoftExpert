/* eslint-disable react/prop-types */
import axios from 'axios'

const deleteCategory = async(id,products, url) => {
    var hasCategory = false

    for(let i of products){
        console.log(i)
        if(i.category_code == id){
            hasCategory = true
        }
    }

    if(hasCategory){
        alert("Error: Can't delete category. A product requires it.")
    }else{
        await axios.delete(url+'?id='+id)
        window.location.reload()
    }
}

function CategoryList({category, url, products}) {
    
           return(<tr key = {category.code}>
                <td>{category.code}</td>
                <td>{category.name}</td>
                <td>{category.tax}%</td>
                <td><button onClick={() => deleteCategory(category.code, products, url)}>Delete</button></td>
            </tr>)
        
  }

export default CategoryList