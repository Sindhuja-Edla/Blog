import connectDB from '../../../utils/db';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    try {
      const newPost = await Post.create({ title, content, slug });
      return res.status(201).json(newPost);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}