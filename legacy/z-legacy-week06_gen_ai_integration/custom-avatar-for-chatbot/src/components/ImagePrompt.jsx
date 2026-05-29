import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ImagePrompt = () => {
    const { setBase64 } = useOutletContext();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        try {
            // Prevent the form from submitting
            e.preventDefault();

            // Disable the submit button
            setIsLoading(true);

            // If the prompt value is empty, alert the user
            if (!prompt) return alert('Please enter a prompt');

            const reqObject = {
                model: 'dall-e-3',
                prompt,
                n: 1,
                size: '1024x1024',
                response_format: 'b64_json',
            };

            // Request
            const response = await fetch(
                'http://localhost:5050/api/v1/images/generations',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        mode: 'production', // Set the mode to development to not send the request to Open AI for now
                        provider: 'open-ai',
                    },
                    body: JSON.stringify(reqObject),
                }
            );
            if (!response.ok) {
                // If the response is not ok, throw an error by parsing the JSON response
                const { error } = await response.json();
                throw new Error(error);
            }

            // Process response normally
            const dataResult = await response.json();
            console.log(dataResult);
            setBase64(dataResult[0].b64_json);
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
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 h-1/2 w-full p-8 bg-base-300 rounded-lg shadow-md'
        >
            <textarea
                id='prompt'
                rows='5'
                placeholder='Describe your image...'
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
    );
};

export default ImagePrompt;
