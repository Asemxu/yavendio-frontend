/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react"
import Message from "../interfaces/Message"
import randomUsername from "../utils/RandomUsername";
import { DATA, MESSAGES, TYPEDATASEND, TYPEUSER } from "../utils/constant";
import WebSocketInfo from "../interfaces/WebSocketInfo";
import { toast, ToastOptions } from "react-toastify";
const useChat = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [username, setUsername] = useState(randomUsername)
    const [message, setMessage] = useState(DATA.EMPTY)
    const [messages, setMessages] = useState<Message[]>([]);
    const sendMessage = (message: Message) => {
        if (ws) {
            ws.send(JSON.stringify(message))
            setMessages([...messages, message])
            clearMessage()
        }
    }

    const handleSocketMessage = useCallback((event: MessageEvent) => {
        const infoSocket: WebSocketInfo = JSON.parse(event.data as string) as WebSocketInfo;

        switch (infoSocket.type) {
            case TYPEDATASEND.NEWUSER:
                toast(MESSAGES.NEWUSER, DATA.TOASTOPTIONSDEFAULT as ToastOptions);
                break;
            case TYPEDATASEND.MESSAGE: {
                const message: Message = infoSocket.data as Message;
                message.isUser = TYPEUSER.NOTUSER;
                setMessages((prevMessages) => [...prevMessages, message]);
                break;
            }
            default:
                break;
        }
    }, [setMessages]);

    useEffect(() => {
        const socket = new WebSocket(DATA.WEBSOCKETSERVER);

        socket.onopen = () => {
            console.log(MESSAGES.USERCONNECTED);
        };

        socket.onmessage = handleSocketMessage;

        socket.onclose = () => {
            console.log(MESSAGES.USERDISCONNECTED);
        };

        socket.onerror = (error) => {
            error.stopPropagation();
        };

        setWs(socket);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [handleSocketMessage]);


    const incrementId = () => {
        return messages.length + 1;
    }

    const clearMessage = () => {
        setMessage(DATA.EMPTY)
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