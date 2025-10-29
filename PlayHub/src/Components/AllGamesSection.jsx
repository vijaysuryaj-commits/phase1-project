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
            anchorEl: null,
        };
    }

    async componentDidMount() {
        await this.fetchGames();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.selectedGenre !== this.props.selectedGenre ||
            prevState.sortBy !== this.state.sortBy ||
            prevState.platform !== this.state.platform ||
            prevState.selectedCategory !== this.state.selectedCategory
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
            const { sortBy, platform, selectedCategory } = this.state;

            const finalCategory = selectedGenre || selectedCategory;

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

    handleFilterMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleFilterMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    handleSortChange = (event) => {
        this.setState({ sortBy: event.target.value, currentPage: 1 });
    };

    handlePlatformChange = (event) => {
        this.setState({ platform: event.target.value, currentPage: 1 });
    };

    handleCategoryChange = (event) => {
        this.setState({ selectedCategory: event.target.value, currentPage: 1 });
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
            selectedCategory,
            anchorEl,
        } = this.state;

        const { navigate } = this.props;

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

        return (
            <Box
                id="all-games-section"
                sx={{
                    mt: { xs: 3, sm: 3, md: 4 },
                    px: { xs: 2, sm: 4, md: 6 },
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    🎯 {this.props.selectedGenre || "All Games"}
                </Typography>


                <Box display="flex" justifyContent="center" mb={4}>
                    <Button
                        variant="contained"
                        startIcon={<FilterListIcon />}
                        onClick={this.handleFilterMenuOpen}
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
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
                                backgroundColor: "#fff",
                                boxShadow: "0px 4px 18px rgba(0,0,0,0.15)",
                            },
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mb: 1, textAlign: "center" }}
                        >
                            Filter Options
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={selectedCategory}
                                label="Category"
                                onChange={this.handleCategoryChange}
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
                            <InputLabel>Platform</InputLabel>
                            <Select
                                value={platform}
                                label="Platform"
                                onChange={this.handlePlatformChange}
                            >
                                <MenuItem value="">All Platforms</MenuItem>
                                <MenuItem value="pc">PC</MenuItem>
                                <MenuItem value="browser">Browser</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort By"
                                onChange={this.handleSortChange}
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
                                sx={{ borderRadius: 2 }}
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
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                        "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
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
                                        }}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                            {game.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {game.platform}
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

                        {totalPages > 1 && (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={this.handlePageChange}
                                    color="primary"
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
