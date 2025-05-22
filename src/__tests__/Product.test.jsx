// src/__tests__/Products.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Products from '../pages/Product/Products';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';

// Mock the ProductItem component to avoid React import issues
vi.mock('../components/Product/ProductItem', () => ({
  default: ({ title }) => <div>{title}</div>,
}));

// Mock fetch to return a fixed product list
const mockProducts = [
  { id: 1, title: 'Test One', category: 'electronics', description: 'Desc', image: 'img1', price: 10, rating: { rate: 4 } },
  { id: 2, title: 'Another Product', category: 'jewelery', description: 'Desc', image: 'img2', price: 20, rating: { rate: 5 } },
  { id: 3, title: 'SearchMatch', category: 'electronics', description: 'Desc', image: 'img3', price: 30, rating: { rate: 3 } },
  { id: 4, title: 'Fourth', category: "men's clothing", description: 'Desc', image: 'img4', price: 40, rating: { rate: 2 } },
  { id: 5, title: 'Fifth', category: "women's clothing", description: 'Desc', image: 'img5', price: 50, rating: { rate: 1 } },
];

// Simple reducer stub
function reducer(state = {}, action) {
  return state;
}

const store = createStore(reducer);

// Wrap render with Redux and Router
function renderWithProviders(ui) {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
}

describe('Products component', () => {
  beforeAll(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockProducts) })
    );
  });

  it('renders the first page of products and pagination controls', async () => {
    renderWithProviders(<Products searchTerm="" categoryFilter="" />);
    // Wait for items to load
    await screen.findByText('Test One');
    await screen.findByText('Another Product');
    await screen.findByText('SearchMatch');
    await screen.findByText('Fourth');
    // Pagination info
    expect(screen.getByText(/Page 1 of 2/i)).toBeInTheDocument();
  });

  it('filters products by search term', async () => {
    renderWithProviders(<Products searchTerm="SearchMatch" categoryFilter="" />);
    // Only matching item
    expect(await screen.findByText('SearchMatch')).toBeInTheDocument();
    expect(screen.queryByText('Test One')).not.toBeInTheDocument();
  });

  it('filters products by category', async () => {
    renderWithProviders(<Products searchTerm="" categoryFilter="jewelery" />);
    expect(await screen.findByText('Another Product')).toBeInTheDocument();
    expect(screen.queryByText('Test One')).not.toBeInTheDocument();
  });

  it('navigates pagination correctly', async () => {
    renderWithProviders(<Products searchTerm="" categoryFilter="" />);
    // Initial
    expect(await screen.findByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
    // Next page
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(screen.getByText('Prev')).not.toBeDisabled();
      // Fifth item appears
      expect(screen.getByText('Fifth')).toBeInTheDocument();
    });
  });
});
