import { render, fireEvent } from '@testing-library/react';
import ChatInput from '../components/ChatInput';

test('get chat-input render without crashed', () => {
  render(<ChatInput addMessage={() => { }} onChangeInputMessage={() => { }} message="" />);

  const chatInput = document.querySelector('.chat-input');

  expect(chatInput).toBeInTheDocument();
});

test('get verified form submited message', () => {
  const mockAddMessage = jest.fn();
  render(
    <ChatInput addMessage={mockAddMessage} onChangeInputMessage={() => { }} message="" />
  );

  const inputElement = document.querySelector('.input-message') as HTMLInputElement;
  const formElement = document.querySelector('.chat-input') as HTMLFormElement;

  fireEvent.change(inputElement, { target: { value: 'Nuevo mensaje' } });
  fireEvent.submit(formElement);

  expect(mockAddMessage).toHaveBeenCalledWith(expect.any(Object));
});

test('update chat-input when is typing', () => {
  const mockOnChangeInputMessage = jest.fn();
    render(
      <ChatInput addMessage={() => {}} onChangeInputMessage={mockOnChangeInputMessage} message="" />
    );

    const inputElement = document.querySelector('.input-message') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'Nuevo mensaje' } });

    expect(mockOnChangeInputMessage).toHaveBeenCalledWith('Nuevo mensaje');

    expect(mockOnChangeInputMessage).not.toHaveBeenCalledWith('No se ingreso');
});
