import React, { Component } from "react";
import { Paper, Stack, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function withAuthAndNavigate(Component) {
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
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          margin: "80px auto",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 80,
              height: 80,
              fontSize: "2rem",
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            {user?.username || "Unknown User"}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Welcome back, {user?.username || "Guest"} 👋
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={this.handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    );
  }
}

export default withAuthAndNavigate(ProfilePage);
