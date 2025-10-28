import NavBar from "./Components/NavBar";
import React from 'react'
import './App.css'
// import { Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <NavBar />
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
      </Routes> 
    </Router>
  )
}

export default App