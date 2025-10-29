import React, { Component } from "react";

class Footer extends Component {
    render() {
        const footerStyle = {
            backgroundColor: "#1e1e1e",
            color: "#fff",
            textAlign: "center",
            padding: "1rem 0",
            fontSize: "0.95rem",
            fontWeight: "400",
            letterSpacing: "0.5px",
            borderTop: "2px solid #333",
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            position: 'relative',
            marginLeft: 0
        };

        const brandStyle = {
            fontWeight: "600",
            color: "#00bcd4",
        };

        return (
            <footer style={footerStyle}>
                <span style={brandStyle}>PlayHub</span> © 2025 All rights reserved.
            </footer>
        );
    }
}

export default Footer;
