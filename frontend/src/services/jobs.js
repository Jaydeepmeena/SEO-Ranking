import axios from 'axios';

// Get API URL from environment variable or use defaults
const getApiUrl = () => {
  // If VITE_API_URL is explicitly set (even if empty string), use it
  if (import.meta.env.VITE_API_URL !== undefined) {
    return import.meta.env.VITE_API_URL || '/api';
  }
  // Development: use localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }
  // Production fallback: use relative path (won't work without backend on same domain)
  return '/api';
};

const API_URL = getApiUrl();

// Log API URL in development for debugging
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
}

export const uploadFile = async (file, clientName) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientName', clientName || '');

    const response = await axios.post(
      `${API_URL}/jobs/upload`,
      formData,
      {
        'Content-Type': 'multipart/form-data',
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'File upload failed');
  }
};

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs/status`);
    return response.data.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch jobs');
  }
};

export const downloadFile = async (jobId, fileName) => {
  try {
    const response = await axios.get(
      `${API_URL}/jobs/download/${jobId}`,
      {
        responseType: 'blob',
      }
    );

    // Get the filename from Content-Disposition header or use provided fileName
    let downloadFileName = fileName;
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+?)"?$/);
      if (fileNameMatch && fileNameMatch[1]) {
        downloadFileName = fileNameMatch[1];
      }
    }

    // Create blob with correct MIME type from response
    const blob = new Blob([response.data], {
      type: response.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', downloadFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(error.response?.data?.error || 'File download failed');
  }
};

