import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageItem from './MessageItem';

describe('MessageItem Component', () => {
  it('renders the message and sender name correctly for a receiver', () => {
    render(<MessageItem name="Alice" message="Hello!" isSender={false} />);

    // Ensure the sender's name is displayed
    expect(screen.getByText('Alice')).toBeInTheDocument();

    // Ensure the message content is displayed
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('does not render the sender name for a sender', () => {
    render(<MessageItem name="Me" message="Hi there!" isSender={true} />);

    // Ensure the sender's name is NOT displayed
    expect(screen.queryByText('Me')).not.toBeInTheDocument();

    // Ensure the message content is displayed
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('positions the message on the right for a sender', () => {
    const { container } = render(<MessageItem name="Me" message="Hi!" isSender={true} />);

    // Ensure the container has the right alignment
    expect(container.firstChild).toHaveStyle('justify-content: flex-end');
  });

  it('positions the message on the left for a receiver', () => {
    const { container } = render(<MessageItem name="Alice" message="Hello!" isSender={false} />);

    // Ensure the container has the left alignment
    expect(container.firstChild).toHaveStyle('justify-content: flex-start');
  });
});
