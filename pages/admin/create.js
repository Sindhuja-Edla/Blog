import { useState } from 'react';
import Link from 'next/link';
import RichTextEditor from '../../components/RichTextEditor';
import { useRouter } from 'next/router';
import styles from './Admin.module.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title.trim() || !content.trim()) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);
    setError(''); // Clear any previous errors
    
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      router.push('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.adminDashboard}>
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
        <div className={styles.createContainer}>
          <div className={styles.pageHeader}>
            <h1>Create New Post</h1>
            <p>Write and publish your new blog post</p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.postForm}>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(''); // Clear error when typing
              }}
              placeholder="Post Title"
              className={styles.titleInput}
            />
            
            <div className={styles.editorContainer}>
              <RichTextEditor 
                value={content} 
                onChange={(value) => {
                  setContent(value);
                  setError(''); // Clear error when editing
                }} 
              />
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className={`${styles.actionButton} ${styles.cancelButton}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.actionButton} ${styles.submitButton}`}
              >
                {isSubmitting ? (
                  <span className={styles.deletingText}>
                    <span className={styles.spinnerSmall}></span>
                    Publishing...
                  </span>
                ) : (
                  'Publish Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}