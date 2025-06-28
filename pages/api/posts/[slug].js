import connectDB from '../../../utils/db';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await connectDB();
  const { slug } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findOne({ slug });
    return res.status(200).json(post);
  } 
  
  else if (req.method === 'PUT') {
    const { title, content } = req.body;
    const updatedSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const post = await Post.findOneAndUpdate(
      { slug },
      { title, content, slug: updatedSlug },
      { new: true }
    );

    return res.status(200).json(post);
  }

  else if (req.method === 'DELETE') {
    await Post.findOneAndDelete({ slug });
    return res.status(204).end();
  }

  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
