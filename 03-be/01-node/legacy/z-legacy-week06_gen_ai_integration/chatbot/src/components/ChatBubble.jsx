import Markdown from 'marked-react';
import { Refractor, registerLanguage } from 'react-refractor';

import bash from 'refractor/lang/bash';
import js from 'refractor/lang/javascript.js';
import php from 'refractor/lang/php.js';
import python from 'refractor/lang/python.js';

registerLanguage(bash);
registerLanguage(js);
registerLanguage(php);
registerLanguage(python);

const renderer = {
    code(snippet, lang) {
        if (!lang) lang = 'bash';
        const allowedLangs = ['js', 'php', 'python'];
        if (!allowedLangs.includes(lang)) lang = 'bash';
        return (
            <Refractor key={this.elementId} language={lang} value={snippet} />
        );
    },
};

const ChatBubble = ({ role, content }) => {
    return (
        <div
            className={`chat ${
                role === 'assistant' ? 'chat-start' : 'chat-end'
            }`}
        >
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full py-1 text-center'>
                    {role === 'assistant' ? 'Bot' : 'You'}
                </div>
            </div>
            <div
                className={`chat-bubble ${
                    role === 'assistant'
                        ? 'chat-bubble-primary'
                        : 'chat-bubble-secondary'
                }`}
            >
                <Markdown gfm renderer={renderer}>
                    {content}
                </Markdown>
            </div>
        </div>
    );
};

export default ChatBubble;
