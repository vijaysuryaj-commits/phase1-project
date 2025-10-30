import React, { Component } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Chip } from "@mui/material";
import { withRouter } from "../Helpers/withRouter";
import axios
 from "axios";
class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteGames: [], 
      allGames: [], 
    };
  }

  async componentDidMount() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    try {
      const response = await axios.get("/api/api/games");
      const allGames = response.data;

      const favoriteGames = allGames.filter((game) =>
        favorites.includes(game.id)
      );

      this.setState({ favoriteGames });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { favoriteGames } = this.state;

    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ color: "orange", fontWeight: "bold" }}>
          💖 Your Favorite Games
        </Typography>

        {favoriteGames.length === 0 ? (
          <Typography>No favorite games found.</Typography>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={2}
          >
            {favoriteGames.map((game) => (
              <Card key={game.id} sx={{ backgroundColor: "black" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={game.thumbnail}
                  alt={game.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" sx={{ color: "orange" }}>
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

export default withRouter(FavoritesPage);
