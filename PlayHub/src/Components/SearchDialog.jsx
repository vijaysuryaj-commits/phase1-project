import React, { Component } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class SearchDialog extends Component {
  state = { searchValue: "" };

  handleChange = (e) => this.setState({ searchValue: e.target.value });

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = this.state.searchValue.trim();
      if (query && this.props.onSearch) {
        this.props.onSearch(query);
        this.props.onClose();
      }
    }
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            borderRadius: 3,
          },
        }}
      >
        <DialogContent>
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              autoFocus
              placeholder="Search games..."
              variant="outlined"
              value={this.state.searchValue}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "gray" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flexGrow: 1,
                borderRadius: "40px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                  "& fieldset": { borderColor: "transparent" },
                },
              }}
            />
            <IconButton onClick={onClose} sx={{ ml: 1 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export default SearchDialog;
