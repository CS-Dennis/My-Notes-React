import { Box, Chip, Container, Drawer, Grid, Input, List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import MyDrawer from "./Drawer";

var today = new Date();
var mockTime = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear() + " at " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


var mockData = [
    {
        id: 1,
        title: "my first note",
        content: "Hello world!",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 2,
        title: "my second note",
        content: "second note",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 3,
        title: "my third note",
        content: "Andrew Verbinnen Asks: Importing Another Contract Trying to Import another file. SimpleStorage.sol in this case but keep getting the error message that says cannot find file. SimpleStorage.sol is the name of the contract, it's on the tab right next to my current contract. How do I get current contract to find SimpleStorage.sol? Thxenter image description here",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 4,
        title: "my first note",
        content: "Hello world!",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 5,
        title: "my second note",
        content: "second note",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 6,
        title: "my third note",
        content: "Andrew Verbinnen Asks: Importing Another Contract Trying to Import another file. SimpleStorage.sol in this case but keep getting the error message that says cannot find file. SimpleStorage.sol is the name of the contract, it's on the tab right next to my current contract. How do I get current contract to find SimpleStorage.sol? Thxenter image description here",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 7,
        title: "my first note",
        content: "Hello world!",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 8,
        title: "my second note",
        content: "second note",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 9,
        title: "my third note",
        content: "Andrew Verbinnen Asks: Importing Another Contract Trying to Import another file. SimpleStorage.sol in this case but keep getting the error message that says cannot find file. SimpleStorage.sol is the name of the contract, it's on the tab right next to my current contract. How do I get current contract to find SimpleStorage.sol? Thxenter image description here",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 10,
        title: "my first note",
        content: "Hello world!",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 11,
        title: "my second note",
        content: "second note",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
    {
        id: 12,
        title: "my third note",
        content: "Andrew Verbinnen Asks: Importing Another Contract Trying to Import another file. SimpleStorage.sol in this case but keep getting the error message that says cannot find file. SimpleStorage.sol is the name of the contract, it's on the tab right next to my current contract. How do I get current contract to find SimpleStorage.sol? Thxenter image description here",
        createdDateTime: mockTime,
        modifiedDateTime: mockTime
    },
];


export default function Notes() {
    let [editorRows, setEditorRows] = useState(1);
    let [listHeight, setListHeight] = useState(0);
    let [notes, setNotes] = useState(()=>
    {
        if(mockData.length===0)
        {
            return [{ id: 0, title: "Create your first note", content: "" }];
        }
        else
        {
            return mockData;
        }
    });

    let [currentNote, setCurrentNote] = useState(()=>
    {
        if(mockData.length===0)
        {
            return { id: 0, title: "Create your first note", content: "" };
        }
        else
        {
            return mockData[0];
        }
    });

    let findNote = {};
    

    // init
    useEffect(() => {
        var headerHeight = document.getElementById("header").clientHeight;
        var windowHeight = window.innerHeight;
        console.log(headerHeight);
        console.log(windowHeight);
        setEditorRows(parseInt((windowHeight - headerHeight - 20) / 27));
        setListHeight(parseInt((windowHeight - headerHeight - 20)));
        console.log(editorRows);

    }, [])

    function getNotebyKey(key) {
        findNote = notes.find((note) => note.id === key);
        setCurrentNote(JSON.parse(JSON.stringify(findNote)));
        console.log(currentNote.content);
    }

    // once note switched or update, save any changes.
    useEffect(() => {
        let selectedNote= notes.find((note)=>note.id===currentNote.id);
        selectedNote.content = currentNote.content;
        selectedNote.title = currentNote.title;
        setNotes([...notes]);
    }, [currentNote.content, currentNote.title])


    function updateContent(event)
    {
        
        console.log(event.target.value);
        currentNote.content = event.target.value;
        setCurrentNote(JSON.parse(JSON.stringify(currentNote)));
        console.log(currentNote);
    }

    function updateTitle(event)
    {
        console.log(event.target.value);
        currentNote.title = event.target.value;    

        setCurrentNote(JSON.parse(JSON.stringify(currentNote)));
    }

    return (
        <>
            <Container maxWidth="xl">
                <Grid container>
                    {/* sm screen */}
                    <Grid sm={12} sx={{ display: { xs: "block", md: "none" } }}>
                        small list
                    </Grid>

                    {/* md or larger screen */}
                    {/* notes list */}
                    <Grid sx={{ display: { xs: 'none', md: 'block' } }} md={3} >
                        <List sx={{ maxHeight: listHeight, overflowY: "auto", width: "90%" }}>
                            {notes.map((note) =>
                                <ListItem disablePadding key={note.id} onClick={() => getNotebyKey(note.id)} sx={{marginTop: 1}}>
                                    <ListItemButton sx={{backgroundColor: "primary.main"}}>
                                        <ListItemText primary={<Typography style={{ fontWeight: "bold" }}>{note.title}</Typography>} secondary={note.modifiedDateTime} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>
                    </Grid>

                    {/* notes content for large screen */}
                    <Grid sx={{ display: { xs: 'none', md: 'block' } }} md={9}>
                        <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                            <Chip label={'Created on ' + mockTime} color="info" />
                            <Chip label={"Modified on " + mockTime} color="info" style={{ marginLeft: "10px" }} />
                        </div>
                        <div>
                            <Input value={currentNote.title} fullWidth onChange={(e)=>updateTitle(e)} />
                        </div>
                        <Paper elevation={24}>
                            <TextField
                                id="textField"
                                style={{ marginTop: "20px", margin: "20px", width: "90%" }}
                                label="Content"
                                multiline
                                rows={editorRows}
                                value={currentNote.content}
                                variant="standard"
                                onChange={(e)=>updateContent(e)}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}
