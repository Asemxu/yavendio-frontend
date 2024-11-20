import { render, screen } from '@testing-library/react';
import { act } from 'react'
import Message from '../interfaces/Message';
import RandomUsername from '../utils/RandomUsername';
import ChatWindow from '../components/ChatWindow';


const mockMessages: Array<Message> = [
    {
        id: 1,
        text: "Mi mensaje",
        isUser: false,
        username: "Renzo"
    },
    {
        id: 2,
        text: "Mi mensaje random",
        isUser: false,
        username: RandomUsername()
    },
    {
        id: 3,
        text: "Mi mensaje random",
        isUser: false,
        username: RandomUsername()
    },
    {
        id: 4,
        text: "Mi mensaje random",
        isUser: false,
        username: RandomUsername()
    }
]

test('get chat-window', () => {
    const { container } = render(<ChatWindow messages={mockMessages} />);
    const chatMessageContainer = container.querySelector('.chat-window')
    expect(chatMessageContainer).toBeInTheDocument();
});

test('show same count messages with component chat-message-container', () => {
    const { container } = render(<ChatWindow messages={mockMessages} />);
    const chatMessageContainer = container.querySelectorAll('.chat-message-container')

    expect(chatMessageContainer.length).toEqual(mockMessages.length);
});


test('compare different count messages with component chat-message-container', () => {
    const { container } = render(<ChatWindow messages={mockMessages} />);
    const chatMessageContainer = container.querySelectorAll('.chat-message-container')

    expect(chatMessageContainer.length).not.toEqual(5);
});

test('verify dont render the messages when not have messages', () => {
    const { container } = render(<ChatWindow messages={[]} />);
    const chatMessagesContainer = container.querySelectorAll('.chat-message-container')
    const chatMessageContainer = container.querySelector('.chat-message-container')

    expect(chatMessagesContainer.length).toEqual(0);
    expect(chatMessageContainer).toBeNull();

});