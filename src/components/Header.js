import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';




export default function header() {

    function toggleMenu()
    {
        console.log("hello world!");
    }

  return (
    <>
        <div id='header' className='row'>
            <div className='col-12'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={()=>toggleMenu()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Notes App <span style={{fontSize: "0.7em"}}>Version 1.0</span>
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                    </Toolbar>
                </AppBar>
             </Box>
            </div>
        </div>
        
    </>
  )
}
