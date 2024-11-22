import Message from "./Message";

interface WebSocketInfo{
    type:string,
    data : Message | string
}

export default WebSocketInfo