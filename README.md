Soroto is a modern, responsive, and fully-featured eCommerce web application built with ReactJS, Redux Toolkit, and React Router DOM. It offers a seamless shopping experience with user authentication, profile management, product browsing, wishlist, cart management, and more.
🚀 Features 🔐 User Authentication Sign Up / Sign In: Secure registration and login system.
Profile Persistence: User session persistence with Redux and localStorage.
Protected Routes: Access control for user-specific pages like Profile, Wishlist, and Cart.
👤 Profile Management View and update user profile details including:
Name
Email
Gender
Date of Birth (DOB)
Address
All profile data managed with Redux Toolkit for consistent state updates.
🛍️ Products Display product listings with images, prices, and descriptions.
Detailed product view pages.
Search and filter functionality for easy product discovery.
❤️ Wishlist Add or remove products to/from personal wishlist.
Wishlist persists across sessions.
Move items from Wishlist to Cart easily.
🛒 Cart Add products to shopping cart.
Modify quantities or remove items.
Checkout flow (can be extended with payment integration).
🎨 UI / UX Responsive design for desktop and mobile devices.
User-friendly forms with validation and error feedback.
Smooth navigation using React Router DOM.
📁 Project Structure src/ ├── components/ # React components ├── store/ # Redux Toolkit slices and store setup ├── pages/ # Route components (SignIn, SignUp, Profile, ProductDetail, etc.) ├── App.js # Main app component with routing ├── index.js # App entry point └── styles/ # CSS modules and global styles 🛠️ Installation & Setup Clone the repository:
bash Copy Edit git clone https://github.com/your-username/soroto-ecommerce.git cd soroto-ecommerce Install dependencies:
bash Copy Edit npm install Run the development server:
bash Copy Edit npm start Open your browser and navigate to http://localhost:3000
🧪 Testing Tests are written using React Testing Library and Vitest for:
Form validations
Component rendering
Redux action dispatching
To run tests:
bash Copy Edit npm test 📋 Usage Register a new user or sign in with existing credentials.
Browse products and use the search bar to filter.
Click a product to view details.
Add products to wishlist or cart.
Manage profile details and update information anytime.
Access wishlist and cart from your profile dropdown.
🔧 Technologies Used ReactJS
Redux Toolkit
React Router DOM
CSS Modules
LocalStorage (for simple persistence)
React Testing Library
Vitest (test runner)
