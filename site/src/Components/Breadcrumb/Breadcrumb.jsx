import React from 'react';
import './Breadcrumb.css'

const Breadcrumb = (props) => {
    const{product}=props;
    return (
        <div className='breadcrum'>
            HOME&gt; SHOP&gt; {product.category}&gt; {product.name}
        </div>
    );
};

export default Breadcrumb;
