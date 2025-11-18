import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
// import FavoritesPage from "./Pages/FavoritesPage";
// import LoginPage from "./Pages/LoginPage";
// import SignupPage from "./Pages/SignUpPage.jsx";
// import ProfilePage from "./Pages/ProfilePage.jsx";
// import GameDetails from "./Pages/GameDetails.jsx";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./utils/RequireAuth.jsx";
import { Suspense, useState } from "react";
import { Box, Toolbar } from "@mui/material";
// import Footer from "./Components/Footer.jsx";
// import NoPageFound from "./Pages/NoPageFound.jsx";
import './App.css'
import { lazy } from "react";
import futuristicBg from "./assets/futuristic-background-with-colorful-glowing-abstract-neon-lights.jpg";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorBoundary.jsx";
// const HomePage = lazy(() => import("./Pages/HomePage"))
const LoginPage = lazy(() => import("./Pages/LoginPage"))
const SignupPage = lazy(() => import("./Pages/SignUpPage.jsx"))
const FavoritesPage = lazy(() => import("./Pages/FavoritesPage"))
const ProfilePage = lazy(() => import("./Pages/ProfilePage.jsx"))
const GameDetails = lazy(() => import("./Pages/GameDetails.jsx"))
const NoPageFound = lazy(() => import("./Pages/NoPageFound.jsx"))
const Footer = lazy(() => import("./Components/Footer.jsx"))

function App() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{}}>
          <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
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
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
