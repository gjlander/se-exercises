import { useState } from 'react';
import { toast } from 'react-toastify';

const Form = ({ setMessages, messages }) => {
    // control checkbox and textarea with single state
    // OR have 1 piece of state for each
    const [isStream, setIsStream] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const toggleChecked = () => setIsStream((prev) => !prev);
    const handleChange = (e) => setPrompt(e.target.value);
    const handleSubmit = async (e) => {
        try {
            // Prevent the form from submitting
            e.preventDefault();
            // If the prompt value is empty, alert the user
            if (!prompt) throw new Error('Please enter a prompt');
            console.log('messages count: ', messages.length);
            if (messages.length > 9) throw new Error('Message limit reached');

            // Disable the submit button
            setLoading(true);
            const userMsg = {
                id: crypto.randomUUID(),
                role: 'user',
                content: prompt,
            };
            setMessages((prev) => [...prev, userMsg]);
            // console.log('messages in request: ', messages);
            console.log('messages in request: ', [...messages, userMsg]);
            // Request
            const response = await fetch(
                'http://localhost:5050/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        mode: 'development', // Set the mode to development to not send the request to Open AI for now
                        provider: 'open-ai',
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o',
                        stream: isStream,
                        messages: [...messages, userMsg],
                    }),
                }
            );
            if (!response.ok) {
                // If the response is not ok, throw an error by parsing the JSON response
                const { error } = await response.json();
                throw new Error(error);
            }
            // Conditionally process the response depending on the value of `isStream`
            if (isStream) {
                // Process stream response
                // Get the responses stream
                const reader = response.body.getReader();
                // Create a new TextDecoder
                const decoder = new TextDecoder('utf-8');
                const asstMsg = {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: '',
                };

                // Variable to check if the stream is done
                let isDone = false;
                // While the stream is not closed, i.e. done is false
                while (!isDone) {
                    // Read the next chunk
                    const result = await reader.read();
                    // If the result is done, break out of the loop
                    if (result.done) {
                        isDone = true;
                        break;
                    }
                    // Decode the result
                    const chunk = decoder.decode(result.value, {
                        stream: true,
                    });
                    // Split lines by new line, you can get more than one line per chunk
                    const lines = chunk.split('\n');
                    // Loop through each line
                    lines.forEach((line) => {
                        // Check if the line starts with data:, that's how Open AI sends the data
                        if (line.startsWith('data:')) {
                            // Get the JSON string without the data: prefix
                            const jsonStr = line.replace('data:', '');
                            // Parse the JSON string
                            const data = JSON.parse(jsonStr);
                            // Get the content from the first choice
                            const content = data.choices[0]?.delta?.content;
                            // If there is content
                            if (content) {
                                setMessages((prev) => {
                                    const msgExists = prev.some(
                                        (msg) => msg.id === asstMsg.id
                                    );
                                    // console.log('prev', prev);

                                    if (!msgExists) {
                                        asstMsg.content = content;
                                        return [...prev, asstMsg];
                                    } else {
                                        return prev.map((msg) =>
                                            msg.id === asstMsg.id
                                                ? {
                                                      ...msg,
                                                      content:
                                                          msg.content + content,
                                                  }
                                                : msg
                                        );
                                    }
                                });
                                // dataResult += content;
                                // const md = marked.parse(dataResult);
                                // // Add the content to the paragraph element;
                                // p.innerHTML = md;
                                // Prism.highlightAll();
                            }
                        }
                    });
                }
            } else {
                // Process response normally
                const dataResult = await response.json();
                const asstMsg = {
                    ...dataResult.message,
                    id: crypto.randomUUID(),
                };
                setMessages((prev) => [...prev, asstMsg]);
                // Output the response to the results container
                // resultsContainer.innerHTML = `<p>${marked.parse(
                //     dataResult.message?.content
                // )}</p>`;
                // Prism.highlightAll();
            }
        } catch (error) {
            // If an error occurs, log it to the console
            // console.error(error);
            toast.error(error.message);
        } finally {
            // Enable the submit button
            setLoading(false);
        }
    };

    return (
        <div className='h-1/3 w-full p-8 bg-slate-600 rounded-lg shadow-md'>
            <form onSubmit={handleSubmit}>
                <label className='flex gap-2 items-center my-2'>
                    <input
                        id='stream'
                        type='checkbox'
                        className='checkbox checkbox-primary'
                        checked={isStream}
                        onChange={toggleChecked}
                        disabled={loading}
                    />
                    <span>Stream response?</span>
                </label>
                <textarea
                    value={prompt}
                    onChange={handleChange}
                    id='prompt'
                    rows='5'
                    placeholder='Ask me anything...'
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                ></textarea>
                <button
                    id='submit'
                    type='submit'
                    className='mt-4 w-full btn btn-primary'
                    disabled={loading}
                >
                    Submit✨
                </button>
            </form>
        </div>
    );
};

export default Form;
