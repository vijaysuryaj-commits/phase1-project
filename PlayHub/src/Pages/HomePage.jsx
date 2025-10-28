import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Box, Typography, Card, CardMedia, CardContent, Chip, Skeleton } from "@mui/material";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularGames: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get("/api/api/games?sort-by=popularity");
      this.setState({ popularGames: response.data.slice(0, 15), loading: false });
      console.log("Fetched games:", response.data.slice(0, 15));

    } catch (error) {
      this.setState({ error: "Failed to load games", loading: false });
      console.error(error);
    }
  }

  render() {
    const { popularGames, loading, error } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 900, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
      ],
    };

    if (loading)
      return (
        <Box sx={{ padding: { xs: 2, sm: 4, md: 6 } }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
            🎮 Popular Games
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            gap={2}
          >
            {[...Array(8)].map((_, i) => (
              <Box key={i}>
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2, mb: 1 }} />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </Box>
            ))}
          </Box>
        </Box>
      );

    if (error)
      return (
        <Typography textAlign="center" color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      );

    return (
      <Box
        sx={{
          padding: { xs: 2, sm: 4, md: 6 },
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          overflowX: "hidden",
          overflowY: "visible",
          boxSizing: "border-box",
        }}
      >


        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ mb: 3 }}
        >
          🎮 Popular Games
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={3}
        >
          {popularGames.map((game) => (
            <Card
              key={game.id}
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={game.thumbnail}
                alt={game.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  noWrap
                  title={game.title}
                >
                  {game.title}
                </Typography>
                <Chip
                  label={game.genre}
                  size="small"
                  color="primary"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );

  }
}

export default HomePage;
