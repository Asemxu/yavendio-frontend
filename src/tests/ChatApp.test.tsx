import { render, fireEvent } from '@testing-library/react';
import ChatApp from '../components/ChatApp';
import WS from "jest-websocket-mock";

const timeout = 10000

test('get chat-app render without crashed', () => {
  render(<ChatApp />);
  const chatInput = document.querySelector('.chat-app-container');
  expect(chatInput).toBeInTheDocument();
});

test('alls addMessage when the form is submitted', async () => {
  let server = new WS("ws://localhost:8080");
  render(<ChatApp />)
  await server.connected;
  const inputElement = document.querySelector('.input-message') as HTMLInputElement;
  const formElement = document.querySelector('.chat-input') as HTMLFormElement;

  fireEvent.change(inputElement, { target: { value: 'Nuevo mensaje' } });
  fireEvent.submit(formElement);
  const messageContainer = document.querySelectorAll('.chat-message-container')

  expect(messageContainer).toHaveLength(1); 
  expect(messageContainer[0].textContent).toContain('Nuevo mensaje');
  WS.clean()
},timeout);

test('form component is render', async () => {
  render(<ChatApp />);
  const inputElement = document.querySelector('.chat-input') as HTMLFormElement;
  expect(inputElement).toBeInTheDocument();
},timeout);

test('chat window is render', async () => {
  render(<ChatApp />);
  const divElement = document.querySelector('.chat-window') as HTMLDivElement;
  expect(divElement).toBeInTheDocument();
},timeout);

