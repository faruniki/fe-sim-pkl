import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Auth'
import Pemberangkatan from './pages/Pemberangkatan'

function App() {
  return (
    <Router>
      <Routes>
        {/* login */}
        <Route path="/" element={<Login />} />
        <Route path="/jadwal-pemberangkatan" element={<Pemberangkatan />} />
      </Routes>
    </Router>

  )
}

export default App;
