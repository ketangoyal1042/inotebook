import React, { useContext } from 'react'
import Column from './Column';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, ModalUpdateNote } = props;


    return (

        <Column col={3}>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen mx-3" onClick={()=>{ModalUpdateNote(note)}}></i><i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
                </div>
            </div>
        </Column>

    )
}
