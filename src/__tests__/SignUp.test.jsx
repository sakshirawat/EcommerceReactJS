import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import SignUp from '../pages/SignUp/SignUp';

// Mock localStorage methods before each test to prevent actual localStorage writes
beforeEach(() => {
  // Mock setItem to be a spy function
  Storage.prototype.setItem = vi.fn();

  // Mock getItem to always return an empty array (as JSON string) to simulate no users stored
  Storage.prototype.getItem = vi.fn(() => '[]');
});

// Helper function to render components wrapped in React Router's BrowserRouter,
// so that components using routing hooks like useNavigate can work correctly
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('SignUp Component', () => {
  // Test to check if all form inputs and buttons render correctly
  test('renders sign up form inputs and buttons', () => {
    renderWithRouter(<SignUp />);
    
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm your password/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  // Test that submitting the form with all empty fields shows appropriate validation errors
  test('shows validation errors when submitted empty', () => {
    renderWithRouter(<SignUp />);
    
    fireEvent.click(screen.getByText(/submit/i));
    
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please confirm your password/i)).toBeInTheDocument();
  });

  // Test that entering an invalid email format triggers the correct validation error message
  test('shows email format error', () => {
    renderWithRouter(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'invalidemail' }, // Invalid email without '@' and domain
    });
    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  // Test that mismatched password and confirm password inputs show the proper error message
  test('shows mismatch password error', () => {
    renderWithRouter(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm your password/i), {
      target: { value: '654321' }, // Different from password
    });
    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  // Test that filling the form correctly submits and triggers localStorage.setItem
  test('submits valid form and saves user', () => {
    renderWithRouter(<SignUp />);

    // Fill form inputs with valid data
    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/submit/i));

    // localStorage.setItem should be called to save user data after valid submission
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
