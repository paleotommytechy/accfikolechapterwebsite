import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const res = await axios.post('https://accf-doc-backend.onrender.com/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`✅ Uploaded successfully! File ID: ${res.data.file_id}`);
    } catch (err: any) {
      setMessage(`❌ Upload failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">📁 Upload to Google Drive</h2>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="d-grid">
          <button
            onClick={handleUpload}
            className="btn btn-primary"
            disabled={!file || loading}
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
        {message && (
          <div className="alert alert-info mt-4" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;