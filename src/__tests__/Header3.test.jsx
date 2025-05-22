// src/__tests__/Header3.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header3 from '../components/Navbar/Header3'; 
import { describe, it, expect, vi } from 'vitest';

describe('Header3', () => {
  // Verify that category buttons are absent before toggling
  it('initially hides category buttons', () => {
    render(<Header3 />);
    expect(screen.queryByText('ELECTRONICS')).not.toBeInTheDocument();
    expect(screen.queryByText('MEN CLOTHING')).not.toBeInTheDocument();
    expect(screen.queryByText('WOMEN CLOTHING')).not.toBeInTheDocument();
    expect(screen.queryByText('JEWELRY')).not.toBeInTheDocument();
  });

  // Check that clicking the toggle button shows and hides buttons
  it('toggles category buttons when clicking the toggle button', () => {
    render(<Header3 />);
    // Locate the toggle button by its accessible name
    const toggleBtn = screen.getByRole('button', { name: /browse categories/i });

    // After first click, category options should appear
    fireEvent.click(toggleBtn);
    expect(screen.getByText('ELECTRONICS')).toBeInTheDocument();
    expect(screen.getByText('MEN CLOTHING')).toBeInTheDocument();
    expect(screen.getByText('WOMEN CLOTHING')).toBeInTheDocument();
    expect(screen.getByText('JEWELRY')).toBeInTheDocument();

    // Second click should hide them again
    fireEvent.click(toggleBtn);
    expect(screen.queryByText('ELECTRONICS')).not.toBeInTheDocument();
    expect(screen.queryByText('MEN CLOTHING')).not.toBeInTheDocument();
  });

  // Ensure clicking each category button invokes the callback with correct value
  it('calls onCategorySelect with the correct category when clicked', () => {
    const onCategorySelect = vi.fn();
    render(<Header3 onCategorySelect={onCategorySelect} />);
    // Open dropdown to reveal the buttons
    fireEvent.click(screen.getByRole('button', { name: /browse categories/i }));

    // Click each category and assert callback calls
    fireEvent.click(screen.getByText('ELECTRONICS'));
    expect(onCategorySelect).toHaveBeenCalledWith('electronics');

    fireEvent.click(screen.getByText('MEN CLOTHING'));
    expect(onCategorySelect).toHaveBeenCalledWith("men's clothing");

    fireEvent.click(screen.getByText('WOMEN CLOTHING'));
    expect(onCategorySelect).toHaveBeenCalledWith("women's clothing");

    fireEvent.click(screen.getByText('JEWELRY'));
    expect(onCategorySelect).toHaveBeenCalledWith('jewelery');

    // Total callback invocations should match number of clicks
    expect(onCategorySelect).toHaveBeenCalledTimes(4);
  });
});
