import "../assets/ChatInput.css"

interface ChatInputProps {
    addMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    onChangeInputMessage: (message: string) => void;
    message: string
}
const ChatInput = ({ addMessage, onChangeInputMessage, message }: ChatInputProps) => {
    return (
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { addMessage(e); }} className="chat-input">
            <input className="input-message" type="text" placeholder="Ingrese mensaje" value={message} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChangeInputMessage(e.target.value); }} required />
            <button type="submit" className="btn-send-mwessage">Enviar</button>
        </form>

    )
}

export default ChatInput;