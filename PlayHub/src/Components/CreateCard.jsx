import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Box,
  Chip,
  Alert,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { withRouter } from "../Helpers/withRouter";
import { useAuth } from "../context/AuthContext";

function withAuth(Component) {
  return function Wrapped(props) {
    const auth = useAuth();
    return <Component {...props} auth={auth} />;
  };
}

class CreateCard extends Component {

  handleToggleFavorite = (e) => {
    e.stopPropagation();
    const { auth, game, navigate, onFavoriteToggle } = this.props;
    const { user, toggleFavorite } = auth;

    if (!user) {
      navigate("/login");
      return;
    }

    const isFavorite = user.favorites?.includes(game.id);
    toggleFavorite(game.id);

    if (onFavoriteToggle) onFavoriteToggle(game.id, !isFavorite);

    this.setState({
      snackbarOpen: true,
      snackbarMessage: isFavorite
        ? "Removed from favorites 💔"
        : "Added to favorites ❤️",
    });

    setTimeout(() => this.setState({ snackbarOpen: false }), 2500);
  };

  render() {
    const { navigate, game, auth } = this.props;
    const isFavorite = auth.user?.favorites?.includes(game.id);

    return (
      <>
        <Card
          onClick={() => navigate(`/game/${game.id}`)}
          sx={{
            borderRadius: 3,
            background:
              "linear-gradient(160deg, rgba(25,20,10,0.7), rgba(10,10,10,0.8))",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,165,0,0.2)",
            boxShadow: "0 0 15px rgba(255,140,0,0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.04)",
              boxShadow: "0 0 25px rgba(255,165,0,0.4)",
            },
          }}
        >
          <CardMedia
            component="img"
            image={game.thumbnail}
            alt={game.title}
            sx={{
              width: "100%",
              height: { xs: 180, sm: 200, md: 220 },
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
          />
          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              noWrap
              sx={{ color: "orange" }}
            >
              {game.title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "rgba(255,255,255,0.7)" }}
              noWrap
            >
              Platform: {game.platform}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={"5px"}
            >
              <Chip
                label={game.genre}
                size="small"
                sx={{
                  mt: 1,
                  color: "#fff",
                  backgroundColor: "rgba(255,165,0,0.3)",
                }}
              />
              <ButtonGroup
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <IconButton onClick={this.handleToggleFavorite}>
                  {isFavorite ? (
                    <Favorite
                      sx={{
                        color: "red",
                        transition: "color 0.3s ease",
                      }}
                    />
                  ) : (
                    <FavoriteBorder
                      sx={{
                        color: "orange",
                        transition: "color 0.3s ease",
                      }}
                    />
                  )}
                </IconButton>

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
              </ButtonGroup>
            </Box>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default withRouter(withAuth(CreateCard));
