import { isValidObjectId } from 'mongoose';
import Post from '../models/Post.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().populate('author');
    res.json(posts);
});

export const createPost = asyncHandler(async (req, res, next) => {
    const { body } = req;
    const newPost = await (await Post.create({ ...body })).populate('author');
    res.status(201).json(newPost);
});

export const getSinglePost = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
    } = req;
    if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
    const post = await Post.findById(id).populate('author');
    if (!post)
        throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
    res.send(post);
});

export const updatePost = asyncHandler(async (req, res, next) => {
    const {
        userId,
        params: { id },
        body: { title, image, content },
    } = req;

    if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);

    // const updatedPost = await Post.findByIdAndUpdate(id, body, {
    //     new: true,
    // }).populate('author');

    const postInDatabase = await Post.findById(id);

    if (!postInDatabase)
        throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);

    postInDatabase.title = title;
    postInDatabase.content = content;
    postInDatabase.image = image;

    // RBAC: Only users with role of admin can edit everything

    if (userId !== postInDatabase.author.toString()) {
        throw new ErrorResponse('Not authorized', 401);
    }

    await postInDatabase.save();

    res.json(postInDatabase);
});

export const deletePost = asyncHandler(async (req, res, next) => {
    const {
        userId,
        params: { id },
    } = req;

    if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);

    const postInDatabase = await Post.findById(id);

    if (!postInDatabase)
        throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);

    if (userId !== postInDatabase.author.toString()) {
        throw new ErrorResponse('Not authorized', 401);
    }
    await Post.findByIdAndDelete(id);

    res.json({ success: `Post with id of ${id} was deleted` });
});
