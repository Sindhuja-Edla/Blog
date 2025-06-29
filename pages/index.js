import Link from "next/link";
import styles from './admin/Admin.module.css';
export default function Home() {
  return (
   <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${styles.adminDashboard}`} style={{ overflow: "hidden" }}>
      <div className="container mx-auto" style={{ padding: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Management System</h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, manage, and publish your blog posts with ease
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2"> Admin Dashboard</h2>
            <p className="text-gray-600 mb-4">Manage your blog posts, create new content, and edit existing articles.</p>
            <Link href="/admin">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Go to Admin Panel
              </button>
            </Link>
          </div>

          
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2"> Public Blog</h2>
            <p className="text-gray-600 mb-4">View published blog posts as your readers would see them.</p>
            <Link href="/posts">
              <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition">
                View Blog Posts
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
