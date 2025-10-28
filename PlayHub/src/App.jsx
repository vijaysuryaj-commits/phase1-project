import NavBar from "./Components/NavBar";
import React from 'react'
import './App.css'
import {  Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FavoritesPage from './Pages/FavoritesPage'
import LoginPage from "./Pages/LoginPage";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App