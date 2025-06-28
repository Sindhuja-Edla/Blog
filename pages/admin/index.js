import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState({});

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  const deletePost = async slug => {
    setDeleteStatus(prev => ({ ...prev, [slug]: 'deleting' }));
    try {
      await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p.slug !== slug));
      setDeleteStatus(prev => ({ ...prev, [slug]: 'success' }));
    } catch (error) {
      setDeleteStatus(prev => ({ ...prev, [slug]: 'error' }));
    } finally {
      setTimeout(() => {
        setDeleteStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[slug];
          return newStatus;
        });
      }, 3000);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${styles.adminDashboard}`}>
      <nav className={styles.adminNav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <div className={styles.navLinks}>
              <Link href="/" className={styles.navBrand}>
                Blog Admin
              </Link>
              <Link href="/admin" className={styles.navLink}>
                Dashboard
              </Link>
            </div>
            <div className={styles.navActions}>
              <Link href="/admin/create" className={styles.createButton}>
                Create Blog Post
              </Link>
            </div>
          </div>
        </div>
      </nav>

     
      <main className={styles.adminMain}>
       
        <div className={styles.pageHeader}>
          <h1>Admin Dashboard</h1>
          <p>Manage your blog posts</p>
        </div>

       
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading posts...</p>
          </div>
        ) : (
         
          posts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No posts found. Create your first post!</p>
              <Link href="/admin/create" className={styles.createButton}>
                Create New Post
              </Link>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {posts.map(post => (
                <div key={post.slug} className={styles.postCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3>{post.title}</h3>
                      {deleteStatus[post.slug] === 'error' && (
                        <span className={styles.errorMessage}>Delete failed</span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    )}
                    <div className={styles.cardActions}>
                      <Link
                        href={`/posts/${post.slug}`}
                        className={`${styles.actionButton} ${styles.viewButton}`}
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/edit/${post.slug}`}
                        className={`${styles.actionButton} ${styles.editButton}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePost(post.slug)}
                        disabled={deleteStatus[post.slug] === 'deleting'}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                      >
                        {deleteStatus[post.slug] === 'deleting' ? (
                          <span className={styles.deletingText}>
                            <span className={styles.spinnerSmall}></span>
                            Deleting...
                          </span>
                        ) : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}