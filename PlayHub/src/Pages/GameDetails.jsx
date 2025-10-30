import React, { Component } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { withRouter } from "../Helpers/withRouter";

class GameDetails extends Component {
    state = { game: null, loading: true, error: null, showFullDescription: false };

    async componentDidMount() {
        const { id } = this.props.params;
        try {
            const res = await axios.get(`/api/api/game?id=${id}`);
            this.setState({ game: res.data, loading: false });
        } catch {
            this.setState({ error: "Failed to load game details", loading: false });
        }
    }

    handleGoBack = () => {
        this.props.navigate(-1);
    };

    toggleDescription = () => {
        this.setState((prev) => ({ showFullDescription: !prev.showFullDescription }));
    };

    render() {
        const { game, loading, error, showFullDescription } = this.state;

        if (loading)
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <CircularProgress color="primary" />
                </Box>
            );

        if (error)
            return (
                <Typography color="error" textAlign="center" mt={4}>
                    {error}
                </Typography>
            );

        if (!game) return null;

        const MAX_LENGTH = 350;
        const isLong = game.description && game.description.length > MAX_LENGTH;
        const displayText = showFullDescription
            ? game.description
            : game.description?.substring(0, MAX_LENGTH) + (isLong ? "..." : "");

        return (
            <Box
                sx={{
                    p: { xs: 2, sm: 4, md: 6 },
                    maxWidth: "1100px",
                    mx: "auto",
                    color: "white",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={this.handleGoBack}
                    sx={{
                        mb: 3,
                        fontWeight: "bold",
                        fontSize: { sm: "16px", md: "24px" },
                        textTransform: "none",
                        color: "orange",
                        "&:hover": { color: "#ffb74d" },
                    }}
                >
                    Back
                </Button>

                <Card
                    sx={{
                        borderRadius: 4,
                        boxShadow: "0 0 20px rgba(255, 165, 0, 0.3)",
                        background: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(10px)",
                        color: "white",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        overflow: "hidden",
                        p: 2,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={game.thumbnail}
                        alt={game.title}
                        sx={{
                            width: { xs: "100%", md: "45%" },
                            height: { xs: 220, md: "100%" },
                            objectFit: "cover",
                            borderRight: { md: "2px solid rgba(255,165,0,0.3)" },
                        }}
                    />

                    <CardContent
                        sx={{
                            flex: 1,
                            p: { xs: 2, sm: 3, md: 4 },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            mb={2}
                            sx={{
                                color: "orange",
                                textShadow: "0 0 10px rgba(255,165,0,0.6)",
                            }}
                        >
                            {game.title}
                        </Typography>

                        <Box mb={2}>
                            <Chip
                                label={game.genre}
                                sx={{
                                    mr: 1,
                                    backgroundColor: "rgba(33,150,243,0.8)",
                                    color: "white",
                                }}
                            />
                            <Chip
                                label={game.platform}
                                sx={{
                                    backgroundColor: "rgba(156,39,176,0.8)",
                                    color: "white",
                                }}
                            />
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgba(255,255,255,0.85)",
                                mb: 1,
                                lineHeight: 1.6,
                            }}
                        >
                            {displayText || "No description available."}
                        </Typography>

                        {isLong && (
                            <Button
                                onClick={this.toggleDescription}
                                sx={{
                                    color: "orange",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    alignSelf: "flex-start",
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                {showFullDescription ? "Show Less ▲" : "Show More ▼"}
                            </Button>
                        )}

                        {game.game_url && (
                            <Button
                                href={game.game_url}
                                target="_blank"
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    background: "linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)",
                                    fontWeight: "bold",
                                    color: "#000",
                                    px: 3,
                                    py: 1,
                                    borderRadius: "8px",
                                    width: "fit-content",
                                    "&:hover": {
                                        background: "linear-gradient(90deg, #ffa726 0%, #ffd54f 100%)",
                                        boxShadow: "0 0 15px rgba(255,165,0,0.7)",
                                    },
                                }}
                            >
                                🎮 PLAY NOW
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Box>
        );
    }
}

export default withRouter(GameDetails);
