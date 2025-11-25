import React, { Component } from "react";
import CreateCard from "./CreateCard";
import { withRouter } from "../Helpers/withRouter";
import { connect } from "react-redux";
import { fetchFilteredGames, fetchGames } from "../redux/games/gameActions";
import { setSelectedGenre, setPlatform, setSortBy, } from "../redux/filters/filterActions";
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
import FilterListIcon from "@mui/icons-material/FilterList";

class AllGamesSection extends Component {
  state = {
    currentPage: 1,
    gamesPerPage: 12,
    // loading: true,
    anchorEl: null,
    tempSortBy: "release-date",
    tempPlatform: "",
    tempCategory: "",
  }

  handlePageChange = (event, value) => {
    this.setState({ currentPage: value });
    const el = document.getElementById("all-games-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  componentDidMount() {
    console.log('*********** All games did mount')
    const { selectedGenre, platform, sortBy } = this.props;

    this.setState({
      tempSortBy: "release-date",
      tempPlatform: platform,
      tempCategory: selectedGenre,
    })
    // fetchFilteredGames({ selectedGenre, platform, sortBy });
    // this.setState({
    //   // loading: false,
    //   // currentPage: 1,
    // });
    // fetchFilteredGames({
    //   selectedGenre: selectedGenre,
    //   platform: platform,
    //   sortBy: sortBy,
    // });
  }

  async componentDidUpdate(prevProps) {
    console.log('***********All games did update')
    const { selectedGenre, platform, sortBy, fetchFilteredGames } = this.props;

    if (
      prevProps.selectedGenre !== selectedGenre ||
      prevProps.platform !== platform ||
      prevProps.sortBy !== sortBy
    ) {
      console.log('**********All games did update inside if')
      try {
        // fetchFilteredGames({ selectedGenre, platform, sortBy });
        console.log("*********All games component did update api call");
        // fetchFilteredGames({
        //   selectedGenre: selectedGenre,
        //   platform: platform,
        //   sortBy: sortBy,
        // });
        this.setState({
          // currentPage: 1,
          tempCategory: selectedGenre || "",
          tempPlatform: platform || "",
          tempSortBy: sortBy || "release-date"
          // loading: false
        });
        await fetchFilteredGames({ selectedGenre, platform: this.state.tempPlatform, sortBy: this.state.tempSortBy });
      } catch (error) {
        // this.setState({ loading: false });

      }
    }
  }
  handleFilterMenuOpen = (event) => this.setState({ anchorEl: event.currentTarget });
  handleFilterMenuClose = () => this.setState({ anchorEl: null });

  handleTempChange = (key, value) => {
    this.setState({ [key]: value });
  };

  setReduxStore = async (tempPlatform, tempCategory, tempSortBy) => {
    console.log('-----',)
    const { setPlatform, setSelectedGenre, setSortBy } = this.props
    await setPlatform(tempPlatform)
    await setSelectedGenre(tempCategory)
    await setSortBy(tempSortBy)
  }

  handleApplyFilters = async () => {
    const { tempSortBy, tempPlatform, tempCategory } = this.state;
    const {
      selectedGenre,
      setSelectedGenre,
      fetchFilteredGames,
      setSortBy,
      platform,
      setPlatform,
      sortBy } = this.props;

    const changed =
      tempSortBy !== sortBy ||
      tempPlatform !== platform ||
      tempCategory !== selectedGenre;

    if (changed) {
      // this.setState({
      //   sortBy: tempSortBy,
      //   platform: tempPlatform,
      //   anchorEl: null,
      // });

      this.setState({
        anchorEl: null,
        // tempCategory: tempCategory,
        // tempPlatform: tempPlatform,
        // tempSortBy: tempSortBy
      });

      await this.setReduxStore(tempPlatform, tempCategory, tempSortBy)

      // await setPlatform(tempPlatform)
      // await setSelectedGenre(tempCategory)
      // await setSortBy(tempSortBy)

      console.log("redux -" + selectedGenre + " tempCategory -" + tempCategory)
      console.log("redux -" + platform + " tempPlatform -" + tempPlatform)
      console.log("redux -" + sortBy + " tempSortBy -" + tempSortBy)
      console.log("All games - handleApplyFilters")

      // setTimeout(fetch = async () => {
      // await fetchFilteredGames({ selectedGenre: tempCategory, platform: tempPlatform, sortBy: tempSortBy });
      // }, 0)
    } else {
      this.setState({ anchorEl: null });
    }
  };


  handleRemoveFilter = async (key) => {
    // const { tempSortBy, tempPlatform, tempCategory } = this.state;
    const { selectedGenre,
      setSelectedGenre,
      fetchFilteredGames,
      setSortBy,
      platform,
      setPlatform,
      sortBy } = this.props;

    // let category = selectedGenre;
    let tempCat = this.state.tempCategory;
    let tempPlat = this.state.tempPlatform;
    let tempSort = this.state.tempSortBy;

    if (key === "category") {
      // category = null;
      setSelectedGenre("");
      this.setState({ tempCategory: "" });
      tempCat = ""
      console.log()
    }
    if (key === "platform") {
      setPlatform("")
      this.setState({ tempPlatform: "" });
      tempPlat = ""
    }
    if (key === "sortBy") {
      setSortBy("release-date");
      this.setState({ tempSortBy: "release-date" });
      tempSort = ''
    }
    console.log("redux -" + selectedGenre + " tempCategory -" + this.state.tempCategory)
    console.log("redux -" + platform + " tempPlatform -" + this.state.tempPlatform)
    console.log("redux -" + sortBy + " tempSortBy -" + this.state.tempSortBy)

    const anyActive =
      (selectedGenre && selectedGenre !== "") ||
      (platform && platform !== "") ||
      (sortBy && sortBy !== "release-date");

    if (anyActive) {
      console.log("All games - handleRemoveFilter any active true")
      await fetchFilteredGames({ selectedGenre: tempCat, platform: tempPlat, sortBy: tempSort });
    }
    else {
      // setSelectedGenre("")
      // setPlatform("")
      // setSortBy("release-date")
      // this.setState({
      //   tempCategory: "",
      //   tempPlatform: "",
      //   tempSortBy: "release-date",
      // });
      // fetchFilteredGames({ selectedGenre, platform, sortBy });
      console.log("All games - handleRemoveFilter any active false")

      fetchFilteredGames();
    }
  };

  handleClearAll = async () => {
    const { setSelectedGenre, setPlatform, setSortBy, fetchGames } = this.props;

    fetchGames();

    setSelectedGenre("");
    setPlatform("")
    setSortBy("release-date")
    this.setState({
      tempCategory: "",
      tempPlatform: "",
      tempSortBy: "release-date",
    });
    console.log("All games - handleClearAll")

  };

  render() {
    const {
      // games,
      filteredGames,
      loading,
      error,
      selectedGenre,
      sortBy,
      platform,
      navigate } = this.props

    const {
      gamesPerPage,
      currentPage,
      anchorEl,
      tempCategory,
      tempPlatform,
      tempSortBy } = this.state

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
    {
      console.log("redux $$$$$$$$$$$$$$$$$$ -" + selectedGenre + " tempCategory -" + tempCategory)
      console.log("redux $$$$$$$$$$$$$$$$$$$ -" + platform + " tempPlatform -" + tempPlatform)
      console.log("redux $$$$$$$$$$$$$$$$$$ -" + sortBy + " tempSortBy -" + tempSortBy)
      console.log("All games $$$$$$$$$$$$$$$$$$$$ - handleApplyFilters")
    }

    const indexOfLast = currentPage * gamesPerPage;
    const indexOfFirst = indexOfLast - gamesPerPage;
    const currentGames = filteredGames.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
    const open = Boolean(anchorEl);
    const activeFilters = [];

    if (selectedGenre)
      activeFilters.push({ label: selectedGenre, key: "category" })
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
                value={tempCategory || selectedGenre}
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
                value={tempPlatform || platform}

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
              <Skeleton data-testid='skeleton'
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

    // if (loading) {
    //   return (
    //     <Box sx={{ padding: { xs: 2, sm: 4 } }} id="all-games-section">
    //       <Typography
    //         variant="h5"
    //         fontWeight="bold"
    //         textAlign="center"
    //         sx={{ color: "orange", textShadow: "0 0 8px orange" }}
    //         mb={3}
    //       >
    //         Loading Games...
    //       </Typography>
    //       <Box
    //         display="grid"
    //         gridTemplateColumns={{
    //           xs: "1fr",
    //           sm: "repeat(2, 1fr)",
    //           md: "repeat(4, 1fr)",
    //         }}
    //         gap={2}
    //       >
    //         {[...Array(8)].map((_, i) => (
    //           <Skeleton
    //             key={i}
    //             variant="rectangular"
    //             height={180}
    //             sx={{
    //               borderRadius: 2,
    //               backgroundColor: "rgba(255,255,255,0.08)",
    //             }}
    //           />
    //         ))}
    //       </Box>
    //     </Box>
    //   );
    // }

    // if (error) {
    //   return (
    //     <Typography textAlign="center" color="error" sx={{ mt: 4 }}>
    //       {error}
    //     </Typography>
    //   );
    // }

    // return (
    //   <Box sx={{ padding: { xs: 2, sm: 4, md: 6 } }} id="all-games-section">
    //     <Typography
    //       variant="h5"
    //       fontWeight="bold"
    //       textAlign="center"
    //       sx={{ mb: 4, color: "orange", textShadow: "0 0 8px rgba(255,165,0,0.8)" }}
    //     >
    //       All Games
    //     </Typography>

    //     <Divider sx={{ mb: 4, borderColor: "rgba(255,165,0,0.3)" }} />

    //     <Box
    //       display="grid"
    //       gridTemplateColumns={{
    //         xs: "1fr",
    //         sm: "repeat(2, 1fr)",
    //         md: "repeat(4, 1fr)",
    //       }}
    //       gap={2}
    //     >
    //       {games.map((game) => (
    //         <CreateCard key={game.id} navigate={navigate} game={game} />
    //       ))}
    //     </Box>
    //     {
    //       totalPages > 1 && (
    //         <Box display="flex" justifyContent="center" mt={4}>
    //           <Pagination
    //             count={totalPages}
    //             page={currentPage}
    //             onChange={this.handlePageChange}
    //             sx={{
    //               "& .MuiPaginationItem-root": {
    //                 color: "white",
    //                 "&.Mui-selected": {
    //                   backgroundColor: "orange",
    //                   color: "#000",
    //                   "&:hover": {
    //                     backgroundColor: "orange",
    //                     color: "white",
    //                   },
    //                 },
    //                 "&:hover": {
    //                   backgroundColor: "orange",
    //                   color: "black",
    //                 },
    //               }
    //             }}
    //           />
    //         </Box>
    //       )
    //     }
    //   </Box>
    // );
  }
}

const mapStateToProps = (state) => ({
  games: state.gamesState.games,
  filteredGames: state.gamesState.filteredGames,
  loading: state.gamesState.loading,
  error: state.gamesState.error,
  selectedGenre: state.filtersState.selectedGenre,
  platform: state.filtersState.platform,
  sortBy: state.filtersState.sortBy,
});

const mapDispatchToProps = {
  fetchGames,
  fetchFilteredGames,
  setSelectedGenre,
  setPlatform,
  setSortBy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AllGamesSection));
