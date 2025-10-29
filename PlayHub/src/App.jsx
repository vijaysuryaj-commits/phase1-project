import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import FavoritesPage from "./Pages/FavoritesPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage.jsx";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./utils/RequireAuth.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import { useState } from "react";
import { Toolbar } from "@mui/material";
function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar
          onGenreSelect={setSelectedGenre}
          selectedGenre={selectedGenre}
        />
        <Toolbar/>
        <Routes>
          <Route path="/" element={<HomePage selectedGenre={selectedGenre} />} />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App