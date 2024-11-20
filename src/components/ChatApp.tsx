import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";
import "../assets/ChatApp.css"
import useChat from "../hooks/useChat"
const ChatApp = () => {
    const { messages , sendMessage , username  , setMessage , message} = useChat();
    return (
        <div className="chat-app-container">
            <ChatWindow messages={messages}/>
            <ChatInput 
                message={message}
                addMessage={(e) => {
                    e.preventDefault();
                    sendMessage({
                        id : messages.length + 1,
                        username : username,
                        text : message,
                        isUser : true
                    })
                }}
                onChangeInputMessage={(message) => {
                    setMessage(message)
                }}
             />
        </div>
    )
}

export default ChatApp;