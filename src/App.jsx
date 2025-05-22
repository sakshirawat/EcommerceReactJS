import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Navbar components
import Header1 from './components/Navbar/Header1'; 
import Header2 from './components/Navbar/Header2';
import Header3 from './components/Navbar/Header3';

// Auth components
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

// Main pages
import Products from './pages/Product/Products';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './pages/Cart/Cart';

// Redux hook to access store state
import { useSelector } from 'react-redux';

// Component to wrap routes requiring authentication
import ProtectedRoute from './pages/ProtectedRoutes';

// Product detail page
import ProductDetail from './pages/Product/ProductDetail';

// Footer pages
import TermsAndCondition from './components/Footer/TermsAndCondition';
import PrivacyPolicy from './components/Footer/PrivacyPolicy';
import FAQ from './components/Footer/FAQ';
import ContactUs from './components/Footer/ContactUS';
import Profile from './components/Footer/Profile';
import MyOrders from './components/Footer/myOrders';
import Settings from './components/Footer/setting';

// Footer component
import Footer from './components/Footer/Footer';

import NotFound from './pages/NotFound';

const App = () => {
  // Access current logged-in user from Redux store (null if not logged in)
  const user = useSelector((state) => state.user.currentUser);

  // State to hold the current search term (used by Header2 and passed to Products)
  const [searchTerm, setSearchTerm] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('');

  // Debugging: log current user on every render
  console.log(user, 'app');

  return (
    <div>
      {/* Render multiple header components */}
      <Header1 />
      {/* Pass the setter function for search term to Header2 */}
      <Header2 onSearch={setSearchTerm} />
       <Header3 onCategorySelect={setCategoryFilter} /> 

      {/* Define routes for the application */}
      <Routes>

        {/* Products page route - requires user to be logged in */}
        <Route
          path="/"
          element={
              <Products searchTerm={searchTerm} categoryFilter={categoryFilter} />
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* Public routes for signup and signin */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Wishlist page - protected */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* Cart page - protected */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Product detail page - public */}
        <Route path="/product/:name" element={<ProductDetail />} />

        {/* Footer informational pages - public */}
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Profile page - protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Settings page - protected */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* My Orders page - protected */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Footer is always visible on all pages */}
      <Footer />
    </div>
  );
};

export default App;
