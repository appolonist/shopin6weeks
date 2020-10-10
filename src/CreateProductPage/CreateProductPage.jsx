import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../_actions';

function CreateProductPage() {
    const [product, setProduct] = useState({
        productName: '',
        type: '',
        price: 0,
        createdDate: Date.now()
    });
    const [created, setCreated] = useState(false);
    const creating = useSelector(state => state.productCreation.creating);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setProduct(product => ({ ...product, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setCreated(true);
        if (product.productName && product.type && product.price) {
            dispatch(productActions.create(product));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Create Product</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="productName" value={product.productName} onChange={handleChange} className={'form-control' + (created && !product.productName ? ' is-invalid' : '')} />
                    {created && !product.productName &&
                        <div className="invalid-feedback">Product name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <input type="text" name="type" value={product.type} onChange={handleChange} className={'form-control' + (created && !product.type ? ' is-invalid' : '')} />
                    {created && !product.type &&
                        <div className="invalid-feedback">Product type is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" name="price" value={product.price} onChange={handleChange} className={'form-control' + (created && !product.price ? ' is-invalid' : '')} />
                    {created && !product.price &&
                        <div className="invalid-feedback">Product price is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {creating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Create
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { CreateProductPage };