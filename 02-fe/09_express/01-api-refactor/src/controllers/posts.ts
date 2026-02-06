import { type RequestHandler } from 'express';
import { Post } from '#models';
import { isValidObjectId } from 'mongoose';

type PostType = {
	title: string;
	content: string;
};

const getAllPosts: RequestHandler = async (req, res) => {
	const posts = await Post.find();
	res.json(posts);
};

const createPost: RequestHandler<{}, {}, PostType> = async (req, res) => {
	if (!req.body)
		return res.status(400).json({ error: 'Title and Content are required' });

	const { title, content } = req.body;

	if (!title || !content)
		return res.status(400).json({ error: 'Title and Content are required' });

	const post = await Post.create<PostType>({ title, content });

	res.status(201).json(post);
};

const getPostById: RequestHandler = async (req, res) => {
	const postId = req.params.id;

	if (!isValidObjectId(postId))
		return res.status(400).json({ error: 'Invalid Post ID' });

	const post = await Post.findById(postId);

	if (!post) return res.status(404).json({ error: 'Post Not Found' });

	res.json(post);
};

const updatePost: RequestHandler<{ id: string }, {}, PostType> = async (
	req,
	res
) => {
	const postId = req.params.id;

	if (!isValidObjectId(postId))
		return res.status(400).json({ error: 'Invalid Post ID' });

	if (!req.body)
		return res
			.status(400)
			.json({ error: 'You have to update at least one property' });

	const { title, content } = req.body;

	if (!title || !content)
		return res.status(400).json({ error: 'Title and Content is required' });

	const post = await Post.findByIdAndUpdate(
		postId,
		{ title, content },
		{ new: true }
	);

	if (!post) return res.status(404).json({ error: 'Post Not Found' });

	res.json(post);
};

const deletePost: RequestHandler<{ id: string }> = async (req, res) => {
	const postId = req.params.id;

	if (!isValidObjectId(postId))
		return res.status(400).json({ error: 'Invalid Post ID' });

	const post = await Post.findByIdAndDelete(postId);

	if (!post) return res.status(404).json({ error: 'Post Not Found' });

	res.json({ message: 'Post Deleted' });
};

export { getAllPosts, createPost, getPostById, updatePost, deletePost };
