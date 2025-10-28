import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SideDrawer from './SideDrawer';
import SearchDialog from './SearchDialog';
import { withRouter } from '/src/Helpers/withRouter.jsx';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CasinoIcon from '@mui/icons-material/Casino';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltIcon from '@mui/icons-material/Bolt';
import ExtensionIcon from '@mui/icons-material/Extension';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsMmaIcon from '@mui/icons-material/SportsMma';

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSearchBar: window.innerWidth >= 900 ? true : false,
            drawerOpen: false,
            selectedGenre: null,
            searchOpen: false,
        }
    }

    handleSearchToggle = () => {
        this.setState((prevState) => ({ showSearchBar: !prevState.showSearchBar }))
    }
    handleDrawerToggle = () => {
        this.setState((prevState) => ({ drawerOpen: !prevState.drawerOpen }))
    }
    handleResize = () => {
        const isDeskTop = window.innerWidth >= 900;
        if (isDeskTop && !this.state.showSearchBar) {
            this.setState({ showSearchBar: true });
        }
        else if (!isDeskTop && this.state.showSearchBar) {
            this.setState({ showSearchBar: false })
        }
    }

    handleCategorySelect = (name) => {
        let isMobile = window.innerWidth < 900;
        this.setState({
            selectedGenre: name,
            drawerOpen: !isMobile
        })
    }
    handleSearchOpen = () => {
        this.setState({ searchOpen: true })
    }
    handleSearchClose = () => {
        this.setState({ searchOpen: false })
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
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

        return (
            <>
                <AppBar position='static'
                    sx={{
                        padding: '5px',
                        boxShadow: 4,
                        borderRadius: '0 0 8px 8px',
                        backgroundColor: 'lightgray'
                    }}>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                            onClick={() => this.props.navigate('/')}>
                            <IconButton onClick={this.handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                            <Avatar
                                src="https://www.citypng.com/public/uploads/preview/joystick-game-controller-black-icon-png-img-701751695032903jqv8bkyonn.png"
                                alt="PlayHub Logo"
                                sx={{ width: 40, height: 40 }}
                            />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', ml: 1 }}>
                                PlayHub
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                flex: this.state.showSearchBar && window.innerWidth < 900 ? '1 1 100%' : 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {(this.state.showSearchBar) && (
                                <Slide direction='down' in={this.state.showSearchBar}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="Search games..."
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    {this.state.showSearchBar && window.innerWidth < 900 ? (
                                                        <IconButton
                                                            onClick={this.handleSearchToggle}
                                                            aria-label="close search"
                                                        >
                                                            <CloseIcon sx={{ color: 'gray', fontSize: '1.3rem', display: 'block', mr: '1px' }} />
                                                        </IconButton>
                                                    ) : (
                                                        <SearchIcon sx={{ color: 'gray', fontSize: '1.35rem', display: 'block', mr: '1px' }} />
                                                    )}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            width: { xs: '100%', sm: '70%', md: '50%' },
                                            height: { xs: '50px', sm: '50px' },
                                            marginLeft: '20px',
                                            borderRadius: '40px',
                                            backgroundColor: 'white',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '40px',
                                                '& fieldset': { borderColor: 'transparent' },
                                                '&:hover fieldset': { borderColor: 'transparent' },
                                                '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                            },
                                        }}
                                    />


                                </Slide>
                            )}

                            {!this.state.showSearchBar && (

                                < IconButton
                                    onClick={this.handleSearchOpen}
                                    sx={{
                                        color: 'white',
                                        display: { xs: 'block', md: 'none' },
                                        transform: 'scale(1.1)',
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>

                            )}
                        </Box>

                        <Box sx={{
                            display: {
                                xs: this.state.showSearchBar ? 'none' : 'flex',
                                md: 'flex',
                            },
                        }}
                            flexDirection={'row'} alignItems={'center'}>

                            <IconButton
                                sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}
                                onClick={() => this.props.navigate('/favorites')}
                            >
                                <FavoriteBorderIcon sx={{ color: 'white' }} />
                                <Typography variant="h6" sx={{
                                    fontWeight: 'bold', color: 'white', ml: 1,
                                    display: { xs: 'none', md: 'block' }
                                }}>
                                    Favorites
                                </Typography>
                            </IconButton>

                            <IconButton
                                sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}
                                onClick={() => this.props.navigate('/login')}
                            >
                                <LoginIcon sx={{ color: 'white' }} />
                                <Typography variant="h6" sx={{
                                    fontWeight: 'bold', color: 'white', ml: 1,
                                    display: { xs: 'none', md: 'block' }
                                }}>
                                    Login
                                </Typography>
                            </IconButton>


                        </Box>
                    </Toolbar>
                </AppBar >

                <SideDrawer
                    open={this.state.drawerOpen}
                    onClose={this.handleDrawerToggle}
                    selectedGenre={this.state.selectedGenre}
                    onCategorySelect={this.handleCategorySelect}
                />
                <SearchDialog
                    open={this.state.searchOpen}
                    onClose={this.handleSearchClose} />
            </>

        )
    }
}

export default withRouter(NavBar)