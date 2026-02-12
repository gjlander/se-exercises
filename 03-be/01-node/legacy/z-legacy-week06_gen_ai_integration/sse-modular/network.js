const getAPIResponse = async (options) => {
    const response = await fetch(
        'http://localhost:5050/api/v1/chat/completions',
        options
    );
    if (!response.ok) {
        // If the response is not ok, throw an error by parsing the JSON response
        const { error } = await response.json();
        throw new Error(error);
    }

    return response;
};

const handleStream = async (response, resultsContainer) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let dataResult = '';
    const p = document.createElement('p');
    resultsContainer.appendChild(p);

    let isDone = false;

    while (!isDone) {
        const result = await reader.read();
        // console.log('result: ', result);

        if (result.done) {
            isDone = true;
            break;
        }
        const chunk = decoder.decode(result.value, { stream: true });
        // console.log('chunk: ', chunk);

        const lines = chunk.split('\n');
        // console.log('lines: ', lines);

        lines.forEach((line) => {
            // Check if the line starts with data:, that's how Open AI sends the data
            if (line.startsWith('data:')) {
                // Get the JSON string without the data: prefix
                const jsonStr = line.replace('data:', '');
                const data = JSON.parse(jsonStr);
                // console.log('data :', data);

                const content = data.choices[0]?.delta?.content;
                // console.log('content: ', content);
                if (content) {
                    dataResult += content;
                    // p.innerHTML = dataResult;
                    // console.log(dataResult);
                    const md = marked.parse(dataResult);
                    // Add the content to the paragraph element;
                    p.innerHTML = md;
                    Prism.highlightAll();
                }
            }
        });
    }
};

const handleJSON = async (response, resultsContainer) => {
    const data = await response.json();
    // Log the response to the console
    // console.log('data: ', data);
    // resultsContainer.innerHTML = data.message?.content;
    resultsContainer.innerHTML = `<p>${marked.parse(
        data.message?.content
    )}</p>`;
    Prism.highlightAll();
};
export { getAPIResponse, handleStream, handleJSON };
