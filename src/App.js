import Nav from './components/Nav';
import { Route, Routes, } from 'react-router-dom'
import QRScanner from './components/QRScanner';

function App() {
  return (
    <div className='Main'>
      <Nav />
      <Routes>
        <Route path="/QRScanner" element={<QRScanner />} />
      </Routes>
    </div>
  );
}

export default App;
