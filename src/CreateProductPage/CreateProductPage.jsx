import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../_actions';
import style from './style.css';
function CreateProductPage() {
    const products = useSelector(state => state.products);
    const [productForm, setProduct] = useState({
        productName: '',
        type: '',
        price: 0,
        avatar: '',
        createdDate: Date.now()
    });
    const [created, setCreated] = useState(false);
    const creating = useSelector(state => state.productCreation.creating);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActions.getAll());
    }, []);

    function handleDeleteProduct(id) {
        dispatch(productActions.delete(id));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setProduct(productForm => ({ ...productForm, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setCreated(true);
        if (productForm.productName && productForm.type && productForm.price) {
            console.log("Handle submitting " + JSON.stringify(productForm))
            dispatch(productActions.create(productForm));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2 wrapper">
            <h2>Product List:</h2>
            {products.loading && <em>Loading products...</em>}
            {products.error && <span className="text-danger">ERROR: {products.error}</span>}
            {products.items &&
                <ul className="product-list">
                    {products.items.map((product, index) => 
                       
                        <li key={product.id}>
                            {product.productName + ' ' + product.type}
                            {
                                product.deleting ? <em> - Deleting...</em>
                                : product.deleteError ? <span className="text-danger"> - ERROR: {product.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteProduct(product.id)} className="text-primary">Delete Product</a></span>
                            }
                            <img src={`data:${product.avatar.contentType};base64,${new Buffer.from(product.avatar.data).toString('base64')}`} alt="image" width="30" height="30"/>
                        </li>
                        )}
                </ul>
            }
        <div className="create-product-list">
            <h2>Create Product</h2>
            <form name="productForm" onSubmit={handleSubmit} method="post">
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="productName" value={productForm.productName} onChange={handleChange} className={'form-control' + (created && !productForm.productName ? ' is-invalid' : '')} />
                    {created && !productForm.productName &&
                        <div className="invalid-feedback">Product name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <input type="text" name="type" value={productForm.type} onChange={handleChange} className={'form-control' + (created && !productForm.type ? ' is-invalid' : '')} />
                    {created && !productForm.type &&
                        <div className="invalid-feedback">Product type is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" name="price" value={productForm.price} onChange={handleChange} className={'form-control' + (created && !productForm.price ? ' is-invalid' : '')} />
                    {created && !productForm.price &&
                        <div className="invalid-feedback">Product price is required</div>
                    }
                </div>
                <div className="form-group">
                    <input type="file" name="avatar" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {creating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Create
                    </button>
                    <p className="create-product-link"><Link to="/login" className="btn btn-link">Cancel</Link></p>
                </div>
            </form>
        </div>
    </div>
    );
}

export { CreateProductPage };