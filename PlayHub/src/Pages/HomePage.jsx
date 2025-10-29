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
import { withRouter } from "../Helpers/withRouter";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularGames: [],
      searchResults: [],
      loading: true,
      searching: false,
      error: null,
      width: 0,
      isClient: false,
    };
  }

  componentDidMount() {
    this.setState({ isClient: true, width: window.innerWidth });
    window.addEventListener("resize", this.updateWidth);
    this.fetchPopularGames();

    if (this.props.searchQuery) {
      this.fetchSearchResults(this.props.searchQuery);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      if (this.props.searchQuery)
        this.fetchSearchResults(this.props.searchQuery);
      else this.setState({ searchResults: [] });
    }
  }

  updateWidth = () => this.setState({ width: window.innerWidth });

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

  async fetchSearchResults(query) {
    this.setState({ searching: true, error: null });
    try {
      const res = await axios.get("/api/api/games?sort-by=alphabetical");
      const filtered = res.data.filter((g) =>
        g.title.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({ searchResults: filtered, searching: false });
    } catch (error) {
      this.setState({ error: "Search failed", searching: false });
    }
  }

  render() {
    const { selectedGenre, searchQuery, clearSearch, navigate } = this.props;
    const {
      popularGames,
      searchResults,
      loading,
      searching,
      error,
      isClient,
      width,
    } = this.state;

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

    if (searchQuery)
      return (
        <Box sx={{ p: { xs: 2, sm: 4, md: 6 }, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            🔍 Search Results for “{searchQuery}”
          </Typography>
          {searching ? (
            <Typography>Searching...</Typography>
          ) : searchResults.length === 0 ? (
            <Typography>No matches found.</Typography>
          ) : (
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              }}
              gap={2}
            >
              {searchResults.map((game) => (
                <Card
                  key={game.id}
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                  }}
                  onClick={() => navigate(`/game/${game.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={game.thumbnail}
                    alt={game.title}
                    sx={{ height: 180 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {game.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {game.platform}
                    </Typography>
                    <Chip label={game.genre} size="small" color="primary" />
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
          <Button
            onClick={clearSearch}
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
          >
            ← Back to Home
          </Button>
        </Box>
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
                  onClick={() => navigate(`/game/${game.id}`)}
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
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

        <AllGamesSection selectedGenre={selectedGenre} />
      </Box>
    );
  }
}

export default withRouter(HomePage);
