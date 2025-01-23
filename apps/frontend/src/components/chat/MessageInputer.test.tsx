import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MessageInputer from './MessageInputer';

describe('MessageInputer Component', () => {
  const mockOnSend = jest.fn();

  beforeEach(() => {
    mockOnSend.mockClear();
  });

  test('renders the form correctly', () => {
    render(<MessageInputer onSend={mockOnSend} />);

    // Check if Name and Message fields are rendered
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

    // Check if Send button is rendered
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls onSend with valid inputs', async () => {
    render(<MessageInputer onSend={mockOnSend} />);

    // Fill in the Name and Message fields
    await userEvent.type(screen.getByLabelText(/Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Message/i), 'Hello, World!');

    // Click the Send button
    fireEvent.click(screen.getByRole('button'));

    // Wait for form submission and check if onSend is called
    await waitFor(() =>
      expect(mockOnSend).toHaveBeenCalledWith('John Doe', 'Hello, World!')
    );
  });

  test('displays validation errors for empty fields', async () => {
    render(<MessageInputer onSend={mockOnSend} />);

    // Click the Send button without filling fields
    fireEvent.click(screen.getByRole('button'));

    // Wait for validation errors
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Message is required/i)).toBeInTheDocument();

    // Ensure onSend is not called
    expect(mockOnSend).not.toHaveBeenCalled();
  });

  test('displays validation error if name is too short', async () => {
    render(<MessageInputer onSend={mockOnSend} />);

    // Enter a short name and valid message
    await userEvent.type(screen.getByLabelText(/Name/i), 'Jo');
    await userEvent.type(screen.getByLabelText(/Message/i), 'Hello!');

    // Click the Send button
    fireEvent.click(screen.getByRole('button'));

    // Wait for validation error
    expect(await screen.findByText(/Name must be at least 3 characters/i)).toBeInTheDocument();

    // Ensure onSend is not called
    expect(mockOnSend).not.toHaveBeenCalled();
  });

  test('clears the form after successful submission', async () => {
    render(<MessageInputer onSend={mockOnSend} />);

    // Fill in the Name and Message fields
    const nameField = screen.getByLabelText(/Name/i);
    const messageField = screen.getByLabelText(/Message/i);

    await userEvent.type(nameField, 'John Doe');
    await userEvent.type(messageField, 'Hello, World!');

    // Click the Send button
    fireEvent.click(screen.getByRole('button'));

    // Wait for form submission
    await waitFor(() => {
      expect(nameField).toHaveValue('');
      expect(messageField).toHaveValue('');
    });
  });
});
