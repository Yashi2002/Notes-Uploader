import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UploadNote from './components/UploadNote';
import NotesList from './components/NotesList';
import NotFound from './components/NotFound';
// import './App.css'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadNote />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
