import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ShareVideo from './pages/ShareVideo';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<ShareVideo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
