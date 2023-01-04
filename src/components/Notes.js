import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes(props) {
    const navigator = useNavigate();
    const context = useContext(noteContext);
    const { notes, FetchAllNotes, editNote } = context; // don't confise it is destructing 
    const {SetAlert} = props; 
    useEffect(() => {
        if (localStorage.getItem('token')) {
            FetchAllNotes();
            
        } else {
            navigator('/login');
        }
    }, []);

    const ref = useRef(null);
    const Closeref = useRef(null);

    const UpdateNote = (currentNote) => {
        ref.current.click();
        setnote({eid:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    const [note, setnote] = useState({eid: "", etitle: "", edescription: "", etag: ""});
    const onValChanged = (e) => {
        setnote({...note, [e.target.name]: e.target.value});
    };
    const submitHandler = (e) => {
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        Closeref.current.click();
        SetAlert("Note Updated Successfully", "success");
    };

    return (
        <>
            <AddNote SetAlert={SetAlert}/>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ "display": "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onValChanged} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}  onChange={onValChanged} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onValChanged} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={Closeref}>Close</button>
                            <button  disabled={note.etitle.length<6 || note.edescription.length<6 || note.etag.length<3} type="button" className="btn btn-primary" onClick={submitHandler}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-3'>
                <h1>Your Notes</h1>
                <div className="row">
                    {notes.map((note) => {
                        // return note.title;
                        return <NoteItem key={note._id} note={note} ModalUpdateNote={UpdateNote} SetAlert={SetAlert}/>
                    })}
                </div>
            </div>
        </>
    )
}
