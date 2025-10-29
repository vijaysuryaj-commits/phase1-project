import React from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function NextArrow(props) {
    const { onClick } = props;
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                right: "-25px",
                transform: "translateY(-50%)",
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "50%",
                width: 40,
                height: 40,
                cursor: "pointer",
                boxShadow: 3,
                zIndex: 2,
                "&:hover": { backgroundColor: "#115293" },
                "@media (max-width: 600px)": { display: "none" },
            }}
        >
            <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
        </Box>
    );
}

export function PrevArrow(props) {
    const { onClick } = props;
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                left: "-25px",
                transform: "translateY(-50%) rotate(180deg)",
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "50%",
                width: 40,
                height: 40,
                cursor: "pointer",
                boxShadow: 3,
                zIndex: 2,
                "&:hover": { backgroundColor: "#115293" },
                "@media (max-width: 600px)": { display: "none" },
            }}
        >
            <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
        </Box>
    );
}
