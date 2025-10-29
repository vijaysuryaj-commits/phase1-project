import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import FavoritesPage from "./Pages/FavoritesPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import GameDetails from "./Pages/GameDetails.jsx";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./utils/RequireAuth.jsx";
import { useState } from "react";
import { Toolbar } from "@mui/material";

function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar
          onGenreSelect={setSelectedGenre}
          onSearch={setSearchQuery}
          selectedGenre={selectedGenre}
        />
        <Toolbar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                selectedGenre={selectedGenre}
                searchQuery={searchQuery}
                clearSearch={() => setSearchQuery("")}
              />
            }
          />
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
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
