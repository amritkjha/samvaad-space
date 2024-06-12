import logo from './logo.svg';
import './App.css';
import ChatPage from './pages/ChatPage';
import AccessPage from './pages/AccessPage';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="bg-[url('/images/main_background.jpg')] px-[7%] py-[3%] h-screen">
      <div className="rounded bg-lime-950/[0.93] text-white h-full">
        <Router>
          <Routes>
            <Route exact path='/' Component={ChatPage} />
            <Route exact path='/get-started' Component={AccessPage} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
