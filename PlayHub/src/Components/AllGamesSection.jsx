import React, { Component } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Button,
  Menu,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { withRouter } from "../Helpers/withRouter";

class AllGamesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      loading: true,
      error: null,
      currentPage: 1,
      gamesPerPage: 12,
      sortBy: "release-date",
      platform: "",
      selectedCategory: props.selectedGenre || "",
      userOverriddenCategory: false,
      anchorEl: null,
    };
  }

  async componentDidMount() {
    await this.fetchGames();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { selectedGenre } = this.props;

    if (
      selectedGenre !== prevProps.selectedGenre &&
      !this.state.userOverriddenCategory
    ) {
      this.setState({ selectedCategory: selectedGenre || "" });
    }

    if (
      prevState.sortBy !== this.state.sortBy ||
      prevState.platform !== this.state.platform ||
      prevState.selectedCategory !== this.state.selectedCategory ||
      prevProps.selectedGenre !== selectedGenre
    ) {
      await this.fetchGames();
    }
  }

  async fetchGames() {
    this.setState({ loading: true, error: null });
    try {
      let url = "/api/api/games";
      const params = [];

      const { selectedGenre } = this.props;
      const { sortBy, platform, selectedCategory, userOverriddenCategory } =
        this.state;

      const finalCategory =
        userOverriddenCategory || !selectedGenre
          ? selectedCategory
          : selectedGenre;

      if (finalCategory)
        params.push(
          `category=${encodeURIComponent(
            finalCategory.toLowerCase().replace(/\s+/g, "-")
          )}`
        );
      if (platform) params.push(`platform=${platform}`);
      if (sortBy) params.push(`sort-by=${sortBy}`);

      if (params.length > 0) url += `?${params.join("&")}`;

      const response = await axios.get(url);
      this.setState({
        games: response.data,
        loading: false,
        currentPage: 1,
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: "Failed to load games", loading: false });
    }
  }

  handleFilterMenuOpen = (event) =>
    this.setState({ anchorEl: event.currentTarget });
  handleFilterMenuClose = () => this.setState({ anchorEl: null });

  handleSortChange = (event) =>
    this.setState({ sortBy: event.target.value, currentPage: 1 });

  handlePlatformChange = (event) =>
    this.setState({ platform: event.target.value, currentPage: 1 });

  handleCategoryChange = (event) =>
    this.setState({
      selectedCategory: event.target.value,
      currentPage: 1,
      userOverriddenCategory: true,
    });

  handlePageChange = (event, value) => {
    this.setState({ currentPage: value });
    const el = document.getElementById("all-games-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  handleRemoveFilter = (key) => {
    if (key === "category") {
      this.setState(
        {
          selectedCategory: "",
          userOverriddenCategory: false,
        },
        async () => {
          if (this.props.onCategorySelect) this.props.onCategorySelect(null);
          else if (this.props.onClearGenre) this.props.onClearGenre();
          await this.fetchGames();
        }
      );
    }

    if (key === "platform")
      this.setState({ platform: "" }, () => this.fetchGames());

    if (key === "sortBy")
      this.setState({ sortBy: "release-date" }, () => this.fetchGames());
  };

  render() {
    const {
      games,
      loading,
      error,
      gamesPerPage,
      currentPage,
      sortBy,
      platform,
      selectedCategory,
      anchorEl,
    } = this.state;

    const { navigate, selectedGenre } = this.props;

    const categories = [
      "MMORPG",
      "Shooter",
      "MOBA",
      "Anime",
      "Battle Royale",
      "Strategy",
      "Fantasy",
      "Sci-Fi",
      "Card",
      "Racing",
      "Fighting",
      "Social",
      "Sports",
    ];

    const indexOfLast = currentPage * gamesPerPage;
    const indexOfFirst = indexOfLast - gamesPerPage;
    const currentGames = games.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(games.length / gamesPerPage);
    const open = Boolean(anchorEl);

    const activeFilters = [];
    const categoryLabel = selectedCategory || selectedGenre;
    if (categoryLabel)
      activeFilters.push({ label: categoryLabel, key: "category" });
    if (platform)
      activeFilters.push({ label: platform.toUpperCase(), key: "platform" });
    if (sortBy && sortBy !== "release-date") {
      const sortMap = {
        popularity: "Popularity",
        alphabetical: "Alphabetical",
      };
      activeFilters.push({
        label: sortMap[sortBy] || "Release Date",
        key: "sortBy",
      });
    }

    return (
      <Box
        id="all-games-section"
        sx={{
          mt: { xs: 3, sm: 3, md: 4 },
          px: { xs: 2, sm: 4, md: 6 },
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "orange",
            textShadow: "0 0 10px rgba(255,165,0,0.8)",
          }}
        >
          🎯 {selectedCategory || selectedGenre || "All Games"}
        </Typography>

        {activeFilters.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              mb: 3,
            }}
          >
            {activeFilters.map((filter) => (
              <Chip
                key={filter.key}
                label={filter.label}
                onDelete={() => this.handleRemoveFilter(filter.key)}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(255,165,0,0.25)",
                  border: "1px solid rgba(255,165,0,0.5)",
                  "& .MuiChip-deleteIcon": {
                    color: "orange",
                    "&:hover": { color: "#ffcc80" },
                  },
                }}
              />
            ))}

            {activeFilters.length > 1 && (
              <Button
                size="small"
                onClick={() =>
                  this.setState(
                    {
                      selectedCategory: "",
                      platform: "",
                      sortBy: "release-date",
                      userOverriddenCategory: false,
                    },
                    () => {
                      if (this.props.onCategorySelect)
                        this.props.onCategorySelect(null);
                      this.fetchGames();
                    }
                  )
                }
                sx={{
                  ml: 1,
                  color: "orange",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    textShadow: "0 0 8px orange",
                  },
                }}
              >
                Clear All ✖
              </Button>
            )}
          </Box>
        )}

        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={this.handleFilterMenuOpen}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "orange",
              color: "#000",
              "&:hover": {
                backgroundColor: "#ffb84d",
                boxShadow: "0 0 15px orange",
              },
            }}
          >
            Filters
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleFilterMenuClose}
            PaperProps={{
              sx: {
                minWidth: 280,
                borderRadius: 2,
                p: 2,
                background:
                  "linear-gradient(145deg, rgba(30,30,30,0.95), rgba(50,20,0,0.9))",
                color: "white",
                border: "1px solid rgba(255,165,0,0.3)",
                boxShadow: "0 0 20px rgba(255,165,0,0.3)",
                backdropFilter: "blur(8px)",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 1, textAlign: "center", color: "orange" }}
            >
              Filter Options
            </Typography>
            <Divider sx={{ mb: 2, borderColor: "rgba(255,165,0,0.3)" }} />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "orange" }}>Category</InputLabel>
              <Select
                value={selectedCategory || selectedGenre || ""}
                label="Category"
                onChange={this.handleCategoryChange}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,165,0,0.4)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "orange",
                  },
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "orange" }}>Platform</InputLabel>
              <Select
                value={platform}
                label="Platform"
                onChange={this.handlePlatformChange}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,165,0,0.4)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "orange",
                  },
                }}
              >
                <MenuItem value="">All Platforms</MenuItem>
                <MenuItem value="pc">PC</MenuItem>
                <MenuItem value="browser">Browser</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: "orange" }}>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={this.handleSortChange}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,165,0,0.4)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "orange",
                  },
                }}
              >
                <MenuItem value="release-date">Release Date</MenuItem>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="alphabetical">Alphabetical</MenuItem>
              </Select>
            </FormControl>
          </Menu>
        </Box>

        {loading ? (
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
                height={220}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              }}
              gap={2}
            >
              {currentGames.map((game) => (
                <Card
                  key={game.id}
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
                      height: 180,
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      noWrap
                      sx={{ color: "orange" }}
                    >
                      {game.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                      noWrap
                    >
                      {game.platform}
                    </Typography>
                    <Chip
                      label={game.genre}
                      size="small"
                      sx={{
                        mt: 1,
                        color: "#fff",
                        backgroundColor: "rgba(255,165,0,0.3)",
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={this.handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "white",
                      "&.Mui-selected": {
                        backgroundColor: "orange",
                        color: "#000",
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    );
  }
}

export default withRouter(AllGamesSection);
