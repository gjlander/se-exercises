import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Form = () => {
    const { chatRef, messages, setMessages } = useOutletContext();
    const [isStream, setIsStream] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            // Prevent the form from submitting
            e.preventDefault();
            console.log(messages.length);

            if (messages.length > 9) {
                throw new Error('Message limit reached.');
            }
            // Disable the submit button
            setIsLoading(true);

            // If the prompt value is empty, alert the user
            if (!prompt) return alert('Please enter a prompt');

            const userMessage = {
                id: crypto.randomUUID(),
                role: 'user',
                content: prompt,
            };

            //add prompt to messages
            setMessages((prev) => [...prev, userMessage]);

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
                        messages,
                    }),
                }
            );
            if (!response.ok) {
                // If the response is not ok, throw an error by parsing the JSON response
                const { error } = await response.json();
                throw new Error(error);
            }
            // Conditionally process the response depending on the value of `streamValue`
            if (isStream) {
                // Process stream response
                // Get the responses stream
                const reader = response.body.getReader();
                // Create a new TextDecoder
                const decoder = new TextDecoder('utf-8');
                // Variable to store the data result
                const assistantMessage = {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: '',
                };
                // let dataResult = '';
                // Create a new paragraph element before the loop
                // const p = document.createElement('p');
                // resultsContainer.appendChild(p);
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
                                assistantMessage.content += content;
                                // const md = marked.parse(dataResult);
                                // Add the content to the paragraph element;
                                // p.innerHTML = md;
                                // Prism.highlightAll();
                                // console.log(assistantMessage);
                                setMessages((prev) => {
                                    const messageExists = prev.some(
                                        (msg) => msg.id === assistantMessage.id
                                    );
                                    if (messageExists) {
                                        return prev.map((msg) =>
                                            msg.id !== assistantMessage.id
                                                ? msg
                                                : {
                                                      ...msg,
                                                      content:
                                                          assistantMessage.content,
                                                  }
                                        );
                                    } else {
                                        return [...prev, assistantMessage];
                                    }
                                });
                                chatRef.current.lastElementChild?.scrollIntoView();
                            }
                        }
                    });
                }
            } else {
                // Process response normally
                const dataResult = await response.json();
                const assistantMessage = {
                    ...dataResult.message,
                    id: crypto.randomUUID(),
                };
                // console.log(assistantMessage);
                setTimeout(() => {
                    setMessages((prev) => [...prev, assistantMessage]);
                }, 500);
                chatRef.current.lastElementChild?.scrollIntoView();

                // Output the response to the results container
                // resultsContainer.innerHTML = `<p>${marked.parse(
                //     dataResult.message?.content
                // )}</p>`;
                // Prism.highlightAll();
            }
        } catch (error) {
            // If an error occurs, log it to the console
            alert(error.message);
            console.error(error);
        } finally {
            // Enable the submit button
            setIsLoading(false);
            setPrompt('');
        }
    };
    return (
        // <div className='w-full h-1/3 p-8 bg-base-300 rounded-lg shadow-md'>
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 h-1/2 w-full p-8 bg-base-300 rounded-lg shadow-md'
        >
            <label className='label justify-start gap-2 cursor-pointer'>
                <input
                    type='checkbox'
                    className='checkbox checkbox-primary'
                    checked={isStream}
                    onChange={() => setIsStream((prev) => !prev)}
                    disabled={isLoading}
                />
                <span className='label-text'> Stream response?</span>
            </label>
            <textarea
                id='prompt'
                rows='5'
                placeholder='Ask me anything...'
                className='textarea textarea-primary'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
                id='submit'
                type='submit'
                className='btn btn-primary'
                disabled={isLoading}
            >
                Submit✨
            </button>
        </form>
        // </div>
    );
};

export default Form;
