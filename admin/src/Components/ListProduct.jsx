import React, { useEffect, useState } from 'react';
import './ListPoduct.css';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);

    // Fetch data from server
    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product= async(id)=>{
        await fetch('http://localhost:4000/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        }
        )
        await fetchInfo();
    }

    return (
        <div className="list-product">
            <h1>List of all Products</h1>
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Title</th>
                            <th>Old Price</th>
                            <th>New Price</th>
                            <th>Category</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((product, index) => (
                            <tr key={index}>
                                <td><img src={product.image} alt="" className="listproduct-product-icon" /></td>
                                <td>{product.name}</td>
                                <td>${product.old_price}</td>
                                <td>${product.new_price}</td>
                                <td>{product.category}</td>
                                <td><button onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon'>-</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListProduct;
