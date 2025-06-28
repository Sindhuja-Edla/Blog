import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RichTextEditor from '../../../components/RichTextEditor';
import styles from '../Admin.module.css';

export default function EditPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (slug) {
      fetch(`/api/posts/${slug}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
        });
    }
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      router.push('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
      setIsUpdating(false);
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
            <h1>Edit Post</h1>
            <p>Update your existing blog post</p>
          </div>

          <form onSubmit={handleUpdate} className={styles.postForm}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className={styles.titleInput}
              required
            />
            
            <div className={styles.editorContainer}>
              <RichTextEditor value={content} onChange={setContent} />
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
                disabled={isUpdating}
                className={`${styles.actionButton} ${styles.submitButton}`}
              >
                {isUpdating ? (
                  <span className={styles.deletingText}>
                    <span className={styles.spinnerSmall}></span>
                    Updating...
                  </span>
                ) : (
                  'Update Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}