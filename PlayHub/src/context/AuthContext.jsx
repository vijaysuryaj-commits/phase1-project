import React, { Component, createContext, useContext } from "react";

const AuthContext = createContext(null);

export class AuthProvider extends Component {
    state = {
        users: JSON.parse(localStorage.getItem("users")) || [],
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
        error: null,
    };

    updateLocalStorage = () => {
        localStorage.setItem("users", JSON.stringify(this.state.users));
        localStorage.setItem("currentUser", JSON.stringify(this.state.currentUser));
    };

    signup = (username, password) => {
        const userExists = this.state.users.some(
            (u) => u.username.toLowerCase() === username.toLowerCase()
        );

        if (userExists) {
            this.setState({ error: "Username already exists" });
            return false;
        }

        const newUser = { username, password };
        const updatedUsers = [...this.state.users, newUser];

        this.setState(
            { users: updatedUsers, currentUser: newUser, error: null },
            this.updateLocalStorage
        );

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
            return true;
        } else {
            this.setState({ error: "Invalid username or password" });
            return false;
        }
    };

    logout = () => {
        this.setState({ currentUser: null }, this.updateLocalStorage);
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    users: this.state.users,
                    user: this.state.currentUser,
                    error: this.state.error,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    isAuthenticated: !!this.state.currentUser,
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export const useAuth = () => useContext(AuthContext);
