import { Box, Button, Chip, Container, Dialog, DialogTitle, Drawer, Fab, Grid, Input, List, ListItem, ListItemButton, ListItemText, Paper, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '@mui/icons-material/Add';

var headerHeight = 0;
var windowHeight = 0;

export default function Notes({ notes, setNotes, selectedNoteId, setSelectedNoteId, selectedNote, setSelectedNote }) {
    let [editorRows, setEditorRows] = useState(1);
    let [listHeight, setListHeight] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // init
    useEffect(() => {
        headerHeight = document.getElementById("header").clientHeight;
        windowHeight = window.innerHeight;
        // console.log(headerHeight);
        // console.log(windowHeight);
        setEditorRows(parseInt((windowHeight - headerHeight - 20) / 27));
        setListHeight(parseInt((windowHeight - headerHeight - 20)));
        // console.log(editorRows);

    }, [])

    useEffect(() => {
        console.log(selectedNoteId);
        if (selectedNoteId !== null) {
            const list = document.getElementsByClassName("listItems");
            for (let index = 0; index < list.length; index++) {
                list[index].style.backgroundColor = "white";
                list[index].style.color = "black";
            }
            document.getElementById(selectedNoteId).style.backgroundColor = "#42c3be";
            document.getElementById(selectedNoteId).style.color = "white";
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

    function showDeleteModal() {
        console.log(selectedNoteId);
        setModalOpen(true);
    }

    function closeDeleteModal() {
        setModalOpen(false);
        console.log("Close delete modal");
    }

    function deleteSelectedNote() {
        console.log(notes);
        console.log(selectedNoteId);
        console.log(selectedNote);
        closeDeleteModal();

        let currentNote = notes.find((note) => note.id === selectedNoteId);
        let currentNoteIndex = notes.indexOf(currentNote);
        let newNotes = notes.slice(0, currentNoteIndex).concat(notes.slice(currentNoteIndex + 1, notes.length));

        if (newNotes.length > 0) {
            setNotes([...newNotes]);
            setSelectedNote(newNotes[0]);
            setSelectedNoteId(newNotes[0].id);
        }
        else {
            setNotes([]);
            setSelectedNote(null);
            setSelectedNoteId(null);
        }


        console.log(newNotes);


    }

    function addNewNote() {
        const currentDay = new Date();
        const timestamp = (currentDay.getMonth() + 1) + "/" + currentDay.getDate() + "/" + currentDay.getFullYear() + " " + currentDay.getHours() + ":" + currentDay.getMinutes() + ":" + currentDay.getSeconds();
        let newId = new Date().getTime();
        let newNote = {
            id: newId,
            title: "New Note",
            content: "",
            createdDateTime: timestamp,
            modifiedDateTime: timestamp
        }
        setNotes([...notes, newNote]);

        setSelectedNoteId(newId);
        setSelectedNote(newNote);
    }

    // *********************************************************************************************************************

    return (
        <>
            <Container maxWidth="xl">
                <Grid container>
                    {/* sm screen */}
                    <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
                        <List sx={{overflowY: "auto", height:( windowHeight - headerHeight-40+"px")}}>
                            {notes.map((note) =>
                                <ListItem onClick={()=>getNotebyKey(note.id)}>
                                    <ListItemButton>
                                        <ListItemText primary={<Typography sx={{fontWeight: "bold"}}>{note.title}</Typography>} secondary={note.modifiedDateTime} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </List>

                        {

                        }
                    </Grid>

                    {/* md or larger screen */}
                    {/* notes list */}
                    {
                        notes.length > 0
                        &&
                        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={3} >
                            <List sx={{ maxHeight: listHeight, overflowY: "auto", width: "90%", overflowX: "hidden" }}>
                                {notes.map((note) =>
                                    <ListItem disablePadding className="listItems" id={note.id} key={note.id} onClick={() => getNotebyKey(note.id)} sx={{ marginTop: 1 }}>
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
                                    <div style={{ display: "flex" }}>
                                        <Input sx={{ flex: 0.9 }} value={selectedNote.title} onChange={(e) => updateSelectedNoteTitle(e)} />
                                        <Button sx={{ flex: 0.1 }} variant='contained' color="error" onClick={() => showDeleteModal()}>Delete</Button>
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

            {/* dialog for deleting notes */}
            <Dialog open={modalOpen}>
                <DialogTitle>Delete this note?</DialogTitle>
                <Grid container sx={{ textAlign: "center", paddingBottom: "20px" }}>
                    <Grid item xs={6}>
                        <Button variant='contained' color="error" startIcon={<DeleteRoundedIcon />} onClick={() => deleteSelectedNote()}>Yes</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" startIcon={<CloseRoundedIcon />} onClick={() => closeDeleteModal()}>No</Button>
                    </Grid>
                </Grid>
            </Dialog>

            {/* Add note floating button */}
            <Fab color="primary" sx={{ position: "fixed", right: "40px", bottom: "40px" }} onClick={() => addNewNote("add")}>
                <AddIcon  />
            </Fab>

            {/* snackbar when note deleted */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration = {300}
                message = "Note deleted"
                action={
                    <>
                        <Button variant='outlined' onClick={()=> closeSnanckBar}>Ok</Button>
                    </>
                }
            />
        </>
    )
}
