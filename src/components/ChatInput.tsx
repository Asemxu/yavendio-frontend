/* eslint-disable no-unused-vars */
import "../assets/ChatInput.css"

interface ChatInputProps {
    addMessage: () => void;
    onChangeInputMessage: (messageValue: string) => void;
    message: string
}
const ChatInput = ({ addMessage, onChangeInputMessage, message }: ChatInputProps) => {
    return (
        <form onSubmit={(e) => { e.preventDefault();addMessage(); }} className="chat-input">
            <input className="input-message" type="text" placeholder="Ingrese mensaje" value={message} onChange={(e) => { onChangeInputMessage(e.target.value); }} required />
            <button type="submit" className="btn-send-message">Enviar</button>
        </form>

    )
}

export default ChatInput;