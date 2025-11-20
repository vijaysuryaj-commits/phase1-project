import React, { Component } from "react";
import axios from "axios";
import {
  Box,
  Typography,
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
import CreateCard from "./CreateCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import { withRouter } from "../Helpers/withRouter";
import { useAuth } from "../context/AuthContext";

function withAuth(Component) {
  return function AuthWrapped(props) {
    const auth = useAuth();
    return <Component {...props} auth={auth} />;
  };
}

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
      anchorEl: null,

      tempSortBy: "release-date",
      tempPlatform: "",
      tempCategory: props.selectedGenre || "",
    };
  }

  async componentDidMount() {
    await this.fetchGames();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedGenre !== this.props.selectedGenre) {
      await this.fetchGames();
      this.setState({
        tempCategory: this.props.selectedGenre || "",
      });
    }
  }

  async fetchGames() {
    this.setState({ loading: true, error: null });
    try {
      let url = "/api/games";
      const params = [];

      const { sortBy, platform } = this.state;
      const { selectedGenre } = this.props;

      if (selectedGenre)
        params.push(
          `category=${encodeURIComponent(
            selectedGenre.toLowerCase().replace(/\s+/g, "-")
          )}`
        );
      if (platform) params.push(`platform=${platform}`);
      if (sortBy) params.push(`sort-by=${sortBy}`);

      if (params.length > 0) url += `?${params.join("&")}`;

      const response = await axios.get(url, { timeout: 10000 });
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

  handleFilterMenuOpen = (event) => this.setState({ anchorEl: event.currentTarget });
  handleFilterMenuClose = () => this.setState({ anchorEl: null });

  handleTempChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleApplyFilters = async () => {
    const { tempSortBy, tempPlatform, tempCategory, sortBy, platform } = this.state;
    const { selectedGenre, setSelectedGenre } = this.props;

    const changed =
      tempSortBy !== sortBy ||
      tempPlatform !== platform ||
      tempCategory !== selectedGenre;

    if (changed) {
      await this.setState({
        sortBy: tempSortBy,
        platform: tempPlatform,
        anchorEl: null,
      });
      setSelectedGenre(tempCategory || null);
      await this.fetchGames();
    } else {
      this.setState({ anchorEl: null });
    }
  };

  handleRemoveFilter = async (key) => {
    const { setSelectedGenre } = this.props;

    let { sortBy, platform } = this.state;
    let category = this.props.selectedGenre;

    if (key === "category") {
      category = null;
      setSelectedGenre(null);
      this.setState({ tempCategory: "" });
    }
    if (key === "platform") {
      platform = "";
      this.setState({ platform: "", tempPlatform: "" });
    }
    if (key === "sortBy") {
      sortBy = "release-date";
      this.setState({ sortBy: "release-date", tempSortBy: "release-date" });
    }

    await this.setState({ sortBy, platform });
    const anyActive =
      category || (platform && platform !== "") || (sortBy && sortBy !== "release-date");

    if (anyActive) {
      await this.fetchGames();
    } else {
      await this.setState({
        sortBy: "release-date",
        platform: "",
        tempCategory: "",
        tempPlatform: "",
        tempSortBy: "release-date",
      });
      await this.fetchGames();
    }
  };

  handleClearAll = async () => {
    const { setSelectedGenre } = this.props;

    this.setState({
      platform: "",
      sortBy: "release-date",
      tempCategory: "",
      tempPlatform: "",
      tempSortBy: "release-date",
    });
    setSelectedGenre(null);
    await this.fetchGames();
  };

  handlePageChange = (event, value) => {
    this.setState({ currentPage: value });
    const el = document.getElementById("all-games-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
      anchorEl,
      tempSortBy,
      tempPlatform,
      tempCategory,
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
    if (selectedGenre)
      activeFilters.push({ label: selectedGenre, key: "category" });
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
          🎯 {selectedGenre || "All Games"}
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
                onClick={this.handleClearAll}
                sx={{
                  ml: 1,
                  color: "orange",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { textShadow: "0 0 8px orange" },
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
                width: { xs: 275, sm: 300, md: 350 },
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
                value={tempCategory}
                label="Category"
                onChange={(e) =>
                  this.handleTempChange("tempCategory", e.target.value)
                }
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
                value={tempPlatform}
                label="Platform"
                onChange={(e) =>
                  this.handleTempChange("tempPlatform", e.target.value)
                }
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

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: "orange" }}>Sort By</InputLabel>
              <Select
                value={tempSortBy}
                label="Sort By"
                onChange={(e) =>
                  this.handleTempChange("tempSortBy", e.target.value)
                }
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

            <Button
              variant="contained"
              fullWidth
              onClick={this.handleApplyFilters}
              sx={{
                mt: 1,
                backgroundColor: "orange",
                color: "#000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ffb84d",
                  boxShadow: "0 0 15px orange",
                },
              }}
            >
              Apply Filters
            </Button>
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
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={2}
            >
              {currentGames.map((game) => (
                <CreateCard key={game.id} navigate={navigate} game={game} />
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
                        "&:hover": {
                          backgroundColor: "orange",
                          color: "white",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "orange",
                        color: "black",
                      },
                    }
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

export default withRouter(withAuth(AllGamesSection));









export const fetchGames = (filters = {}) => async (dispatch) => {
  dispatch({ type: types.FETCH_GAMES_REQUEST });
  try {
    let url = "/api/games";
    const params = [];

    const platform = normalizePlatform(filters.platform);
    const sortBy = normalizeSort(filters.sortBy, platform);

    if (filters.selectedGenre) {
      params.push(`category=${encodeURIComponent(filters.selectedGenre.toLowerCase().replace(/\s+/g, "-"))}`);
    }
    if (platform) params.push(`platform=${platform}`);
    if (sortBy) params.push(`sort-by=${sortBy}`);

    if (params.length)
      url += `?${params.join("&")}`;

    const resp = await axios.get(url);
    dispatch({
      type: types.FETCH_GAMES_SUCCESS,
      payload: Array.isArray(resp.data) ? resp.data : []
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_GAMES_FAILURE,
      payload: err.message || "Failed to fetch games"
    });
  }
};