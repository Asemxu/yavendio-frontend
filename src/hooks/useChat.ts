import { useState , useEffect} from "react"
import Message from "../interfaces/Message"
import randomUsername from "../utils/RandomUsername";
const useChat = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
    
        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };
    
        socket.onmessage = (event) => {
            const  message = JSON.parse(event.data) as Message;
            message.isUser = false
            setMessages((prevMessages) => [...prevMessages, message]);
        };
    
        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
    
        setWs(socket);
    
        return () => {
            socket.close();
        };
    }, []);
    
    const [username,setUsername] = useState(randomUsername)
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState<Message[]>([]);
    const addMessage = (message: Message) => {
        if(ws){
            ws.send(JSON.stringify(message))
            setMessages([...messages, message])
            clearMessage()
        }
        
    }

    const clearMessage = () => {
        setMessage("")
    }

    return {
        messages,
        message,
        setMessage,
        setMessages,
        addMessage,
        username,
        setUsername,
    }
}

export default useChat