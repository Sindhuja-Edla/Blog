import { useState } from 'react';
import Link from 'next/link';
import RichTextEditor from '../../components/RichTextEditor';
import { useRouter } from 'next/router';
import styles from './admin.module.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      router.push('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
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

          <form onSubmit={handleSubmit} className={styles.postForm}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className={styles.titleInput}
              required
            />
            
            <div className={styles.editorContainer} style={{ minHeight: 'auto', height: 'auto' }}>
              <RichTextEditor value={content} onChange={setContent} style={{ minHeight: 'auto', height: 'auto' }} />
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