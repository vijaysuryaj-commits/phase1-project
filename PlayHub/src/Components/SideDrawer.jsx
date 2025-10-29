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

    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            background: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            borderRight: "1px solid rgba(255,165,0,0.3)",
            boxShadow: "0 0 20px rgba(255,140,0,0.15)",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "70vw", sm: "45vw", md: "25vw" },
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
              background:
                "linear-gradient(90deg, rgba(30,20,10,0.4) 0%, rgba(10,10,10,0.7) 100%)",
              borderBottom: "1px solid rgba(255,165,0,0.2)",
            }}
          >
            <Avatar
              src="https://www.citypng.com/public/uploads/preview/joystick-game-controller-black-icon-png-img-701751695032903jqv8bkyonn.png"
              alt="PlayHub Logo"
              sx={{
                width: 42,
                height: 42,
                border: "2px solid rgba(255,165,0,0.5)",
                boxShadow: "0 0 10px rgba(255,165,0,0.4)",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#FFA500",
                textShadow: "0 0 10px rgba(255,165,0,0.6)",
              }}
            >
              PlayHub
            </Typography>
          </Box>

          <List>
            <ListItem
              onClick={() => this.handleNavigation("/favorites")}
              sx={{
                "&:hover": { backgroundColor: "rgba(255,165,0,0.1)" },
                transition: "0.3s",
              }}
            >
              <ListItemIcon sx={{ color: "#FFA500" }}>
                <FavoriteBorderIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>

            {user ? (
              <>
                <ListItem
                  onClick={() => this.handleNavigation("/profile")}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(255,165,0,0.1)" },
                    transition: "0.3s",
                  }}
                >
                  <ListItemIcon sx={{ color: "#FFA500" }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Hi, ${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`} />
                </ListItem>

                <ListItem
                  onClick={this.handleLogout}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(255,0,0,0.1)" },
                    transition: "0.3s",
                  }}
                >
                  <ListItemIcon sx={{ color: "#FF5555" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <ListItem
                onClick={() => this.handleNavigation("/login")}
                sx={{
                  "&:hover": { backgroundColor: "rgba(255,165,0,0.1)" },
                  transition: "0.3s",
                }}
              >
                <ListItemIcon sx={{ color: "#FFA500" }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              mt: 1,
              mb: 1,
              letterSpacing: 1.5,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            CATEGORIES
          </Typography>

          <List>
            {categories.map((cat) => (
              <ListItem
                key={cat}
                onClick={() => onCategorySelect(cat)}
                sx={{
                  borderLeft:
                    selectedGenre === cat
                      ? "3px solid #FFA500"
                      : "3px solid transparent",
                  backgroundColor:
                    selectedGenre === cat
                      ? "rgba(255,165,0,0.1)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,165,0,0.1)",
                  },
                  transition: "0.3s",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedGenre === cat ? "#FFA500" : "rgba(255,255,255,0.8)",
                  }}
                >
                  {this.getCategoryIcon(cat)}
                </ListItemIcon>
                <ListItemText
                  primary={cat}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: selectedGenre === cat ? "bold" : "normal",
                    color: selectedGenre === cat ? "#FFA500" : "#fff",
                  }}
                />
              </ListItem>
            ))}

            <ListItem
              onClick={() => onCategorySelect(null)}
              sx={{
                borderLeft:
                  selectedGenre === null
                    ? "3px solid #00BFFF"
                    : "3px solid transparent",
                backgroundColor:
                  selectedGenre === null
                    ? "rgba(0,191,255,0.1)"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0,191,255,0.1)",
                },
                transition: "0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    selectedGenre === null ? "#00BFFF" : "rgba(255,255,255,0.8)",
                }}
              >
                {this.getCategoryIcon("All Games")}
              </ListItemIcon>
              <ListItemText
                primary="All Games"
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: selectedGenre === null ? "bold" : "normal",
                  color: selectedGenre === null ? "#00BFFF" : "#fff",
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
