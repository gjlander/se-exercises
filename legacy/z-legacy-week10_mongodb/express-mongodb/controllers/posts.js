import { ObjectId } from 'mongodb';

import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import client from '../db/index.js';

const databaseName = 'blog';
const collectionName = 'posts';

export const getPosts = asyncHandler(async (req, res) => {
    const posts = await client
        .db(databaseName)
        .collection(collectionName)
        .aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    user: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                    },
                },
            },
        ])
        .toArray();
    res.status(200).json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
    const {
        body: { title, content, userId },
    } = req;

    if (!title || !content || !userId)
        throw new ErrorResponse('Please provide all required fields', 400);

    const result = await client
        .db(databaseName)
        .collection(collectionName)
        .insertOne({
            title,
            content,
            userId: ObjectId.createFromHexString(userId),
        });

    const post = await client
        .db(databaseName)
        .collection(collectionName)
        .findOne({ _id: result.insertedId });

    res.status(201).json(post);
});

export const getPostById = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;

    const objectID = ObjectId.createFromHexString(id);

    const [post] = await client
        .db(databaseName)
        .collection(collectionName)
        .aggregate([
            {
                $match: { _id: objectID },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    user: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                    },
                },
            },
        ])
        .toArray();

    if (!post) throw new ErrorResponse('Post not found', 404);

    res.status(200).json(post);
});

export const updatePost = asyncHandler(async (req, res) => {
    const {
        body: { title, content, userId },
        params: { id },
    } = req;
    if (!title || !content || !userId)
        throw new ErrorResponse('Please provide all required fields', 400);
    const objectID = ObjectId.createFromHexString(id);
    const updatedPost = await client
        .db(databaseName)
        .collection(collectionName)
        .findOneAndUpdate(
            { _id: objectID },
            {
                $set: {
                    title,
                    content,
                    userId: ObjectId.createFromHexString(userId),
                },
            },
            { returnDocument: 'after' }
        );
    if (!updatedPost) throw new ErrorResponse('Post not found', 404);
    res.status(200).json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;
    const objectID = ObjectId.createFromHexString(id);
    const deletedUser = await client
        .db(databaseName)
        .collection(collectionName)
        .findOneAndDelete({ _id: objectID });
    if (!deletedUser) throw new ErrorResponse('Post not found', 404);
    res.status(200).json({ message: 'Post deleted successfully' });
});
