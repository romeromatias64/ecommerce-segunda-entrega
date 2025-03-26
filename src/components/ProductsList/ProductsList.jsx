import React from 'react'
import Product from '../Product/Product'

export default function ProductsList({products}) {
    return (
        <div className="card-container">
            {products.map((product) => (
                <Product key={product.id} product={product}  />
            ))}
        </div>
    )
}
