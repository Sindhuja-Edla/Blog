import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Post.module.css';

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      fetch(`/api/posts/${slug}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Post not found');
          }
          return res.json();
        })
        .then((data) => {
          setPost(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${styles.loadingContainer}`}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${styles.errorContainer}`}>
        <h1>Error</h1>
        <p>{error}</p>
        <Link href="/" className={styles.homeLink}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>

      <div className={`container mx-auto px-4 py-16 ${styles.postContainer}`}>
        <nav className={styles.postNav}>
          <Link href="/" className={styles.backLink}>
            ← Back to All Posts
          </Link>
        </nav>

        <article className={styles.postContent}>
          <header className={styles.postHeader}>
            <h1>{post.title}</h1>
            {post.createdAt && (
              <time dateTime={new Date(post.createdAt).toISOString()} className={styles.postDate}>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </header>

          <div 
            className={styles.postBody}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </div>
    </div>
  );
}