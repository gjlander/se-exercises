import Post from '../models/Post.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const {
            body: { firstName, lastName, email },
        } = req;
        if (!firstName || !lastName || !email)
            throw new ErrorResponse(
                'firstName, lastName, and email are required'
            );
        const found = await User.findOne({ where: { email } });
        if (found)
            throw new ErrorResponse('User with that email already exists');
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;
        const user = await User.findByPk(id, { include: Post });
        if (!user) throw new ErrorResponse('User not found', 404);

        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const {
            body: { firstName, lastName, email },
            params: { id },
        } = req;
        if (!firstName || !lastName || !email)
            throw new ErrorResponse(
                'firstName, lastName, and email are required'
            );
        const user = await User.findByPk(id);
        if (!user) throw new ErrorResponse('User not found');
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const {
            params: { id },
        } = req;
        const user = await User.findByPk(id);
        if (!user) throw new ErrorResponse('User not found');
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        next(error);
    }
};
