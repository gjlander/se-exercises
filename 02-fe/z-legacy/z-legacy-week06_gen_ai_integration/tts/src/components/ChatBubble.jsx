import Markdown from 'marked-react';
import { Refractor, registerLanguage } from 'react-refractor';
import { useOutletContext } from 'react-router-dom';
import AudioStreamer from '@weyvern/audiostreamer';

import bash from 'refractor/lang/bash';
import js from 'refractor/lang/javascript.js';
import php from 'refractor/lang/php.js';
import python from 'refractor/lang/python.js';
// import ReadBtn from './ReadBtn';

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
    const { base64 } = useOutletContext();
    return (
        <div
            className={`chat ${
                role === 'assistant' ? 'chat-start' : 'chat-end'
            }`}
        >
            <div className='chat-image avatar'>
                {role === 'assistant' ? (
                    <div className='w-10 rounded-full py-1 text-center'>
                        Bot
                    </div>
                ) : (
                    <div className='w-10 rounded-full py-1 text-center'>
                        {base64 ? (
                            <img src={`data:image/png;base64,${base64}`} />
                        ) : (
                            'You'
                        )}
                    </div>
                )}
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
            {role === 'assistant' && (
                <AudioStreamer
                    label='Read it to me'
                    fetcher={() =>
                        fetch(`http://localhost:5050/api/v1/audio/speech`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json ',
                                provider: 'open-ai',
                                mode: 'development',
                            },
                            body: JSON.stringify({
                                model: 'tts-1',
                                voice: 'echo',
                                input: content,
                            }),
                        })
                    }
                    containerClassName='flex  items-center justify-end gap-5'
                    audioClassName='w-full bg-transparent'
                    buttonClassName='btn btn-primary btn-outline'
                />
            )}
        </div>
    );
};

export default ChatBubble;
