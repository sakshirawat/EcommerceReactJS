import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactUs from '../components/Footer/ContactUS';  // adjust path if needed

describe('ContactUs component', () => {
  beforeEach(() => {
    render(<ContactUs />);
  });

  it('renders the title, three textboxes (name, email, message) and a Send button', () => {
    // heading
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();

    // there should be exactly three "textbox" roles (2 inputs + 1 textarea)
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes).toHaveLength(3);

    // and a Send button
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('allows the user to fill out name, email and message', () => {
    const [nameInput, emailInput, messageInput] = screen.getAllByRole('textbox');

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello there!' } });

    expect(nameInput.value).toBe('Alice');
    expect(emailInput.value).toBe('alice@example.com');
    expect(messageInput.value).toBe('Hello there!');
  });

  it('replaces the form with a thank-you message after submission', () => {
    const [nameInput, emailInput, messageInput] = screen.getAllByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // fill and submit
    fireEvent.change(nameInput, { target: { value: 'Bob' } });
    fireEvent.change(emailInput, { target: { value: 'bob@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hi!' } });
    fireEvent.click(sendButton);

    // form should be gone
    expect(screen.queryByRole('textbox')).toBeNull();

    // thank-you texts
    expect(screen.getByText(/thank you for reaching out!/i)).toBeInTheDocument();
    expect(screen.getByText(/we'll get back to you soon\./i)).toBeInTheDocument();
  });
});
