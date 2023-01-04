import React, { useState } from "react"
import NoteContext from "./noteContext"

export default function NoteState(props) {
    const initialNotes = [
        {
            "_id": "63a5b84a6d73de59c9ab721b",
            "user": "63a35259077020939da47c1c",
            "title": "MyFirstNote",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-23T14:16:42.810Z",
            "__v": 0
        },
        {
            "_id": "63a9510e6d73de59c9ab7220",
            "user": "63a35259077020939da47c1c",
            "title": "AAsacA",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-26T07:45:18.025Z",
            "__v": 0
        },
        {
            "_id": "63a97d5df450a85cfb1c324e",
            "user": "63a35259077020939da47c1c",
            "title": "AAsacA",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-26T10:54:21.677Z",
            "__v": 0
        },
        {
            "_id": "63a97d5ef450a85cfb1c3250",
            "user": "63a35259077020939da47c1c",
            "title": "AAsacA",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-26T10:54:22.291Z",
            "__v": 0
        },
        {
            "_id": "63a97ded206e0d7e1d6f8f86",
            "user": "63a35259077020939da47c1c",
            "title": "AAsacA",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-26T10:56:45.575Z",
            "__v": 0
        },
        {
            "_id": "63a97dee206e0d7e1d6f8f88",
            "user": "63a35259077020939da47c1c",
            "title": "AAsacA",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-26T10:56:46.204Z",
            "__v": 0
        },
        {
            "_id": "63a97e27522f4db9f2428533",
            "user": "63a35259077020939da47c1c",
            "title": "AAsacA",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-26T10:57:43.716Z",
            "__v": 0
        },
        {
            "_id": "63a97e9d55f99bda1a9c1c17",
            "user": "63a35259077020939da47c1c",
            "title": "AAsacA",
            "description": "fdvdfgsdfasd",
            "tag": "personal",
            "date": "2022-12-26T10:59:41.182Z",
            "__v": 0
        }
    ]

    const [notes, setnotes] = useState(initialNotes);
    const host = "http://localhost:5000/api/notes";

    const FetchAllNotes = async () => {
        //Fatch API
        const response = await fetch(`${host}/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const data = await response.json();
        setnotes(data);

    }

    //Add a new note
    const addNote = async (title, description, tag) => {
        //Fatch API
        const response = await fetch(`${host}/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })  // provide the data which we provide in body section
        });
          const json = await response.json();
          console.log(json);
        // const newnote = {
        //     "_id": "63a5b84a6d7dss3de59c9ab721b",
        //     "user": "63a352ss590770d20939da47c1c",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-12-23T14:16:42.810Z",
        //     "__v": 0
        // };
        const newnote = json;
        setnotes(notes.concat(newnote));
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

        //Fatch API
        const response1 = await fetch(`${host}/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response1.json();
        console.log(json);

        let newnotes = JSON.parse(JSON.stringify(notes));

        // logic to edit the note
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setnotes(newnotes);
    };

    //Delete a note
    const deleteNote = async (id) => {
        //Fatch API
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);

        const NewNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setnotes(NewNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, FetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}