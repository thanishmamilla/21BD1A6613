import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Pagination from './Pagination';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await axios.get('http://127.0.0.5000:categories/<categories>/products', { params: filters });
      setProducts(res.data);
      setLoading(false);
    };

    fetchProducts();
  }, [filters]);

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Filters setFilters={setFilters} />
      <div className="products">
        {loading ? (
          <div>Waiting for the information</div>
        ) : (
          currentProducts.map(product => <ProductCard key={product.id} product={product} />)
        )}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  );
};

export default AllProductsPage;
