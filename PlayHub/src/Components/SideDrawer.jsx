import React, { Component } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GroupsIcon from "@mui/icons-material/Groups";
import CasinoIcon from "@mui/icons-material/Casino";
import ExtensionIcon from "@mui/icons-material/Extension";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PublicIcon from "@mui/icons-material/Public";
import { withRouter } from "../Helpers/withRouter";
import { useAuth } from "../context/AuthContext";

function withAuth(Component) {
  return function WrappedWithAuth(props) {
    const auth = useAuth();
    return <Component {...props} auth={auth} />;
  };
}

class SideDrawer extends Component {
  handleNavigation = (path) => {
    this.props.onClose();
    this.props.navigate(path);
  };

  handleLogout = () => {
    this.props.auth.logout();
    this.props.onClose();
    this.props.navigate("/login");
  };

  getCategoryIcon = (name) => {
    const icons = {
      MMORPG: <GroupsIcon />,
      Shooter: <MilitaryTechIcon />,
      MOBA: <SportsMmaIcon />,
      Anime: <AutoAwesomeIcon />,
      "Battle Royale": <CasinoIcon />,
      Strategy: <ExtensionIcon />,
      Fantasy: <AutoAwesomeIcon />,
      "Sci-Fi": <PublicIcon />,
      "Card Games": <CasinoIcon />,
      Racing: <DirectionsCarIcon />,
      Fighting: <SportsMmaIcon />,
      Social: <GroupsIcon />,
      Sports: <SportsSoccerIcon />,
      "All Games": <SportsEsportsIcon />,
    };
    return icons[name] || <SportsEsportsIcon />;
  };

  render() {
    const { open, onClose, selectedGenre, onCategorySelect } = this.props;
    const { user } = this.props.auth;

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

    const listStyle = {
      cursor: "pointer",
      "& .MuiListItemIcon-root": { minWidth: 40, color: "grey.700" },
    };

    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { backgroundColor: "#1E1E1E", color: "white" },
        }}
      >
        <Box
          sx={{
            width: { xs: "70vw", sm: "40vw", md: "25vw" },
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.3,
              justifyContent: "center",
              p: 2,
            }}
          >
            <Avatar
              src="https://www.citypng.com/public/uploads/preview/joystick-game-controller-black-icon-png-img-701751695032903jqv8bkyonn.png"
              alt="PlayHub Logo"
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
              PlayHub
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 1 }} />

          <List sx={listStyle}>
            <ListItem onClick={() => this.handleNavigation("/favorites")}>
              <ListItemIcon>
                <FavoriteBorderIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>

            {user ? (
              <>
                <ListItem onClick={() => this.handleNavigation("/profile")}>
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={`Hi, ${user.username}`} />
                </ListItem>

                <ListItem onClick={this.handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <ListItem onClick={() => this.handleNavigation("/login")}>
                <ListItemIcon>
                  <LoginIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mt: 1 }} />

          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              mt: 1,
              mb: 1,
              letterSpacing: 1.5,
              opacity: 0.7,
            }}
          >
            CATEGORIES
          </Typography>

          <List sx={listStyle}>
            {categories.map((cat) => (
              <ListItem
                key={cat}
                onClick={() => onCategorySelect(cat)}
                sx={{
                  borderLeft:
                    selectedGenre === cat ? "3px solid orange" : "3px solid transparent",
                  backgroundColor:
                    selectedGenre === cat ? "#2D2D2D" : "transparent",
                  "&:hover": {
                    backgroundColor: "#2A2A2A",
                  },
                }}
              >
                <ListItemIcon>{this.getCategoryIcon(cat)}</ListItemIcon>
                <ListItemText
                  primary={cat}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: selectedGenre === cat ? "bold" : "normal",
                    color: selectedGenre === cat ? "orange" : "white",
                  }}
                />
              </ListItem>
            ))}

            <ListItem
              onClick={() => onCategorySelect(null)}
              sx={{
                borderLeft:
                  selectedGenre === null
                    ? "3px solid #1976d2"
                    : "3px solid transparent",
                backgroundColor:
                  selectedGenre === null ? "#2D2D2D" : "transparent",
                "&:hover": {
                  backgroundColor: "#2A2A2A",
                },
              }}
            >
              <ListItemIcon>{this.getCategoryIcon("All Games")}</ListItemIcon>
              <ListItemText
                primary="All Games"
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: selectedGenre === null ? "bold" : "normal",
                  color: selectedGenre === null ? "#1976d2" : "white",
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    );
  }
}

export default withRouter(withAuth(SideDrawer));
