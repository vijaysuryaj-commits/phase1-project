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
    state = { game: null, loading: true, error: null };

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

    render() {
        const { game, loading, error } = this.state;

        if (loading)
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <CircularProgress />
                </Box>
            );

        if (error)
            return (
                <Typography color="error" textAlign="center" mt={4}>
                    {error}
                </Typography>
            );

        if (!game) return null;

        return (
            <Box sx={{ p: { xs: 2, sm: 4, md: 6 }, maxWidth: "900px", mx: "auto" }}>

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={this.handleGoBack}
                    sx={{
                        mb: 2,
                        fontWeight: "bold",
                        textTransform: "none",
                    }}
                >
                    Back
                </Button>

                <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                    <CardMedia
                        component="img"
                        image={game.thumbnail}
                        alt={game.title}
                        sx={{ height: { xs: 220, md: 400 }, objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" mb={2}>
                            {game.title}
                        </Typography>
                        <Box mb={2}>
                            <Chip label={game.genre} color="primary" sx={{ mr: 1 }} />
                            <Chip label={game.platform} color="secondary" />
                        </Box>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            {game.description || "No description available."}
                        </Typography>
                        {game.game_url && (
                            <Button
                                href={game.game_url}
                                target="_blank"
                                variant="contained"
                                color="primary"
                                sx={{ fontWeight: "bold" }}
                            >
                                🎮 Play Now
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Box>
        );
    }
}

export default withRouter(GameDetails);
