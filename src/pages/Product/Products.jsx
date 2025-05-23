import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const Products = ({ searchTerm, categoryFilter }) => {
  // State to hold all product data fetched from API
  const [productData, setProductData] = useState([]);

  // State to track the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of items to display per page
  const itemsPerPage = 4;

  // Fetch product data once when component mounts
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProductData(data)) // Store fetched data in state
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProductData([]); // Clear product data on fetch error
      });
  }, []);

  // Filter products based on search term and category filter
  const filteredProducts = productData.filter((product) => {
    // Check if product title matches the search term (case-insensitive)
    const matchesSearch = product.title.toLowerCase().includes(searchTerm?.toLowerCase() || '');

    // Check if product category matches selected category filter (case-insensitive)
    const matchesCategory = categoryFilter
      ? product.category.toLowerCase() === categoryFilter.toLowerCase()
      : true; // If no category filter, include all

    return matchesSearch && matchesCategory; // Include product if both conditions are true
  });

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Calculate the starting index of the products to display on the current page
  const startIdx = (currentPage - 1) * itemsPerPage;

  // Slice the filtered products array to get only the current page's items
  const currentItems = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  // Handler for previous page button click
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Decrement page but not below 1
  };

  // Handler for next page button click
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // Increment page but not above total pages
  };

  // Reset current page to 1 whenever search term or category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  return (
    <>
      {/* Grid layout to display product items */}
      <div
        className="grid gap-6 p-8 bg-gray-50
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4"
      >
        {/* Render a ProductItem component for each product on the current page */}
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

      {/* Pagination controls below the product grid */}
      <div className="flex justify-center items-center gap-8 mt-4 font-semibold">
        {/* Previous button, disabled on first page */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-white
            ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Prev
        </button>

        {/* Current page indicator */}
        <span className="min-w-[120px] text-center">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next button, disabled on last page */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-white
            ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
