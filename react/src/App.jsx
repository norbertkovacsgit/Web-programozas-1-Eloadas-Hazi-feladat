
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import KPOApp from './kpo/App.jsx';
import Tetris from './tetris/Tetris.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/kpo" element={<KPOApp />} />
        <Route path="/tetris" element={<Tetris />} />
        <Route path="*" element={<KPOApp />} />
      </Routes>
    </div>
  );
}

export default App;
