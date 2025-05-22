# 🛒 Soroto – Modern eCommerce Web Application

**Soroto** is a modern, responsive, and fully-featured eCommerce web application built with **ReactJS**, **Redux Toolkit**, and **React Router DOM**. It offers a seamless shopping experience with authentication, profile management, product browsing, wishlist, cart features, and more.

---

## 🚀 Features

### 🔐 User Authentication
- **Sign Up / Sign In**: Secure registration and login system.
- **Session Persistence**: Redux + `localStorage` to keep users logged in.
- **Protected Routes**: Access control for user-specific pages like Profile, Wishlist, and Cart.

### 👤 Profile Management
- View and update:
  - Name
  - Email
  - Gender
  - Date of Birth (DOB)
  - Address
- State managed using Redux Toolkit.

### 🛍️ Product Display
- Product listings with images, prices, and descriptions.
- Product detail view pages.
- Search and filter functionality.

### ❤️ Wishlist
- Add/remove products to/from Wishlist.
- Wishlist persists across sessions.
- Move items from Wishlist to Cart.

### 🛒 Cart
- Add products to Cart.
- Update quantity or remove items.
- Basic checkout flow (extendable with payment).

### 🎨 UI/UX
- Fully responsive for desktop and mobile.
- Forms with validation and error messages.
- Smooth navigation via React Router.

---

## 🧾 Project Structure

src/
├── components/ # Reusable components
├── pages/ # Route-specific pages (SignIn, SignUp, Cart, etc.)
├── store/ # Redux slices and store config
├── App.jsx # Main app component with routing
├── index.jsx # App entry point
└── styles/ # CSS modules and global styles
