import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";
import "../assets/ChatApp.css"
import useChat from "../hooks/useChat"
import { TYPEUSER } from "../utils/constant";
const ChatApp = () => {
    const { messages , sendMessage , username  , setMessage , message , incrementId} = useChat();
    return (
        <div className="chat-app-container">
            <ChatWindow messages={messages}/>
            <ChatInput 
                message={message}
                addMessage={() => {
                    sendMessage({
                        id : incrementId(),
                        username : username,
                        text : message,
                        isUser : TYPEUSER.ISUSER
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