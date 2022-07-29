
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Container } from '@mui/system';

// import toggleDrawer from "./Drawer";




export default function Header() {

    const [open, setOpen] = useState(false);

    function test(text) {
        console.log(text);
    }

    function toggleDrawer(open) {
        setOpen(open);
    }

    function clickMenuItem(item) {
        console.log(item);
        setOpen(false);
    }

    const list = () =>
    (
        <Box
            minWidth={250}
            role="presentation"
        >
            <List>
                {["Add a New Note"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => clickMenuItem(text)}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <>
            <Container maxWidth="xl" id="header">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Notes App <span style={{ fontSize: "0.7em" }}>Version 1.0</span>
                            </Typography>
                            <img src='./notes_app.png' height="50px" />
                        </Toolbar>
                    </AppBar>
                </Box>
            </Container>

            {/* drawer */}
            <React.Fragment>
                <Drawer
                    open={open}
                    onClose={() => toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </>
    )
}
