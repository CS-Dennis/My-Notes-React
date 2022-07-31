import { Box, Button, Chip, Container, Drawer, Grid, Input, List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import Axios from 'axios';



export default function Notes({ notes, setNotes, selectedNoteId, setSelectedNoteId, selectedNote, setSelectedNote }) {
    let [editorRows, setEditorRows] = useState(1);
    let [listHeight, setListHeight] = useState(0);

    // init
    useEffect(() => {
        var headerHeight = document.getElementById("header").clientHeight;
        var windowHeight = window.innerHeight;
        // console.log(headerHeight);
        // console.log(windowHeight);
        setEditorRows(parseInt((windowHeight - headerHeight - 20) / 27));
        setListHeight(parseInt((windowHeight - headerHeight - 20)));
        // console.log(editorRows);

    }, [])

    useEffect(() => {
      console.log(selectedNoteId);
      if(selectedNoteId!==null)
      {
        const list = document.getElementsByClassName("listItems");
        for (let index = 0; index < list.length; index++) {
            list[index].style.backgroundColor = "white";
        }
        document.getElementById(selectedNoteId).style.backgroundColor = "#42c3be";
      }
    }, [selectedNoteId])
    





    // choose the note by key and then update selectedNoteId and selectedNoteContent
    function getNotebyKey(id) {
        console.log(id);
        setSelectedNoteId(id);
        let findNote = notes.find((note) => note.id === id);
        setSelectedNote({ ...findNote });
    }




    // upate the content of the selected note
    function updateSelectedNote(e) {
        console.log(e.target.value);
        console.log(selectedNoteId);
        let findNote = notes.find((note) => note.id === selectedNoteId);
        findNote.content = e.target.value;
        const currentDay = new Date();
        const timestamp = (currentDay.getMonth() + 1) + "/" + currentDay.getDate() + "/" + currentDay.getFullYear() + " " + currentDay.getHours() + ":" + currentDay.getMinutes() + ":" + currentDay.getSeconds();
        findNote.modifiedDateTime = timestamp;
        setSelectedNote({ ...findNote });
    }

    // upate the title of the selected note
    function updateSelectedNoteTitle(e) {
        console.log(e.target.value);
        let findNote = notes.find((note) => note.id === selectedNoteId);
        findNote.title = e.target.value;
        const currentDay = new Date();
        const timestamp = (currentDay.getMonth() + 1) + "/" + currentDay.getDate() + "/" + currentDay.getFullYear() + " " + currentDay.getHours() + ":" + currentDay.getMinutes() + ":" + currentDay.getSeconds();
        findNote.modifiedDateTime = timestamp;
        setSelectedNote({ ...findNote });
    }

    function deleteSelectedNote()
    {
        console.log(notes);
        console.log(selectedNoteId);
        console.log(selectedNote);
        let currentNote = notes.find((note)=>note.id===selectedNoteId);
        let currentNoteIndex = notes.indexOf(currentNote);
        let newNotes = notes.slice(0, currentNoteIndex).concat(notes.slice(currentNoteIndex+1, notes.length));
        
        setNotes([...newNotes]);
        setSelectedNote(newNotes[0]);
        setSelectedNoteId(newNotes[0].id);
        
        console.log(newNotes);
    }

    // *********************************************************************************************************************

    return (
        <>
            <Container maxWidth="xl">
                <Grid container>
                    {/* sm screen */}
                    <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
                        small list
                    </Grid>

                    {/* md or larger screen */}
                    {/* notes list */}
                    {
                        notes.length > 0
                        &&
                        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={3} >
                            <List sx={{ maxHeight: listHeight, overflowY: "auto", width: "90%" }}>
                                {notes.map((note) =>
                                    <ListItem disablePadding className="listItems" id={note.id} key={note.id} onClick={() => getNotebyKey(note.id)} sx={{ marginTop: 1}}>
                                        <ListItemButton>
                                            <ListItemText primary={<Typography style={{ fontWeight: "bold" }}>{note.title}</Typography>} secondary={note.modifiedDateTime} />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                    }
                    {
                        notes.length === 0 &&
                        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={3} >
                            <List sx={{ maxHeight: listHeight, overflowY: "auto", width: "90%" }}>

                            </List>
                        </Grid>
                    }


                    {/* notes content for large screen */}
                    <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={9}>
                        <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                            {
                                notes.length > 0
                                &&
                                <>
                                    <AccessTimeRoundedIcon className="myIcon" />
                                    <Chip label={'Created on ' + selectedNote.createdDateTime} className="myIcon" />
                                    <Chip label={"Modified on " + selectedNote.modifiedDateTime} className="myIcon" />
                                </>
                            }

                        </div>
                        <div>
                            {
                                notes.length > 0
                                &&
                                <>
                                    <div style={{display: "flex"}}>
                                        <Input sx={{ flex: 0.9 }} value={selectedNote.title} onChange={(e) => updateSelectedNoteTitle(e)} />
                                        <Button sx={{ flex: 0.1 }} variant='contained' color="error" onClick={()=>deleteSelectedNote()}>Delete</Button>
                                    </div>
                                </>
                            }
                        </div>
                        <Paper elevation={24}>
                            {
                                notes.length > 0
                                &&
                                <TextField
                                    id="textField"
                                    style={{ marginTop: "20px", margin: "20px", width: "90%" }}
                                    label="Content"
                                    multiline
                                    rows={editorRows}
                                    value={selectedNote.content}
                                    variant="standard"
                                    onChange={(e) => updateSelectedNote(e)}
                                />
                            }

                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}
