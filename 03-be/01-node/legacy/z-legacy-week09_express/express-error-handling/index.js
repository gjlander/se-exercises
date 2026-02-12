import express from 'express';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.get('/', (req, res) => {
    throw new Error('Something went wrong', { cause: 400 });
});

app.get('/error-from-callback', (req, res, next) => {
    readFile('/maybe-valid-file', 'utf-8', (err, data) => {
        if (err) {
            return next(err);
        }
        return res.send(data);
    });
});

app.get('/error-from-sync', (req, res) => {
    throw new Error('Throwing openly in sync code', { cause: 418 });
});

app.get('/error-from-async', async (req, res) => {
    throw new Error('Throwing openly in async code', { cause: 418 });
});

app.use(errorHandler);

app.listen(3000, () =>
    console.log('Server is running on http://localhost:3000')
);
