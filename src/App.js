import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Jucatori from './Jucatori';
import Echipe from './Echipe';
import Antrenori from './Antrenori';
import Meciuri from './Meciuri';
import Arene from './Arene';
import Simple from './Simple';
import Complexe from './Complexe';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Echipe />} />
        <Route path="/jucatori" element={<Jucatori />} />
        <Route path="/antrenori" element={<Antrenori />} />
        <Route path="/meciuri" element={<Meciuri />} />
        <Route path="/arene" element={<Arene />} />
        <Route path="/simple" element={<Simple />} />
        <Route path="/complexe" element={<Complexe />}/>
      </Routes>
    </Router>
  );
}

export default App;