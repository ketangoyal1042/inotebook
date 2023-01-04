import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {
    const {SetAlert} = props;
    const Notes = useContext(noteContext);
    const {addNote} = Notes;  // it is destructoring 
    const [note, setnote] = useState({title: "", description: "", tag: ""});
    const onValChanged = (e) => {
        setnote({...note, [e.target.name]: e.target.value});
    };
    const submitHandler = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""});
        SetAlert("Note added successfully", "success");
    };
    return (
        <div>
            <h1 className='my-3'>Add a Note</h1>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onValChanged}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onValChanged}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onValChanged}/>
                </div>
                <button disabled={note.title.length<6 || note.description.length<6 || note.tag.length<3} type="submit" className="btn btn-primary my-3" onClick={submitHandler}>Submit</button>
            </form>
        </div>
    )
}
