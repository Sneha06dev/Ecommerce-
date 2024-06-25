import React from 'react'
import './Admin.css'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../Components/AddProduct'
import ListProduct from '../Components/ListProduct'


const Admin = () => {
    return (
        <div className='admin'>
        <Navbar/>
         <Sidebar/>
         <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/allproducts' element={<ListProduct/>}/>
                    </Routes>
         
        </div>
    )
}

export default Admin;
