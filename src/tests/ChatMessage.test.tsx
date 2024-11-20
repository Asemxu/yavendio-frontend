/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import ChatMessage from '../components/ChatMessage';
import Message from '../interfaces/Message';
import RandomUsername from '../utils/RandomUsername';

const messageUser: Message = {
  id: 1,
  text: "Mi mensaje",
  isUser: true,
  username: "Renzo"

}

const messageRandom: Message = {
  id: 2,
  text: "Mi mensaje random",
  isUser: false,
  username: RandomUsername()

}

describe('ChatMessage', () => {
  describe('ChatMessage', () => {
    it('get chat-message-container', () => {
      const { container } = render(<ChatMessage message={messageUser} />);
      const chatMessageContainer = container.querySelector('.chat-message-container')

      expect(chatMessageContainer).toBeInTheDocument();
    });

    it('get chat-message-container by className', () => {
      const { container } = render(<ChatMessage message={messageUser} />);
      const chatMessageContainer = container.querySelector('.chat-message-container')

      expect(chatMessageContainer).toHaveClass('chat-message-container');

    });

    it('get chat-message-container by  isUser', () => {
      const { container } = render(<ChatMessage message={messageUser} />);
      const chatMessageContainer = container.querySelector('.chat-message-container')

      expect(chatMessageContainer).toHaveClass('right');

    });


    it('get chat-message-container by NotUser', () => {
      const { container } = render(<ChatMessage message={messageRandom} />);
      const chatMessageContainer = container.querySelector('.chat-message-container')

      expect(chatMessageContainer).toHaveClass('left');
    });


    it('show message User', () => {
      render(<ChatMessage message={messageRandom} />);
      const messageText = screen.getByText(messageRandom.text).textContent
      expect(messageText).toContain("Mi mensaje random");
    });

  })
})

