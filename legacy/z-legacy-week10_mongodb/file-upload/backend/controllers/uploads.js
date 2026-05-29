import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const uploadFile = asyncHandler(async (req, res, next) => {
    console.log(req.file);

    res.json({ message: 'Tried to upload a file' });
});
