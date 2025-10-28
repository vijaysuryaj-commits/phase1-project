import React, { Component, createContext, useContext } from "react";

const AuthContext = createContext(null);

export class AuthProvider extends Component {
    state = {
        users: [],
        currentUser: null,
        error: null,
    };

    signup = (username, password) => {
        const userExists = this.state.users.some((u) => u.username === username);

        if (userExists) {
            this.setState({ error: "Username already exists" });
            return false;
        }

        const newUser = { username, password };
        this.setState((prevState) => ({
            users: [...prevState.users, newUser],
            currentUser: newUser,
            error: null,
        }));
        return true;
    };

    login = (username, password) => {
        const user = this.state.users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            this.setState({ currentUser: user, error: null });
            return true;
        } else {
            this.setState({ error: "Invalid username or password" });
            return false;
        }
    };

    logout = () => {
        this.setState({ currentUser: null });
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
