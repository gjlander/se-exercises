import { getAPIResponse, handleJSON, handleStream } from './network.js';
const form = document.querySelector('form');
const resultsContainer = document.querySelector('#results');

let messages = [
    {
        role: 'system',
        content:
            'You are a software developer student that only speaks in rhymes', // This is the system message, it will control the behavior of the chatbot
    },
];

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();

        const {
            prompt: { value: promptValue },
            stream: { checked: streamValue },
            submit,
        } = form.elements;

        if (!promptValue) return alert('Please enter a prompt');

        resultsContainer.innerHTML = '';
        // Disable the submit button
        submit.disabled = true;
        submit.classList.add(
            'bg-gray-500',
            'hover:bg-gray-500',
            'cursor-not-allowed'
        );
        stream.disabled = true;

        console.log('form element values: ', promptValue, streamValue);

        const response = await getAPIResponse({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                mode: 'development', // Set the mode to development to not send the request to Open AI for now
                provider: 'open-ai',
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                stream: streamValue,
                messages: [
                    ...messages,
                    {
                        role: 'user',
                        content: promptValue, // This is the user message, it will be the prompt for the chatbot
                    },
                ],
            }),
        });

        if (streamValue) {
            handleStream(response, resultsContainer);
        } else {
            handleJSON(response, resultsContainer);
        }
    } catch (error) {
        console.error(error);
    } finally {
        // Enable the submit button
        submit.disabled = false;
        submit.classList.remove(
            'bg-gray-500',
            'hover:bg-gray-500',
            'cursor-not-allowed'
        );
        stream.disabled = false;
    }
});
