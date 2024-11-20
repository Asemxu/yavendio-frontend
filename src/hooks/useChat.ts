import { useState , useEffect} from "react"
import Message from "../interfaces/Message"
import randomUsername from "../utils/RandomUsername";
import { TYPEUSER } from "../utils/constant";
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
            console.log('Conectado');
        };
    
        socket.onmessage = (event: MessageEvent) => {
            const  message : Message = JSON.parse(event.data);
            message.isUser = TYPEUSER.NOTUSER
            setMessages((prevMessages) => [...prevMessages, message]);
        };
    
        socket.onclose = () => {
            console.log('Desconectado');
        };

        socket.onerror = (error) => {
            error.stopPropagation()
        };
    
        setWs(socket);
    
        return () => {
            if(ws)
                socket.close();
        };
    }, []);
    
    const incrementId = () => {
        return messages.length + 1;
    }
 
    const clearMessage = () => {
        setMessage("")
    }

    return {
        messages,
        ws,
        incrementId,
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