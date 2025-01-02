// src/components/SemesterSelection.jsx
import { Link } from 'react-router-dom';

const SemesterSelection = () => {
  return (
    <div className="semester-selection">
      <h2>Select an Option</h2>
      <div className="options">
        <Link to="/notes" className="btn btn-primary">Read Notes</Link>
        <Link to="/upload" className="btn btn-secondary">Upload Notes</Link>
      </div>
    </div>
  );
};

export default SemesterSelection;
