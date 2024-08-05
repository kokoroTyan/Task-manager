import './css/App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Register } from './pages/Register';
import { Authorise } from './pages/Authorise';
import { MainPage } from './pages/MainPage'
import { Profile } from './pages/Profile'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/*" element={<Authorise />} />
          <Route exact path="/log-in/*" element={<Authorise />} />
          <Route exact path="/register/*" element={<Register />} />
          <Route exact path="/main/*" element={<MainPage />} />
          <Route exact path="/profile/*" element={<Profile />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
