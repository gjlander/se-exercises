import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    const chatRef = useRef(null);

    const [messages, setMessages] = useState([
        {
            role: 'system',
            content: 'You are a web developer.',
        },
    ]);
    const [base64, setBase64] = useState(
        JSON.parse(localStorage.getItem('avatar')) || ''
    );
    return (
        <div>
            <Navbar />
            <Outlet
                context={{ chatRef, messages, setMessages, base64, setBase64 }}
            />
        </div>
    );
};

export default RootLayout;
