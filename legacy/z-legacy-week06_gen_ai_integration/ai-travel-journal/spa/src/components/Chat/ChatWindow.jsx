/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { getChatHistory } from '@/data/gemini';
import Form from './Form';
import Chat from './Chat';
const ChatWindow = () => {
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(localStorage.getItem('chatId'));

  useEffect(() => {
    const getAndSetChatHistory = async () => {
      try {
        const { history } = await getChatHistory(chatId);
        setMessages(history);
      } catch (error) {
        console.error(error);

        localStorage.removeItem('chatId');
      }
    };

    chatId && getAndSetChatHistory();
  }, []);

  useEffect(() => {
    chatRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className='max-h-[75vh] w-full max-w-[600px] flex flex-col bg-slate-600 rounded-lg'>
      <Chat chatRef={chatRef} messages={messages} />
      <Form chatRef={chatRef} setMessages={setMessages} chatId={chatId} setChatId={setChatId} />
      <ToastContainer autoClose={1500} theme='colored' />
    </div>
  );
};

export default ChatWindow;
