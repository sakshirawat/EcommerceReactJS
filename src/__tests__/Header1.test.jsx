import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header1 from '../components/Navbar/Header1'; // adjust path as needed
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ to, children, ...rest }) => <a href={to} {...rest}>{children}</a>
  };
});

// Dummy reducer to handle logout action
function reducer(state = { user: { currentUser: null } }, action) {
  switch (action.type) {
    case 'user/logOut':
      return { user: { currentUser: null } };
    default:
      return state;
  }
}

// Helper to render with Redux and Router
function renderWithProviders(ui, { initialState }) {
  const store = createStore(reducer, initialState);
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

describe('Header1', () => {
  it('shows Sign In and Sign Up when no user is logged in', () => {
    renderWithProviders(<Header1 />, { initialState: { user: { currentUser: null } } });
    expect(screen.getByText('Sign In')).toHaveAttribute('href', '/signin');
    expect(screen.getByText('Sign Up')).toHaveAttribute('href', '/signup');
  });

  it('shows welcome message and logout button when user is logged in', () => {
    const user = { name: 'Alice' };
    renderWithProviders(<Header1 />, { initialState: { user: { currentUser: user } } });
    expect(screen.getByText(/Welcome! Alice/)).toBeInTheDocument();
    expect(screen.getByText('LogOut')).toBeInTheDocument();
  });

  it('dispatches logout and navigates home on logout click', () => {
    const user = { name: 'Bob' };
    renderWithProviders(<Header1 />, { initialState: { user: { currentUser: user } } });
    fireEvent.click(screen.getByText('LogOut'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});