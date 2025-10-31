import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SideDrawer from "./SideDrawer";
import SearchDialog from "./SearchDialog";
import { withRouter } from "/src/Helpers/withRouter.jsx";
import { useAuth } from "../context/AuthContext";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBar: window.innerWidth >= 900,
            drawerOpen: false,
            searchOpen: false,
            anchorEl: null,
            searchTerm: "",
        };
    }

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
        // console.log("Nav search query : "+this.state.searchTerm)
    }

    handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            const searchQuery = this.state.searchTerm.trim();
            if (this.props.onSearch) {
                this.props.onSearch(searchQuery);
                // console.log("App search query : "+this.props.searchQuery)
            }
            setTimeout(() => {
                this.props.navigate(
                    searchQuery ? `/?search=${encodeURIComponent(searchQuery)}` : "/",
                    { replace: true }
                );
            }, 0);
            this.setState({ searchOpen: false })
        }
    };

    handleSearchToggle = () =>
        this.setState((prev) => ({ showSearchBar: !prev.showSearchBar }));

    handleDrawerToggle = () =>
        this.setState((prev) => ({ drawerOpen: !prev.drawerOpen }));

    handleResize = () => {
        const isDeskTop = window.innerWidth >= 900;
        if (isDeskTop && !this.state.showSearchBar)
            this.setState({ showSearchBar: true });
        else if (!isDeskTop && this.state.showSearchBar)
            this.setState({ showSearchBar: false });
    };

    handleCategorySelect = (name) => {
        if (this.props.onGenreSelect) this.props.onGenreSelect(name);
        this.setState({ drawerOpen: false });
    };

    handleSearchOpen = () => this.setState({ searchOpen: true });

    handleSearchClose = () => this.setState({ searchOpen: false });

    handleMenuOpen = (event) => this.setState({ anchorEl: event.currentTarget });

    handleMenuClose = () => this.setState({ anchorEl: null });

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({ searchTerm: this.props.searchQuery || "" });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    render() {
        const { anchorEl } = this.state;
        const { auth, selectedGenre } = this.props;

        return (
            <>
                <AppBar
                    position="fixed"
                    sx={{
                        padding: "6px 0",
                        boxShadow: "0 0 20px rgba(255, 100, 0, 0.4)",
                        borderBottom: "1px solid rgba(255, 100, 0, 0.3)",
                        background:
                            "linear-gradient(90deg, rgba(20,20,20,0.85) 0%, rgba(30,10,10,0.85) 100%)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            onClick={() => this.props.navigate("/")}
                        >
                            <IconButton onClick={this.handleDrawerToggle} sx={{ color: "orange" }}>
                                <MenuIcon />
                            </IconButton>
                            <Avatar
                                src="https://www.citypng.com/public/uploads/preview/joystick-game-controller-black-icon-png-img-701751695032903jqv8bkyonn.png"
                                alt="PlayHub Logo"
                                sx={{
                                    width: 42,
                                    height: 42,
                                    border: "2px solid rgba(255,165,0,0.5)",
                                    boxShadow: "0 0 10px rgba(255,165,0,0.5)",
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: "orange",
                                    ml: 1.2,
                                    textShadow: "0 0 10px rgba(255,140,0,0.8)",
                                }}
                            >
                                PlayHub
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                flex:
                                    this.state.showSearchBar && window.innerWidth < 900
                                        ? "1 1 100%"
                                        : 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {this.state.showSearchBar ? (
                                <Slide direction="down" in={this.state.showSearchBar}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Search games..."
                                        value={this.state.searchTerm}
                                        onChange={this.handleSearchChange}
                                        onKeyUp={this.handleSearchSubmit}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {this.state.showSearchBar &&
                                                        window.innerWidth < 900 ? (
                                                        <IconButton onClick={this.handleSearchSubmit}>
                                                            <CloseIcon sx={{ color: "orange" }} />
                                                        </IconButton>
                                                    ) : (
                                                        <SearchIcon sx={{ color: "orange" }} />
                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            width: { xs: "100%", sm: "70%", md: "50%" },
                                            borderRadius: "40px",
                                            backgroundColor: "rgba(255,255,255,0.08)",
                                            backdropFilter: "blur(4px)",
                                            "& input": { color: "#fff" },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "40px",
                                                "& fieldset": { borderColor: "rgba(255,165,0,0.4)" },
                                                "&:hover fieldset": {
                                                    borderColor: "rgba(255,165,0,0.8)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "orange",
                                                    boxShadow: "0 0 10px orange",
                                                },
                                            },
                                        }}
                                    />
                                </Slide>
                            ) : (
                                <IconButton
                                    onClick={this.handleSearchOpen}
                                    sx={{
                                        color: "orange",
                                        display: { xs: "block", md: "none" },
                                        transform: "scale(1.1)",

                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: {
                                    xs: this.state.showSearchBar ? "none" : "flex",
                                    md: "flex",
                                },
                            }}
                            flexDirection="row"
                            alignItems="center"
                        >
                            <IconButton
                                sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                                onClick={() => this.props.navigate("/favorites")}
                            >
                                <FavoriteBorderIcon
                                    sx={{ color: "orange", textShadow: "0 0 10px orange" }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "orange",
                                        ml: 1,
                                        display: { xs: "none", md: "block" },
                                        textShadow: "0 0 8px rgba(255,165,0,0.8)",
                                    }}
                                >
                                    Favorites
                                </Typography>
                            </IconButton>

                            {auth.user ? (
                                <>
                                    <IconButton onClick={this.handleMenuOpen}>
                                        <Avatar
                                            sx={{
                                                bgcolor: "rgba(255,165,0,0.2)",
                                                color: "orange",
                                                border: "1px solid rgba(255,165,0,0.5)",
                                            }}
                                        >
                                            {auth.user.username
                                                ? auth.user.username.charAt(0).toUpperCase()
                                                : "U"}
                                        </Avatar>
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={this.handleMenuClose}
                                        PaperProps={{
                                            sx: {
                                                backgroundColor: "rgba(20,20,20,0.95)",
                                                color: "white",
                                                border: "1px solid rgba(255,165,0,0.3)",
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                this.props.navigate("/profile");
                                                this.handleMenuClose();
                                            }}
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                auth.logout();
                                                this.handleMenuClose();
                                                this.props.navigate("/login");
                                            }}
                                        >
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <IconButton
                                    sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                                    onClick={() => this.props.navigate("/login")}
                                >
                                    <LoginIcon sx={{ color: "orange" }} />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "orange",
                                            ml: 1,
                                            display: { xs: "none", md: "block" },
                                            textShadow: "0 0 8px rgba(255,140,0,0.8)",
                                        }}
                                    >
                                        Login
                                    </Typography>
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>

                <SideDrawer
                    open={this.state.drawerOpen}
                    onClose={this.handleDrawerToggle}
                    selectedGenre={selectedGenre}
                    onCategorySelect={this.handleCategorySelect}
                />

                <SearchDialog
                    open={this.state.searchOpen}
                    onClose={this.handleSearchClose}
                    onSearchSubmit={this.handleSearchSubmit}
                    onChange={this.handleSearchChange}
                    value={this.state.searchTerm}
                />
            </>
        );
    }
}

function withAuth(Component) {
    return function WrappedWithAuth(props) {
        const auth = useAuth();
        return <Component {...props} auth={auth} />;
    };
}

export default withRouter(withAuth(NavBar));

