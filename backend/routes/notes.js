const express = require('express');
const router = express.Router();
const getchusermiddleware = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// get user notes using: GET "/api/notes/register".
router.get('/fetchnotes', getchusermiddleware, async (req, res) => {
    userid = req.id;
    const notes = await Note.find({ user: userid });
    res.json(notes);
});

// create user notes using: POST "/api/notes/addnote". LOGIN Required
router.post('/addnote', getchusermiddleware, [
    body('title', "Please provide title of min length 5").isLength({ min: 5 }),
    body('description', "Enter a Valid description of min length 5").isLength({ min: 5 }),    // these 2 validations are being added using express-validator packeage
], async (req, res) => {

    try {
        const errors = validationResult(req);
        const { title, description, tag } = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //create a new note
        const note = await Note.create({
            title,
            description,
            tag,
            user: req.id
        });

        res.json(note);
    } catch (error) {
        res.status(500).send("Some internal Server Error occurred, error: " + error.message);
    }
});

// Update user notes using: PUT "/api/notes/updatenode". LOGIN Required
router.put('/updatenote/:nid', getchusermiddleware, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        userid = req.id;
        updatedNote = {};
        if (title) {
            updatedNote.title = title;
        }
        if (description) {
            updatedNote.description = description;
        }
        if (tag) {
            updatedNote.tag = tag;
        }
        //checking that note is exist already and if it is exist already, Update the note
        let note = await Note.findById(req.params.nid);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }
        //checking that the user who is updating the note only that is him only
        if (userid !== note.user.toString()) {
            return res.status(401).send("Usermatch Not Found SO Not Allowed");
        }

        //find the note and update it
        note = await Note.findByIdAndUpdate(req.params.nid, { $set: updatedNote }, { new: true });
        res.json(note);
    } catch (error) {
        res.status(500).send("Some internal Server Error occurred, error: " + error.message);
    }
});

// Delete user notes using: PUT "/api/notes/deletenote". LOGIN Required
router.delete('/deletenote/:nid', getchusermiddleware, async (req, res) => {
    userid = req.id;
    try {

        //checking that note is exist already and if it is exist already, Update the note
        let note = await Note.findById(req.params.nid);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }
        //checking that the user who is updating the note only that is him only
        if (userid !== note.user.toString()) {
            return res.status(401).send("Usermatch Not Found SO Not Allowed");
        }

        //find the note and update it
        note = await Note.findByIdAndDelete(req.params.nid);
        res.json({ Success: "Note has been Deleted", Note: note });
    }
    catch (error) {
        res.status(500).send("Some internal Server Error occurred, error: " + error.message);
    }
});

module.exports = router;