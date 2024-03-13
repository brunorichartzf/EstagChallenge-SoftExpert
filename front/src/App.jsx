import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Categories from './components/pages/Categories'
import History from './components/pages/History'

function App() {

  return (
    <Router>
      <Header/>
    

    <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/products' element={<Products/>}></Route>
        <Route exact path='/categories' element={<Categories/>}></Route>
        <Route exact path='/history' element={<History/>}></Route>
    </Routes>
    </Router>
  )
}

export default App
