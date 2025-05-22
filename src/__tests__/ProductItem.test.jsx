// src/__tests__/ProductItem.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from '../pages/Product/ProductItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../store/wishlistSlice';
import cartReducer from '../store/cartSlice';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Create a Redux store for testing
function setupStore() {
  return configureStore({
    reducer: {
      wishlist: wishlistReducer,
      cart: cartReducer,
    },
  });
}

describe('ProductItem component', () => {
  const productProps = {
    title: 'Test Product',
    price: 25.5,
    image: 'https://example.com/image.jpg',
    description: 'A product for testing',
  };

  let store;

  beforeEach(() => {
    store = setupStore();
    mockNavigate.mockClear();
  });

  it('renders product title and price', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductItem {...productProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$25.50')).toBeInTheDocument();
  });

  it('dispatches addtoWishlist action when wishlist button clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductItem {...productProps} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText(/Add to wishlist/i));
    const state = store.getState();
    expect(state.wishlist.items).toHaveLength(1);
    expect(state.wishlist.items[0].title).toBe('Test Product');
  });

  it('dispatches addToCart action when cart button clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductItem {...productProps} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText(/Add to Cart/i));
    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].title).toBe('Test Product');
  });

  it('navigates to product detail when image clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductItem {...productProps} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByAltText('Test Product'));
    expect(mockNavigate).toHaveBeenCalledWith(
      '/product/Test%20Product',
      expect.objectContaining({ state: { product: expect.any(Object) } })
    );
  });
});

