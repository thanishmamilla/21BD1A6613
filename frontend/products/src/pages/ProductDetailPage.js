import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetailPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await axios.get(`/api/product/${match.params.id}`);
      setProduct(res.data);
      setLoading(false);
    };

    fetchProduct();
  }, [match.params.id]);

  return (
    <div>
      {loading ? (
        <div>waiting for the information</div>
      ) : (
        <div>
          <h2>{product.name}</h2>
          <p>Company: {product.company}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Discount: {product.discount}%</p>
          <p>Availability: {product.availability}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
