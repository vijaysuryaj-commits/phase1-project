import React, { Component } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

  render() {
    const { favoriteGames, loading } = this.state;

    return (
      <Box sx={{ padding: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h5"
            sx={{
              color: "orange",
              fontWeight: "bold",
              textShadow: "0 0 10px orange",
            }}
          >
            ♠️ Your Favorite Games
          </Typography>

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
                }}
              >
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
                  <Chip
                    label={game.genre}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,165,0,0.3)",
                      color: "#fff",
                      mt: 1,
                    }}
                  />
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
