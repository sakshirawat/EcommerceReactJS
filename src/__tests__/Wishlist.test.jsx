import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Wishlist from '../pages/Wishlist/Wishlist';
import { BrowserRouter } from 'react-router-dom';
import { wishlistActions } from '../store/wishlistSlice';
import { cartActions } from '../store/cartSlice';
import jest from 'jest-mock';

// Create a mock Redux store
const mockStore = configureStore([]);

describe('Wishlist component', () => {
  let store;

  // Sample logged-in user object
  const user = { id: '123', name: 'John Doe' };

  // Sample wishlist item object to be used in tests
  const wishlistItem = {
    id: 1,
    title: 'Test Product',
    price: 25.5,
    image: 'test-image.jpg',
  };

  // Runs before each test to initialize the store and mock dispatch
  beforeEach(() => {
    store = mockStore({
      user: { currentUser: user },        // Simulate a logged-in user
      wishlist: { items: [wishlistItem] }, // Wishlist with one item
      cart: { items: [] },                  // Empty cart
    });

    // Mock the store's dispatch method to spy on dispatched actions
    store.dispatch = jest.fn();
  });

  // Test that the wishlist renders correctly when there is an item
  test('renders wishlist with item', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      </Provider>
    );

    // Check that the title and item details appear on screen
    expect(screen.getByText('My Wishlist')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$25.50')).toBeInTheDocument();
    expect(screen.getByText('Add To Cart')).toBeInTheDocument();
  });

  // Test that clicking "Add To Cart" dispatches correct Redux actions:
  // 1. Adds the item to the cart with quantity 1
  // 2. Removes the item from the wishlist
  test('calls dispatch to add to cart and remove from wishlist', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      </Provider>
    );

    // Find and click the "Add To Cart" button
    const addToCartButton = screen.getByText('Add To Cart');
    fireEvent.click(addToCartButton);

    // Assert dispatch was called to add the item to the cart with quantity:1
    expect(store.dispatch).toHaveBeenCalledWith(
      cartActions.addToCart({ ...wishlistItem, quantity: 1 })
    );

    // Assert dispatch was called to remove the item from the wishlist
    expect(store.dispatch).toHaveBeenCalledWith(
      wishlistActions.removeFromWishlist(wishlistItem)
    );
  });

  // Test that if the wishlist is empty, a specific message is rendered
  test('renders message when wishlist is empty', () => {
    // Override store with empty wishlist items array
    store = mockStore({
      user: { currentUser: user }, // User logged in
      wishlist: { items: [] },     // Empty wishlist
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      </Provider>
    );

    // Check that the "No items in wishlist." message is displayed
    expect(screen.getByText('No items in wishlist.')).toBeInTheDocument();
  });

  // Test that the Wishlist component does not render anything if user is not logged in
  test('does not render wishlist if user is not logged in', () => {
    // Override store with no logged-in user
    store = mockStore({
      user: { currentUser: null },         // No user logged in
      wishlist: { items: [wishlistItem] }, // Wishlist still has items
    });

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Wishlist />
        </BrowserRouter>
      </Provider>
    );

    // The Wishlist component should render nothing (null) in this case
    expect(container.firstChild).toBeNull();
  });
});
