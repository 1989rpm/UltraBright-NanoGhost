import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Research from './pages/Research';
import Members from './pages/Members';
import Patents from './pages/Patents';
import CoverArts from './pages/CoverArts';
import Contact from './pages/Contact';
import Position from './pages/Position';
import Journals from './pages/publications/Journals';
import Books from './pages/publications/Books';
//import News from './pages/others/News';
//import LabTour from './pages/others/LabTour';
import Gallery from './pages/Gallery';
//import Conferences from './pages/others/Conferences';
//import GroupFun from './pages/others/GroupFun';
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className = "flex flex-col min-h-screen">
        <Header />
        <main className ="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/members" element={<Members />} />
            <Route path="/publications/journals" element={<Journals />} />
            <Route path="/publications/books" element={<Books />} />
            <Route path="/patents" element={<Patents />} />
            <Route path="/cover-arts" element={<CoverArts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
{/*------------------------Others Closed Routes------------------------------
            <Route path="/others/news" element={<News />} />
            <Route path="/others/lab-tour" element={<LabTour />} />
            <Route path="/others/gallery" element={<Gallery />} />
            <Route path="/others/conferences" element={<Conferences />} />
            <Route path="/others/group-fun" element={<GroupFun />} />
*/}
            <Route path="/position" element={<Position />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;