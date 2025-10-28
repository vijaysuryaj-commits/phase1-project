import React, { Component } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoginIcon from '@mui/icons-material/Login';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import GroupsIcon from '@mui/icons-material/Groups';
import CasinoIcon from '@mui/icons-material/Casino';
import ExtensionIcon from '@mui/icons-material/Extension';
import BoltIcon from '@mui/icons-material/Bolt';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

class SideDrawer extends Component {

    render() {
        const genres = [
            { name: 'Shooter', icon: <MilitaryTechIcon /> },
            { name: 'MMORPG', icon: <GroupsIcon /> },
            { name: 'Battle Royale', icon: <CasinoIcon /> },
            { name: 'Strategy', icon: <ExtensionIcon /> },
            { name: 'ARPG', icon: <BoltIcon /> },
            { name: 'Action RPG', icon: <SportsMartialArtsIcon /> },
            { name: 'MMOARPG', icon: <AutoAwesomeIcon /> },
            { name: 'Fighting', icon: <SportsMmaIcon /> },
            { name: 'MOBA', icon: <SportsKabaddiIcon /> },
            { name: 'Card Game', icon: <CasinoIcon /> },
            { name: 'Dungeon Crawler', icon: <ExtensionIcon /> },
            { name: 'MMO', icon: <GroupsIcon /> },
            { name: 'Sports', icon: <SportsSoccerIcon /> },
            { name: 'RPG', icon: <SportsEsportsIcon /> },
            { name: 'Action Game', icon: <SportsMartialArtsIcon /> },
        ];

        const { open, onClose, selectedGenre, onCategorySelect } = this.props;
        const listStyle = {
            cursor: 'pointer',
            '& .MuiListItemIcon-root': { minWidth: 40, color: 'grey.700' },
        };

        return (
            <Drawer anchor="left" open={open} onClose={onClose}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: '#fafafa',
                        },
                    },
                }}>
                <Box
                    sx={{
                        width: { xs: '70vw', sm: '40vw', md: '25vw' },
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.3,
                            justifyContent: 'center',
                            p: 2,
                        }}
                    >
                        <Avatar
                            src="https://www.citypng.com/public/uploads/preview/joystick-game-controller-black-icon-png-img-701751695032903jqv8bkyonn.png"
                            alt="PlayHub Logo"
                            sx={{ width: 40, height: 40 }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'grey', ml: 1 }}>
                            PlayHub
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 1, borderBottomWidth: 0.8 }} variant="middle" />


                    <List sx={listStyle}>
                        <ListItem button>
                            <ListItemIcon >
                                <FavoriteBorderIcon />
                            </ListItemIcon>
                            <ListItemText>Favorites</ListItemText>
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon >
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText>Login</ListItemText>
                        </ListItem>
                    </List>

                    <Divider
                        sx={{ my: 1, backgroundColor: 'white', borderBottomWidth: 0.8, letterSpacing: 1.2 }}
                        variant="middle"
                    >
                        Categories
                    </Divider>

                    <List
                        sx={listStyle}>
                        {genres.map((genre) => (
                            <ListItem
                                sx={{

                                    borderLeft: selectedGenre === genre.name ? '3px solid #1976d2' : 'none',
                                    backgroundColor: selectedGenre === genre.name ? '#d7e3f0ff' : 'white'
                                }}
                                button
                                key={genre.name}
                                onClick={() => onCategorySelect(genre.name)}
                            >
                                <ListItemIcon >{genre.icon}</ListItemIcon>
                                <ListItemText
                                    primary={genre.name}
                                    primaryTypographyProps={{
                                        fontSize: '0.95rem',
                                        fontWeight: selectedGenre === genre.name ? 'bold' : 'normal',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        );
    }
}

export default SideDrawer;


//add button favorite and replace with filled icon 