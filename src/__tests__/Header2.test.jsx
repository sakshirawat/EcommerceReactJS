// src/__tests__/Header2.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header2 from '../components/Navbar/Header2'; 
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock react-redux useSelector
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('Header2', () => {
  beforeEach(() => {
    // reset mock between tests
    useSelector.mockReset();
    window.alert = vi.fn();
  });

  it('calls onSearch when typing in the search box', () => {
    const onSearch = vi.fn();
    useSelector.mockReturnValue(null); // user not signed in

    render(
      <BrowserRouter>
        <Header2 onSearch={onSearch} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'shoes' } });
    expect(onSearch).toHaveBeenCalledWith('shoes');
  });

  it('renders wishlist and cart as links when user is signed in', () => {
    useSelector.mockReturnValue({ name: 'Alice' }); // mock a user

    render(
      <BrowserRouter>
        <Header2 onSearch={vi.fn()} />
      </BrowserRouter>
    );

    const wishlistLink = screen.getByRole('link', { name: /wishlist/i });
    const cartLink     = screen.getByRole('link', { name: /cart/i });

    expect(wishlistLink).toHaveAttribute('href', '/wishlist');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('renders wishlist and cart as divs with alert when no user', () => {
    useSelector.mockReturnValue(null);

    render(
      <BrowserRouter>
        <Header2 onSearch={vi.fn()} />
      </BrowserRouter>
    );

    const wishlistDiv = screen.getByText('Wishlist').closest('div');
    const cartDiv     = screen.getByText('Cart').closest('div');

    // Should not be links
    expect(wishlistDiv.tagName).toBe('DIV');
    expect(cartDiv.tagName).toBe('DIV');

    fireEvent.click(wishlistDiv);
    fireEvent.click(cartDiv);
    expect(window.alert).toHaveBeenCalledTimes(2);
    expect(window.alert).toHaveBeenCalledWith('Please sign in first!');
  });
});
