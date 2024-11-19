import '../assets/ChatMessage.css'
import Message from '../interfaces/Message';

interface messageProps{
    message : Message
}

const ChatMessage = ({ message } : messageProps ) => {
    return (
        <div className={`chat-message-container ${message.isUser ? 'right' : 'left'}`}>
            <div>
                {message.isUser ? <h5 className='user-text-title'>Me:</h5>  : <h5 className='user-text-title'> User {message.username.substring(0,5)}:</h5>}
                <span className={`chat-message `}>
                    {message.text}
                </span>
            </div>
        </div>
       
    )
}

export default ChatMessage;
