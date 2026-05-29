import { ObjectId } from 'mongodb';

import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import client from '../db/index.js';

const databaseName = 'blog';
const collectionName = 'users';

export const getUsers = asyncHandler(async (req, res) => {
    const users = await client
        .db(databaseName)
        .collection(collectionName)
        .find()
        .toArray();
    res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
    const {
        body: { firstName, lastName, email },
    } = req;
    // Check if all required fields are provided
    if (!firstName || !lastName || !email)
        throw new ErrorResponse('Please provide all required fields', 400);
    // Check if user already exists
    const found = await client
        .db(databaseName)
        .collection(collectionName)
        .findOne({ email });
    if (found) throw new ErrorResponse('User already exists', 400);
    // Create user
    const result = await client
        .db(databaseName)
        .collection(collectionName)
        .insertOne({ firstName, lastName, email });

    const user = await client
        .db(databaseName)
        .collection(collectionName)
        .findOne({ _id: result.insertedId });

    res.status(201).json(user);
});

export const getUserById = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;

    const objectID = ObjectId.createFromHexString(id);

    const user = await client
        .db(databaseName)
        .collection(collectionName)
        .findOne({ _id: objectID });

    if (!user) throw new ErrorResponse('User not found', 404);

    res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
    const {
        body: { firstName, lastName, email },
        params: { id },
    } = req;

    if (!firstName || !lastName || !email)
        throw new ErrorResponse('Please provide all required fields', 400);

    const objectID = ObjectId.createFromHexString(id);

    const updatedUser = await client
        .db(databaseName)
        .collection(collectionName)
        .findOneAndUpdate(
            { _id: objectID },
            { $set: { firstName, lastName, email } },
            { returnDocument: 'after' }
        );

    if (!updatedUser) throw new ErrorResponse('User not found', 404);

    res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;

    const objectID = ObjectId.createFromHexString(id);

    const deletedUser = await client
        .db(databaseName)
        .collection(collectionName)
        .findOneAndDelete({ _id: objectID });

    if (!deletedUser) throw new ErrorResponse('User not found', 404);

    res.status(200).json(deletedUser);
});
