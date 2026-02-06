import { useOutletContext } from 'react-router-dom';
import ChatBubble from './ChatBubble';

const Chat = () => {
    const { messages, chatRef } = useOutletContext();
    return (
        <div
            ref={chatRef}
            className='w-full h-1/2 max-h-[60vh] p-8 bg-base-300 rounded-lg shadow-md overflow-y-scroll'
        >
            {messages.map((message) => {
                if (message.role === 'system') return;
                return <ChatBubble key={message.id} {...message} />;
            })}
        </div>
    );
};

export default Chat;
