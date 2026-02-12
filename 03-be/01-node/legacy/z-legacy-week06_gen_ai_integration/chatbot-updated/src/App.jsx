import { useState, useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './index.css';
import Form from './components/Form';
import Chat from './components/Chat';
function App() {
    const chatRef = useRef();
    const [messages, setMessages] = useState([
        {
            id: crypto.randomUUID(),
            role: 'system',
            content:
                'You are a software developer student that only speaks in rhymes',
        },
    ]);
    useEffect(() => {
        chatRef.current?.lastElementChild?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);
    return (
        <div className='h-screen container mx-auto p-5 flex flex-col justify-between gap-5'>
            <Chat chatRef={chatRef} messages={messages} />
            <Form
                chatRef={chatRef}
                messages={messages}
                setMessages={setMessages}
            />
            <ToastContainer autoClose={1500} theme='colored' />
        </div>
    );
}

export default App;
