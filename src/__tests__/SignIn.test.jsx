import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../pages/SignIn/SignIn';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/index';

const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );
};

describe('SignIn Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders sign-in form with inputs and buttons', () => {
    renderComponent();

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('shows required field errors on empty submit', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Wait for error messages to appear asynchronously
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test('shows invalid email format error', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Use findByText to wait for the invalid email error message
    expect(await screen.findByText(/Invalid email format/i)).toBeInTheDocument();
  });

  test('shows credential error for incorrect login', async () => {
    localStorage.setItem('users', JSON.stringify([{ email: 'test@example.com', password: 'pass123' }]));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(await screen.findByText(/Incorrect email or password/i)).toBeInTheDocument();
  });

  test('logs in successfully with correct credentials', async () => {
    const mockUser = { email: 'test@example.com', password: 'pass123', name: 'Test User' };
    localStorage.setItem('users', JSON.stringify([mockUser]));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'pass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Wait a moment for potential error message to appear
    await waitFor(() => {
      expect(screen.queryByText(/Incorrect email or password/i)).not.toBeInTheDocument();
    });
  });
});
