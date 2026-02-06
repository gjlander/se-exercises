import http, { type RequestListener } from 'node:http';

const posts = [
	{
		id: '1',
		title: 'First post',
		content: 'Hello world!'
	},
	{
		id: '2',
		title: 'Second post',
		content: 'My second post!'
	}
];

const createResponse = (
	res: http.ServerResponse,
	statusCode: number,
	message: unknown
) => {
	res.writeHead(statusCode, { 'Content-Type': 'application/json' });
	return res.end(
		typeof message === 'string'
			? JSON.stringify({ message })
			: JSON.stringify(message)
	);
};

const requestHandler: RequestListener = (req, res) => {
	const singlePostRegex = /^\/posts\/[0-9a-zA-Z]+$/; // Simple expression to match the pattern /posts/anything
	const { method, url } = req;
	if (url === '/posts') {
		if (method === 'GET') {
			return createResponse(res, 200, posts);
		}
		if (method === 'POST') {
			let body = '';
			// The body of the request is received in chunks
			req.on('data', chunk => {
				body += chunk.toString();
			});
			// Once all the data is collected
			req.on('end', () => {
				const newPost = { id: crypto.randomUUID(), ...JSON.parse(body) };
				posts.push(newPost);
				createResponse(res, 201, newPost);
			});
			return;
		}
		return createResponse(res, 405, 'Method Not Allowed');
	}
	if (singlePostRegex.test(url!)) {
		if (method === 'GET') {
			return createResponse(res, 200, `GET request on ${url}`);
		}
		if (method === 'PUT') {
			return createResponse(res, 200, `PUT request on ${url}`);
		}
		if (method === 'DELETE') {
			return createResponse(res, 200, `DELETE request on ${url}`);
		}
		return createResponse(res, 405, 'Method Not Allowed');
	}
	return createResponse(res, 404, 'Not Found');
};

const server = http.createServer(requestHandler);

const port = 3000;
server.listen(port, () =>
	console.log(`Server running at <http://localhost>:${port}/`)
);
