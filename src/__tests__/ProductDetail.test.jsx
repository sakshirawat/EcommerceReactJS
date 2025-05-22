import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductDetail from '../pages/Product/ProductDetail';
import jest from 'jest-mock';

// Create a mock Redux store for testing
const mockStore = configureStore([]);

describe('ProductDetail component', () => {
  let store;

  // Runs before each test to create a fresh store and mock the dispatch method
  beforeEach(() => {
    store = mockStore({});
    // Mock the store.dispatch method to spy on dispatched actions if needed
    store.dispatch = jest.fn();
  });

  // Test that the ProductDetail component renders product information correctly
  it('renders product details correctly', () => {
    // Sample product data to simulate the product passed via location state
    const product = {
      title: 'Test Product',
      price: 29.99,
      image: 'test-image.jpg',
      description: 'Test description',
    };

    render(
      <Provider store={store}>
        {/* MemoryRouter allows setting initialEntries to simulate route and location state */}
        <MemoryRouter
          initialEntries={[{ pathname: '/product/1', state: { product } }]}
        >
          <ProductDetail />
        </MemoryRouter>
      </Provider>
    );

    // Assert that product title is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();

    // Assert that product price is displayed with correct formatting
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });
});
