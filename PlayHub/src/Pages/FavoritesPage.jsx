import React, { Component } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { withRouter } from "../Helpers/withRouter";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function withAuth(Component) {
  return function Wrapped(props) {
    const auth = useAuth();
    return <Component {...props} auth={auth} />;
  };
}

class FavoritesPage extends Component {
  state = {
    favoriteGames: [],
    loading: true,
    snackbarOpen: false,
    snackbarMessage: "",
  };

  async componentDidMount() {
    const { auth } = this.props;
    const user = auth?.user;

    if (!user) {
      this.setState({ favoriteGames: [], loading: false });
      return;
    }

    try {
      const response = await axios.get("/api/api/games");
      const allGames = response.data;

      const favoriteGames = allGames.filter((game) =>
        (user.favorites || []).includes(game.id)
      );

      this.setState({ favoriteGames, loading: false });
    } catch (error) {
      console.error("Error loading favorites:", error);
      this.setState({ loading: false });
    }
  }

  handleBack = () => {
    this.props.navigate("/");
  };

  handleToggleFavorite = (e, gameId) => {
    e.stopPropagation();
    const { auth } = this.props;
    const { user, toggleFavorite } = auth;

    if (!user) {
      this.props.navigate("/login");
      return;
    }

    const isFavorite = user.favorites?.includes(gameId);
    toggleFavorite(gameId);

    this.setState((prev) => ({
      favoriteGames: prev.favoriteGames.filter((g) => g.id !== gameId),
      snackbarOpen: true,
      snackbarMessage: isFavorite
        ? "Game removed from favorites 💔"
        : "Game added to favorites ❤️",
    }));

    setTimeout(() => {
      this.setState({ snackbarOpen: false });
    }, 2500);
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { favoriteGames, loading, snackbarOpen, snackbarMessage } = this.state;
    const { auth } = this.props;

    return (
      <Box sx={{ padding: 3 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mb={3}
          gap={1}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={this.handleBack}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              color: "orange",
              border: "1px solid rgba(255,165,0,0.5)",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              boxShadow: "0 0 8px rgba(255,165,0,0.3)",
              "&:hover": {
                color: "#000",
                backgroundColor: "orange",
                boxShadow: "0 0 15px orange",
              },
            }}
          >
            Back
          </Button>

          <Typography
            variant="h5"
            sx={{
              color: "orange",
              fontWeight: "bold",
              textShadow: "0 0 10px orange",
            }}
          >
            💖 Your Favorite Games
          </Typography>
        </Box>

        {loading ? (
          <Typography sx={{ color: "gray" }}>Loading favorites...</Typography>
        ) : favoriteGames.length === 0 ? (
          <Typography sx={{ color: "gray" }}>No favorite games found.</Typography>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
            gap={2}
          >
            {favoriteGames.map((game) => (
              <Card
                key={game.id}
                onClick={() => this.props.navigate(`/game/${game.id}`)}
                sx={{
                  background:
                    "linear-gradient(160deg, rgba(25,20,10,0.7), rgba(10,10,10,0.8))",
                  border: "1px solid rgba(255,165,0,0.2)",
                  borderRadius: 2,
                  boxShadow: "0 0 15px rgba(255,140,0,0.15)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 0 25px rgba(255,165,0,0.4)",
                  },
                  cursor: "pointer",
                  position: "relative",
                }}
              >

                <IconButton
                  onClick={(e) => this.handleToggleFavorite(e, game.id)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  {auth.user?.favorites?.includes(game.id) ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "orange" }} />
                  )}
                </IconButton>

                <CardMedia
                  component="img"
                  height="180"
                  image={game.thumbnail}
                  alt={game.title}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "orange", fontWeight: "bold" }}
                  >
                    {game.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {game.platform}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: '5px'
                  }}>
                    <Chip
                      label={game.genre}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255,165,0,0.3)",
                        color: "#fff",
                        mt: 1,
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "orange",
                        color: "#000",
                        "&:hover": {
                          backgroundColor: "#ffb84d",
                          boxShadow: "0 0 10px orange",
                        },
                      }}
                      href={game.game_url}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                    >
                      PLAY!
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    );
  }
}

export default withRouter(withAuth(FavoritesPage));
