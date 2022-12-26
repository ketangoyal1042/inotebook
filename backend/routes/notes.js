const express = require('express');
const router = express.Router();
const getchusermiddleware = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// get user notes using: GET "/api/auth/register".
router.get('/fetchnotes', getchusermiddleware, async (req, res) => {
    userid = req.id;
    const notes = await Note.find({ user: userid });
    res.json(notes);
});

// create user notes using: POST "/api/auth/addnote".
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

module.exports = router;