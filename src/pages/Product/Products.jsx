import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import styles from './Products.module.css';

const Products = ({ searchTerm, categoryFilter }) => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProductData([]);
      });
  }, []);

  // Filter by search term AND category filter (if any)
  const filteredProducts = productData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm?.toLowerCase() || '');
    const matchesCategory = categoryFilter
      ? product.category.toLowerCase() === categoryFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Reset page to 1 if searchTerm or categoryFilter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  return (
    <>
      {/* Grid layout for displaying products */}
      <div className={styles.productsGrid}>
        {currentItems.map((item) => (
          <ProductItem
            key={item.id}
            title={item.title}
            category={item.category}
            description={item.description}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
