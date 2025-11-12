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
import { Box, Toolbar } from "@mui/material";
import Footer from "./Components/Footer.jsx";
import NoPageFound from "./Pages/NoPageFound.jsx";
import './App.css'
import futuristicBg from "./assets/futuristic-background-with-colorful-glowing-abstract-neon-lights.jpg";


function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <BrowserRouter>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundImage: `url(${futuristicBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: { xs: "scroll", md: "fixed" },
            position: "relative",
            display: "flex",
            flexDirection: "column",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.65)",
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, flexGrow: 1 }}>
            <NavBar
              onGenreSelect={setSelectedGenre}
              onSearch={setSearchQuery}
              selectedGenre={selectedGenre}
              searchQuery={searchQuery}
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
                    setSelectedGenre={setSelectedGenre}
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
              <Route path='*' element={<NoPageFound />} />
            </Routes>
            <Toolbar />
          </Box>

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Footer />
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
