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
    };

    handleSearchSubmit = (e) => {
        if (e.key === "Enter" && this.state.searchTerm.trim() !== "") {
            const searchQuery = this.state.searchTerm.trim();
            if (this.props.onSearch)
                this.props.onSearch(searchQuery);
            this.props.navigate(`/?search=${encodeURIComponent(searchQuery)}`);
            this.setState({ searchOpen: false });
        }
    };

    handleSearchToggle = () => {
        this.setState((prev) => ({ showSearchBar: !prev.showSearchBar }));
    };

    handleDrawerToggle = () => {
        this.setState((prev) => ({ drawerOpen: !prev.drawerOpen }));
    };

    handleResize = () => {
        const isDeskTop = window.innerWidth >= 900;
        if (isDeskTop && !this.state.showSearchBar) {
            this.setState({ showSearchBar: true });
        } else if (!isDeskTop && this.state.showSearchBar) {
            this.setState({ showSearchBar: false });
        }
    };

    handleCategorySelect = (name) => {
        let isMobile = window.innerWidth < 900;
        if (this.props.onGenreSelect) {
            this.props.onGenreSelect(name);
        }
        this.setState({
            drawerOpen: isMobile ? false : true,
        });
    };

    handleSearchOpen = () => this.setState({ searchOpen: true });
    handleSearchClose = () => this.setState({ searchOpen: false });

    handleMenuOpen = (event) => this.setState({ anchorEl: event.currentTarget });
    handleMenuClose = () => this.setState({ anchorEl: null });

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
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
                        padding: "5px",
                        boxShadow: 4,
                        borderRadius: "0 0 8px 8px",
                        backgroundColor: "lightgray",
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
                            <IconButton onClick={this.handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                            <Avatar
                                src="https://www.citypng.com/public/uploads/preview/joystick-game-controller-black-icon-png-img-701751695032903jqv8bkyonn.png"
                                alt="PlayHub Logo"
                                sx={{ width: 40, height: 40 }}
                            />
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: "white", ml: 1 }}
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
                                        onKeyDown={this.handleSearchSubmit}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {this.state.showSearchBar &&
                                                        window.innerWidth < 900 ? (
                                                        <IconButton onClick={this.handleSearchToggle}>
                                                            <CloseIcon
                                                                sx={{ color: "gray", fontSize: "1.3rem" }}
                                                            />
                                                        </IconButton>
                                                    ) : (
                                                        <SearchIcon
                                                            sx={{ color: "gray", fontSize: "1.35rem" }}
                                                        />
                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            width: { xs: "100%", sm: "70%", md: "50%" },
                                            borderRadius: "40px",
                                            backgroundColor: "white",
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "40px",
                                                "& fieldset": { borderColor: "transparent" },
                                            },
                                        }}
                                    />
                                </Slide>
                            ) : (
                                <IconButton
                                    onClick={this.handleSearchOpen}
                                    sx={{
                                        color: "white",
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
                                <FavoriteBorderIcon sx={{ color: "white" }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "white",
                                        ml: 1,
                                        display: { xs: "none", md: "block" },
                                    }}
                                >
                                    Favorites
                                </Typography>
                            </IconButton>

                            {auth.user ? (
                                <>
                                    <IconButton onClick={this.handleMenuOpen}>
                                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                                            {auth.user.username
                                                ? auth.user.username.charAt(0).toUpperCase()
                                                : "U"}
                                        </Avatar>
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={this.handleMenuClose}
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
                                    <LoginIcon sx={{ color: "white" }} />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                            ml: 1,
                                            display: { xs: "none", md: "block" },
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
