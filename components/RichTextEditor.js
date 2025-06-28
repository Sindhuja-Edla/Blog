import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function RichTextEditor({ value, onChange }) {
  return (
    <div className="editor-wrapper">
      <ReactQuill value={value} onChange={onChange} />
    </div>
  );
}
