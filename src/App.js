import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Auth'
import Pemberangkatan from './pages/Pemberangkatan'
import Permintaan from './pages/Permintaan'
import Penempatan from './pages/Penempatan'
import DataLaporan from './pages/Data Laporan'

function App() {
  return (
    <Router>
      <Routes>
        {/* login */}
        <Route path="/" element={<Login />} />
        <Route path="/jadwal-pemberangkatan" element={<Pemberangkatan />} />
        <Route path="/permintaan-pkl" element={<Permintaan />} />
        <Route path="/penempatan-pkl" element={<Penempatan />} />
        <Route path="/data-laporan" element={<DataLaporan />} />
      </Routes>
    </Router>

  )
}

export default App;