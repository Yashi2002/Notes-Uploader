import { useState } from 'react';
import axios from 'axios';
import './UploadNote.css';

const UploadNote = () => {
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value); // Get the selected semester
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !semester) {
      setMessage('Please select a file and a semester.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester', semester);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="upload-note">
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Semester:</label>
          <select value={semester} onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadNote;
