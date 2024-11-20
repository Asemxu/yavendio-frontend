import { useState , useEffect} from "react"
import Message from "../interfaces/Message"
import randomUsername from "../utils/RandomUsername";
const useChat = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [username,setUsername] = useState(randomUsername)
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState<Message[]>([]);
    const sendMessage = (message: Message) => {
        if(ws){
            ws.send(JSON.stringify(message))
            setMessages([...messages, message])
            clearMessage()
        }
    }

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

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    
        setWs(socket);
    
        return () => {
            socket.close();
        };
    }, []);
    
 
    const clearMessage = () => {
        setMessage("")
    }

    return {
        messages,
        ws,
        setWs,
        clearMessage,
        message,
        setMessage,
        setMessages,
        sendMessage,
        username,
        setUsername,
    }
}

export default useChat