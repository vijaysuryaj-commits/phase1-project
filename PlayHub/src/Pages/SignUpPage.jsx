import React, { Component } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          color: "white",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            background:
              "linear-gradient(160deg, rgba(25,20,10,0.8), rgba(10,10,10,0.9))",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,165,0,0.3)",
            boxShadow: "0 0 25px rgba(255,165,0,0.4)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            sx={{
              color: "orange",
              textShadow: "0 0 10px rgba(255,165,0,0.8)",
            }}
          >
            🧾 Create Account
          </Typography>

          {this.state.error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 2,
                backgroundColor: "rgba(255,0,0,0.1)",
                color: "white",
              }}
            >
              {this.state.error}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
              InputLabelProps={{ style: { color: "orange" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": { borderColor: "rgba(255,165,0,0.4)" },
                  "&:hover fieldset": { borderColor: "rgba(255,165,0,0.8)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "orange",
                    boxShadow: "0 0 10px orange",
                  },
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              InputLabelProps={{ style: { color: "orange" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": { borderColor: "rgba(255,165,0,0.4)" },
                  "&:hover fieldset": { borderColor: "rgba(255,165,0,0.8)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "orange",
                    boxShadow: "0 0 10px orange",
                  },
                },
              }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={this.state.confirmPassword}
              onChange={(e) =>
                this.setState({ confirmPassword: e.target.value })
              }
              InputLabelProps={{ style: { color: "orange" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": { borderColor: "rgba(255,165,0,0.4)" },
                  "&:hover fieldset": { borderColor: "rgba(255,165,0,0.8)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "orange",
                    boxShadow: "0 0 10px orange",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={this.handleSignup}
              sx={{
                mt: 2,
                background:
                  "linear-gradient(90deg, rgba(255,165,0,1) 0%, rgba(255,200,0,1) 100%)",
                color: "#000",
                fontWeight: "bold",
                borderRadius: "10px",
                py: 1.2,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #ffb84d 0%, #ffd54f 100%)",
                  boxShadow: "0 0 15px rgba(255,165,0,0.7)",
                },
              }}
            >
              CREATE ACCOUNT
            </Button>

            <Typography
              variant="body2"
              mt={2}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Already have an account?{" "}
              <Button
                onClick={() => this.props.navigate("/login")}
                sx={{
                  color: "orange",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { textShadow: "0 0 10px orange" },
                }}
              >
                Login
              </Button>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    );
  }
}

export default SignupWrapper(SignupPage);
