import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Cart from '../pages/Cart/Cart'; // Path to your Cart component
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// --- 1. Define the initial Redux state for the cart ---
const initialState = {
  cart: {
    items: [
      {
        title: 'Test Product',
        price: 100,
        quantity: 2,
        image: 'test-image.jpg',
      },
    ],
  },
};

// --- 2. Reducer to handle cart actions in tests (mirrors your slice) ---
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'cart/removeFromCart':
      return {
        ...state,
        cart: {
          items: state.cart.items.filter(i => i.title !== action.payload.title),
        },
      };
    case 'cart/increaseQuantity':
      return {
        ...state,
        cart: {
          items: state.cart.items.map(i =>
            i.title === action.payload.title ? { ...i, quantity: i.quantity + 1 } : i
          ),
        },
      };
    case 'cart/decreaseQuantity':
      return {
        ...state,
        cart: {
          items: state.cart.items.map(i =>
            i.title === action.payload.title && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        },
      };
    default:
      return state;
  }
}

// --- 3. Mock useNavigate so the overlay-close call in Cart doesn’t throw ---
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

// --- 4. Helper to render UI wrapped with Redux store ---
function renderWithRedux(ui, store) {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
}

describe('Cart component', () => {
  let store;

  beforeEach(() => {
    // Create a fresh store for each test to avoid cross-test state pollution
    store = createStore(reducer);

    // Render the Cart inside both Provider (Redux) and MemoryRouter (React Router)
    renderWithRedux(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      store
    );
  });

  it('renders cart items', () => {
    // Check that the header and initial item details appear
    expect(screen.getByText('My Cart')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Price: $100.00')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // quantity starts at 2
  });

  it('increases quantity when + button is clicked', async () => {
    // Click the "+" button and wait for the quantity to update to 3
    fireEvent.click(screen.getByText('+'));
    await waitFor(() => expect(screen.getByText('3')).toBeInTheDocument());
  });

  it('decreases quantity when - button is clicked', async () => {
    // Click the "-" button and wait for the quantity to update to 1
    fireEvent.click(screen.getByText('-'));
    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
  });

  it('removes item when remove button clicked', async () => {
    // Click "Remove" and wait for the item title to disappear
    fireEvent.click(screen.getByText('Remove'));
    await waitFor(() =>
      expect(screen.queryByText('Test Product')).not.toBeInTheDocument()
    );
  });

  it('shows invalid coupon alert for invalid code', () => {
    // Spy on window.alert
    window.alert = vi.fn();

    // Type an invalid code and click the apply icon
    fireEvent.change(
      screen.getByPlaceholderText('Enter coupon code'),
      { target: { value: 'INVALID' } }
    );
    fireEvent.click(screen.getByTitle('Apply Coupon'));

    // Expect the alert with the invalid-code message
    expect(window.alert).toHaveBeenCalledWith('Invalid coupon code');
  });

  it('applies flat discount coupon correctly', () => {
    // Type "FLAT50" and apply
    fireEvent.change(
      screen.getByPlaceholderText('Enter coupon code'),
      { target: { value: 'FLAT50' } }
    );
    fireEvent.click(screen.getByTitle('Apply Coupon'));

    // Check discount UI appears with -$50.00
    expect(screen.getByText(/Discount Applied/i)).toBeInTheDocument();
    expect(screen.getByText('-$50.00')).toBeInTheDocument();
  });

  it('applies percent discount coupon correctly', () => {
    // Type "SAVE30" and apply
    fireEvent.change(
      screen.getByPlaceholderText('Enter coupon code'),
      { target: { value: 'SAVE30' } }
    );
    fireEvent.click(screen.getByTitle('Apply Coupon'));

    // Check discount UI appears with -$60.00 (30% of $200)
    expect(screen.getByText(/Discount Applied/i)).toBeInTheDocument();
    expect(screen.getByText(/-[$]60.00/)).toBeInTheDocument();
  });
});
