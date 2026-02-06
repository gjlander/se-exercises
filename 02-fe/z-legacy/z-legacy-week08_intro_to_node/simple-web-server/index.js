import http from 'http';
import {
    createFileWithMessage,
    deleteFileByName,
    readFileByName,
} from './fileFunctions.js';
const url1 = '/files/date/time.txt';
const url2 = '/files/2024-07-15/13-44-25.txt';
const url3 = '/files/something/else';
/* 
matches the characters `/files/` followed by 2 segments separated by / 
where numbers, lowercase and uppercase characters are allowed, for the first segment - is allowed
for the second segment : is allowed. The string should end in .txt 
*/
// console.log(regex.test(url1)); // Expected output: true
// console.log(regex.test(url2)); // Expected output: true
// console.log(regex.test(url3)); // Expected output: false

const requestHandler = async (req, res) => {
    const regex = /^\/files\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.txt$/;
    const { method, url } = req;
    res.setHeader('Content-Type', 'application/json');
    if (url === '/files') {
        if (method === 'POST') {
            let body = '';
            // The body of the request is received in chunks
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            // Once all the data is collected
            req.on('end', async () => {
                await createFileWithMessage(body);

                res.statusCode = 201;

                return res.end(
                    JSON.stringify({ msg: 'File created', content: body })
                );
            });
        }
        res.statusCode = 405;
        return res.end(
            JSON.stringify({
                error: 'Invalid method. Can only POST on this route.',
            })
        );
    }
    if (regex.test(url)) {
        const filePath = url.slice(7);
        if (method === 'GET') {
            const fileContent = await readFileByName(filePath);
            if (!fileContent) {
                res.statusCode = 404;
                return res.end(
                    JSON.stringify({
                        error: `Error 404: File does not exist.`,
                    })
                );
            }

            return res.end(
                JSON.stringify({
                    msg: `${filePath} Contents`,
                    content: fileContent,
                })
            );
        }

        if (method === 'DELETE') {
            await deleteFileByName(filePath);
            return res.end(JSON.stringify({ msg: `${filePath} deleted` }));
        }
        res.statusCode = 405;
        return res.end(
            JSON.stringify({
                msg: 'Invalid method. Can only GET or DELETE on this route.',
            })
        );
    }
    res.statusCode = 404;
    return res.end(
        JSON.stringify({
            error: 'Route not found.',
        })
    );
};

const server = http.createServer(requestHandler);

const port = 3000;

server.listen(port, () =>
    console.log(`Server running at http://localhost:${port}/`)
);
