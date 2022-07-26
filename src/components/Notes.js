import { Box, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'


var notesTitles = [];
var notesContent = "";

export default function Notes() {
    const [editorRows, setEditorRows] = useState(1);

    useEffect(() => {
        var headerHeight = document.getElementById("header").clientHeight;
        var windowHeight = window.innerHeight;
        console.log(headerHeight);
        console.log(windowHeight);
        setEditorRows(parseInt((windowHeight-headerHeight-20)/24));
        console.log(editorRows);
    }, [])
    


  return (
    <>
        <div className='row'>
            {/* sm screen */}
            <div className='col-sm-12 d-md-none'>
                small list
            </div>

            {/* md or larger screen */}
            <div className='d-none d-md-block col-md-3'>
                <Box>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                            <ListItemText primary="Trash" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </div>

            <div className='d-none d-md-block col-md-9'>
            <TextField
                id="standard-multiline-static"
                style={{marginTop: "20px"}}
                fullWidth={true}
                label="Detail"
                multiline
                rows={editorRows}
                defaultValue=""
                variant="standard"
            />
            </div>
        </div>
    </>
  )
}
