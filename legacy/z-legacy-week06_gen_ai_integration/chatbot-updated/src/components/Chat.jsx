import ChatBubble from './ChatBubble';
const Chat = ({ messages, chatRef }) => {
    return (
        <div
            ref={chatRef}
            id='results'
            className='h-2/3 w-full p-8 bg-slate-600 rounded-lg shadow-md overflow-y-auto'
        >
            {messages?.map((msg) => {
                if (msg.role === 'system') return null;
                return <ChatBubble key={msg.id} {...msg} />;
            })}
        </div>
    );
};

export default Chat;
