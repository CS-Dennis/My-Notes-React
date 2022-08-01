import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
import { Container } from "@mui/system";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';

// import toggleDrawer from "./Drawer";

export default function Header({
  notes,
  setNotes,
  setSelectedNoteId,
  setSelectedNote,
}) {
  const [open, setOpen] = useState(false);

  function toggleDrawer(open) {
    setOpen(open);
  }

  function clickMenuItem(key) {
    setOpen(false);

    const currentDay = new Date();
    const timestamp =
      currentDay.getMonth() +
      1 +
      "/" +
      currentDay.getDate() +
      "/" +
      currentDay.getFullYear() +
      " " +
      currentDay.getHours() +
      ":" +
      currentDay.getMinutes() +
      ":" +
      currentDay.getSeconds();

    if (key === "add") {
      let newId = new Date().getTime();
      let newNote = {
        id: newId,
        title: "New Note",
        content: "",
        createdDateTime: timestamp,
        modifiedDateTime: timestamp,
      };
      setNotes([...notes, newNote]);

      setSelectedNoteId(newId);
      setSelectedNote(newNote);
    }
  }

  const drawerItems = [
    { key: "add", label: "Add a New Note" },
    { key: "archive", label: "Archive" },
    { key: "trash", label: "Trash" },
  ];

  const list = () => (
    <Box minWidth={250} role="presentation">
      <Card sx={{ textAlign: "center", paddingBottom: "10px" }}>
        <CardHeader title="Notes App" />
        <div>Version 0.1.0</div>
        <CardMedia
          component="img"
          image="./notes_app.png"
          sx={{ width: "40%", margin: "auto" }}
        />
      </Card>
      <List>
        {drawerItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => clickMenuItem(item.key)}>
              <ListItemIcon>
                {item.key === "add" && <AddRoundedIcon />}
                {item.key === "archive" && <ArchiveRoundedIcon />}
                {item.key === "trash" && <DeleteSweepRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
              <img src="./notes_app.png" height="50px" />
            </Toolbar>
          </AppBar>
        </Box>
      </Container>

      {/* drawer */}
      <React.Fragment>
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </>
  );
}
