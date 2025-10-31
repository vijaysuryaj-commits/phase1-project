import React, { Component } from "react";
import { Avatar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

function Wrapper(Component) {
  return function WrappedComponent(props) {
    const auth = useAuth();
    const navigate = useNavigate();
    return <Component {...props} auth={auth} navigate={navigate} />;
  };
}

class ProfilePage extends Component {
  handleLogout = () => {
    this.props.auth.logout();
    this.props.navigate("/login");
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, mt: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => this.props.navigate(-1)}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            color: "orange",
            border: "1px solid rgba(255,165,0,0.5)",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            mb: 4,
            "&:hover": {
              color: "#000",
              backgroundColor: "orange",
              boxShadow: "0 0 10px orange",
            },
          }}
        >
          Back
        </Button>

        <Box
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            backgroundColor: "rgba(10,10,10,0.85)",
            borderRadius: 2,
            boxShadow: "0 0 15px rgba(255, 165, 0, 0.4)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: { sm: 3, xs: 0 },
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 120,
                height: 120,
                fontSize: "3rem",
                border: "2px solid rgba(255, 165, 0, 0.5)",
                boxShadow: "0 0 10px rgba(255,165,0,0.5)",
              }}
            >
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>
          </Box>

          <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "orange",
                textShadow: "0 0 8px rgba(255, 165, 0, 0.8)",
                mb: 2,
              }}
            >
              {user?.username || "Unknown User"}
            </Typography>

            <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
              Welcome back,{" "}
              {user?.username
                ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
                : "Guest"}{" "}
              👋
            </Typography>

            <Button
              variant="contained"
              color="error"
              onClick={this.handleLogout}
              sx={{
                mt: 3,
                backgroundColor: "rgba(255, 0, 0, 0.75)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ff4d4d",
                  boxShadow: "0 0 15px rgba(255, 0, 0, 0.4)",
                },
              }}
            >
              LOGOUT
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Wrapper(ProfilePage);
