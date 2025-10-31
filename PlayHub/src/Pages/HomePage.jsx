import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import AllGamesSection from "../Components/AllGamesSection";
import { NextArrow, PrevArrow } from "../Components/Arrows";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateCard from "../Components/CreateCard";
import {
  Box,
  Typography,
  Skeleton,
  Divider,
  Button,
} from "@mui/material";
import { withRouter } from "../Helpers/withRouter";
import { useAuth } from "../context/AuthContext";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const auth = useAuth();
    return <Component {...props} auth={auth} />;
  };
}


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
    if (prevProps.selectedGenre !== this.props.selectedGenre && this.props.selectedGenre) {
      const el = document.getElementById("all-games-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
    const { selectedGenre,setSelectedGenre, searchQuery, clearSearch, navigate } = this.props;
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
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "orange", textShadow: "0 0 8px orange" }}
            mb={3}
          >
            🎮 Loading Popular Games...
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
                sx={{
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
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
        <Box
          sx={{
            p: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mb: 4,
              flexDirection:{xs:'column', sm:'column',md:'row'},
              
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                clearSearch();
                this.props.navigate('/', { replace: true })
              }
              }
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: "orange",
                border: "1px solid rgba(255,165,0,0.5)",
                borderRadius: 2,
                px: 2,
                py: 0.5,
                "&:hover": {
                  color: "#000",
                  backgroundColor: "orange",
                  boxShadow: "0 0 10px orange",
                },
              }}
            >
              Back
            </Button>

            <Typography
              variant={width<=600 ? "subtitle1" : "h5"}
              fontWeight="bold"
              sx={{
                flex: 1,
                textAlign: "center",
                color: "orange",
                textShadow: "0 0 8px orange",
                mt:{xs:1,sm:1,md:0}
              }}
            >
              🔍 Search Results for “{searchQuery}”
            </Typography>

          </Box>

          {searching ? (
            <Typography sx={{ color: "white" }}>Searching...</Typography>
          ) : searchResults.length === 0 ? (
            <Typography sx={{ color: "gray" }}>No matches found.</Typography>
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
                <CreateCard key={game.id} navigate={navigate} game={game} />
              ))}
            </Box>
          )}
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
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: 2,
            color: "orange",
            textShadow: "0 0 8px rgba(255,165,0,0.8)",
          }}
        >
          🎮 Popular Games
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: 3,
            color: "#ffb84d",
            textShadow: "0 0 12px rgba(255,165,0,0.8)",
          }}
        >
          A Free Games Discovery Application!
        </Typography>

        <Box
          sx={{
            "& .slick-slide": { px: { xs: "0px", sm: "8px", md: "12px" } },
            "& .slick-list": { overflow: "hidden", mb: 0, pb: 0 },
            "& .slick-track": {
              display: "flex !important",
              alignItems: "stretch",
            },
          }}
        >
          <Slider {...settings}>
            {popularGames.map((game) => (
              <Box key={game.id} sx={{ px: { xs: 0, sm: 1 } }}>

                <CreateCard navigate={navigate} game={game} />
              </Box>
            ))}
          </Slider>
        </Box>

        <Divider
          sx={{
            my: 8,
            borderColor: "rgba(255,165,0,0.3)",
            boxShadow: "0 0 10px rgba(255,165,0,0.3)",
          }}
          variant="middle"
        />

        <AllGamesSection selectedGenre={selectedGenre} onCategorySelect={
          (category) => {
            this.props.setSelectedGenre(category)
          }
        } />
      </Box>
    );
  }
}

export default withAuth(withRouter(HomePage));


