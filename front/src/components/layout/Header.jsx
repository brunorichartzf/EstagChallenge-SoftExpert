import {Link} from 'react-router-dom'
import styles from './Header.module.css'

function Header() {

    return (

        <div className={`${styles.header}`}>
        <h1>Suite Store</h1>
        <div className={`${styles.headerItems}`}>
            <Link to ="/"><button>Home</button></Link>
            <Link to ="/Products"><button>Products</button></Link>
            <Link to ="/Categories"><button>Categories</button></Link>
            <Link to ="/History"><button>History</button></Link>
        </div>
        </div>
    )
  }
  
  export default Header