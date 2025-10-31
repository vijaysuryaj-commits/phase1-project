import React, { Component, createContext, useContext } from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const AuthContext = createContext(null);

export class AuthProvider extends Component {
    state = {
        users: JSON.parse(localStorage.getItem("users")) || [],
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
        error: null,
        snackbar: { open: false, message: "", severity: "success" },
    };

    updateLocalStorage = () => {
        localStorage.setItem("users", JSON.stringify(this.state.users));
        localStorage.setItem("currentUser", JSON.stringify(this.state.currentUser));
    };
    showSnackbar = (message, severity = "success") => {
        this.setState({ snackbar: { open: true, message, severity } });
        setTimeout(() => {
            this.setState({ snackbar: { ...this.state.snackbar, open: false } });
        }, 2000);
    };

    handleCloseSnackbar = () => {
        this.setState({ snackbar: { ...this.state.snackbar, open: false } });
    };


    signup = (username, password) => {
        const userExists = this.state.users.some(
            (u) => u.username.toLowerCase() === username.toLowerCase()
        );

        if (userExists) {
            this.setState({ error: "Username already exists" });
            return false;
        }

        const newUser = { username, password, favorites: [] };
        const updatedUsers = [...this.state.users, newUser];

        this.setState(
            { users: updatedUsers, currentUser: newUser, error: null },
            this.updateLocalStorage
        );
        this.showSnackbar("Signup successful! Welcome!", "success");
        return true;
    };

    login = (username, password) => {
        const user = this.state.users.find(
            (u) =>
                u.username.toLowerCase() === username.toLowerCase() &&
                u.password === password
        );

        if (user) {
            this.setState({ currentUser: user, error: null }, this.updateLocalStorage);
            this.showSnackbar(`Welcome back, ${username}!`, "success");
            return true;
        } else {
            this.showSnackbar("Invalid username or password", "error");
            return false;
        }
    };

    logout = () => {
        this.setState({ currentUser: null }, this.updateLocalStorage);
        this.showSnackbar("Logged out successfully!", "info");
    };

    toggleFavorite = (gameId) => {
        const { currentUser, users } = this.state;
        if (!currentUser) {
            return
        };

        const updatedUsers = users.map((u) => {
            if (u.username === currentUser.username) {
                const favorites = u.favorites || [];
                const isFav = favorites.includes(gameId);
                const updatedFavs = isFav
                    ? favorites.filter((id) => id !== gameId)
                    : [...favorites, gameId];
                this.showSnackbar(
                    isFav ? "Removed from Favorites 💔" : "Added to Favorites 💖",
                    isFav ? "warning" : "success"
                );
                return { ...u, favorites: updatedFavs };
            }
            return u;
        });
        const updatedCurrentUser = updatedUsers.find(
            (u) => u.username === currentUser.username
        );

        this.setState(
            { users: updatedUsers, currentUser: updatedCurrentUser },
            this.updateLocalStorage
        );
    };

    render() {
        const { snackbar } = this.state;
        return (
            <AuthContext.Provider
                value={{
                    users: this.state.users,
                    user: this.state.currentUser,
                    error: this.state.error,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    toggleFavorite: this.toggleFavorite,
                    isAuthenticated: !!this.state.currentUser,
                }}
            >
                {this.props.children}
                <Snackbar
                    open={snackbar.open}
                    onClose={this.handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        severity={snackbar.severity}
                        sx={{
                            background:
                                snackbar.severity === "success"
                                    ? "linear-gradient(90deg, #ff9800, #ffb74d)"
                                    : snackbar.severity === "warning"
                                        ? "linear-gradient(90deg, #ffa726, #ffcc80)"
                                        : snackbar.severity === "error"
                                            ? "linear-gradient(90deg, #e53935, #ef5350)"
                                            : "linear-gradient(90deg, #1976d2, #64b5f6)",
                            color: "#000",
                            fontWeight: "bold",
                            boxShadow: "0 0 10px rgba(255,165,0,0.6)",
                            display: "flex",
                            alignItems: "center",
                        }}
                        action={
                            <IconButton
                                size="small"
                                color="inherit"
                                onClick={this.handleCloseSnackbar}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </AuthContext.Provider>
        );
    }
}

export const useAuth = () => useContext(AuthContext);


