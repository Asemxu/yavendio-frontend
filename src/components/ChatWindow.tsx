import "../assets/ChatWindow.css"
import ChatMessage from "./ChatMessage";
import Message from "../interfaces/Message";

interface ChatWindowProps{
    messages : Message[]
}

const ChatWindow = (  { messages } : ChatWindowProps) => {
    return (
        <div className="chat-window">
            {messages.map((message:Message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
        </div>
    )
}

export default ChatWindow;