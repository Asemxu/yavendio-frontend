/* eslint-disable testing-library/no-node-access */
import { render, fireEvent } from '@testing-library/react';
import ChatApp from '../components/ChatApp';
import WS from "jest-websocket-mock";

describe('ChatApp', () => {
  describe('ChatApp', () => {
    it('get chat-app render without crashed', async () => {
      render(<ChatApp />);
      const chatInput = document.querySelector('.chat-app-container');
      expect(chatInput).toBeInTheDocument();
    })
    it('alls addMessage when the form is submitted', async () => {
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
      server.close()
      WS.clean()
    });

    it('form component is render', async () => {
      render(<ChatApp />);
      const inputElement = document.querySelector('.chat-input') as HTMLFormElement;
      expect(inputElement).toBeInTheDocument();
    });

    it('chat window is render', async () => {
      render(<ChatApp />);
      const divElement = document.querySelector('.chat-window') as HTMLDivElement;
      expect(divElement).toBeInTheDocument();
    });

  })
})



