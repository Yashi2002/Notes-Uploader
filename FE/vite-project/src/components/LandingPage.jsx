import { Link } from 'react-router-dom';
import "./Header.css";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Notes Uploader</h1>
      <p>Ease uploading and managing your notes.</p>
      <nav>
        <Link to="/upload">Upload Notes</Link>
        <Link to="/notes">View Notes</Link>
      </nav>
    </div>
  );
};

export default LandingPage;
