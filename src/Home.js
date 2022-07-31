import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import Notes from './components/Notes';

var today = new Date();
var mockTime = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var mockData = [];


export default function Home() {
	// state of all notes objects
	const [notes, setNotes] = useState(mockData);

	// selected Note to display on the screen
	const [selectedNoteId, setSelectedNoteId] = useState(() => {
		if (notes.length > 0) {
			return notes[0].id;
		}
		else {
			return null;
		}
	});
	const [selectedNote, setSelectedNote] = useState(() => {
		if (notes.length > 0) {
			return notes[0];
		}
		else {
			return null;
		}
	});


	return (
		<>
			<Header notes={notes} setNotes={setNotes} setSelectedNoteId={setSelectedNoteId} setSelectedNote={setSelectedNote} />

			<Notes notes={notes} setNotes={setNotes} selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
		</>
	)
}
