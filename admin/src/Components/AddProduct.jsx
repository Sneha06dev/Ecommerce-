import React, { useState } from 'react';
import './AddProduct.css'; // Assuming you have a CSS file for styles

const AddProduct = () => {
    const[image,setImage]=useState(false);
    const[details,setDetails]=useState({
        name:"",
        image:"",
        category:"women",
        old_price:"",
        new_price:"",

    })

    const imageHandler=(e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }

    const Add_Product=async()=>{
        console.log(details);
        let responseData;
        let product= details;

        let formData= new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept: 'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})

        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }
  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={details.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={details.old_price} onChange={changeHandler} type="number" name="old_price" placeholder="Type Here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={details.new_price} onChange={changeHandler} type="number" name="new_price" placeholder="Type Here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={details.category} onChange={changeHandler} name="category" className="addproduct-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
      <label htmlFor="file-input">
      {image ? (
          <img
            src={URL.createObjectURL(image)}
            className="addproductthumbnail"
            alt="Add Product Icon"
            height="200px"
            width="150px"
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/upload.png`}
            className="addproductthumbnail"
            alt="Add Product Icon"
            height="150px"
            width="300px"
          />
        )}
      </label>
      <input type="file" name="image" id="file-input" onChange={imageHandler} hidden />
    </div>
      <button onClick={()=>{Add_Product()}} className="addproduct-btn">ADD</button>
    </div>
  );
};

export default AddProduct;
