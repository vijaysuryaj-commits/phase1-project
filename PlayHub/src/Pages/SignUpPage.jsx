import React, { Component } from "react";
import { Paper, Stack, TextField, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignupWrapper(Component) {
  return function WrappedComponent(props) {
    const auth = useAuth();
    const navigate = useNavigate();
    return <Component {...props} auth={auth} navigate={navigate} />;
  };
}

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  }

  handleSignup = () => {
    const { username, password, confirmPassword } = this.state;

    if (!username || !password) {
      this.setState({ error: "Please fill all fields" });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    const success = this.props.auth.signup(username, password);

    if (success) {
      this.props.navigate("/", { replace: true });
    } else {
      this.setState({ error: this.props.auth.error });
    }
  };

  render() {
    return (
      <Paper elevation={3} sx={{ maxWidth: 400, margin: "50px auto", padding: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Sign Up
          </Typography>

          {this.state.error && <Alert severity="error">{this.state.error}</Alert>}

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={this.state.confirmPassword}
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          />

          <Button variant="contained" onClick={this.handleSignup}>
            Create Account
          </Button>

          <Button variant="text" onClick={() => this.props.navigate("/login")}>
            Already have an account? Login
          </Button>
        </Stack>
      </Paper>
    );
  }
}

export default SignupWrapper(SignupPage);
