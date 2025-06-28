import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>All Blog Posts</title>
        <meta name="description" content="Browse all our blog posts" />
      </Head>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
          <Link href="/">
            <button className="text-blue-600 hover:text-blue-800 transition">
              ← Back to Home
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center max-w-md mx-auto">
            <p className="text-gray-600 mb-6">No posts available yet.</p>
           
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map(post => (
              <div 
                key={post._id} 
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <Link href={`/posts/${post.slug}`}>
                  <div className="cursor-pointer h-full flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto pt-4">
                      <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition flex items-center justify-center">
                        Read Post 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}