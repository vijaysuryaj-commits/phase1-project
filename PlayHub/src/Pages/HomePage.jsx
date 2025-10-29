import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import AllGamesSection from "../Components/AllGamesSection";
import { NextArrow, PrevArrow } from "../Components/Arrows";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
  Divider,
  Button,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularGames: [],
      // selectedGenre: null,
      loading: true,
      error: null,
      width: 0,
      isClient: false,
    };
  }

  componentDidMount() {
    this.setState({ isClient: true, width: window.innerWidth });
    window.addEventListener("resize", this.updateWidth);
    this.fetchPopularGames();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  updateWidth = () => {
    this.setState({ width: window.innerWidth });
  };

  async fetchPopularGames() {
    try {
      const response = await axios.get("/api/api/games?sort-by=popularity");
      this.setState({
        popularGames: response.data.slice(0, 15),
        loading: false,
      });
    } catch (error) {
      this.setState({ error: "Failed to load popular games", loading: false });
      console.error(error);
    }
  }

  // handleGenreSelect = (genre) => {
  //   this.setState({ selectedGenre: genre });
  // };

  render() {
    const { popularGames, loading, error, isClient, width } = this.state;

    if (!isClient) return null;

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
              <Skeleton
                key={i}
                variant="rectangular"
                height={180}
                sx={{ borderRadius: 2 }}
              />
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

    const slidesToShow =
      width <= 600 ? 1 : width < 900 ? 2 : width < 1200 ? 3 : 4;

    const settings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: true,
      swipe: true,
      touchMove: true,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <Box
        sx={{
          padding: { xs: 1.5, sm: 3, md: 5 },
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          🎮 Popular Games
        </Typography>

        <Box
          sx={{
            "& .slick-slide": { px: { xs: "0px", sm: "8px", md: "12px" } },
            "& .slick-list": { overflow: "hidden", mb: 0, pb: 0 },
            "& .slick-track": {
              display: "flex !important",
              alignItems: "stretch",
            },
            "& .MuiCard-root": { height: "100%" },
          }}
        >
          <Slider {...settings}>
            {popularGames.map((game) => (
              <Box key={game.id} sx={{ px: { xs: 0, sm: 1 } }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "scale(1.04)", boxShadow: 6 },
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
                    }}
                  />
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {game.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      noWrap
                    >
                      Platform: {game.platform}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Chip
                        label={game.genre}
                        size="small"
                        color="primary"
                        sx={{ mt: 1, fontSize: "0.75rem" }}
                      />
                      <ButtonGroup sx={{ backgroundColor: "lightgrey" }}>
                        <IconButton>
                          <FavoriteBorder sx={{ color: "white" }} />
                        </IconButton>
                        <Button variant="contained" sx={{ fontWeight: "bold" }}>
                          Play!
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>

        <Divider
          sx={{ my: 8, borderColor: "rgba(0,0,0,0.1)" }}
          variant="middle"
        />

        <AllGamesSection selectedGenre={this.props.selectedGenre}  />
      </Box>
    );
  }
}

export default HomePage;
