var express = require('express');
var router = express.Router();
const Note = require('../models/note');

function getUserIdFromRequest(req) {
    return req.query.userId || req.body.userId;
}

router.get('/', (req, res, next) => {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
        return res.status(400).json({ message: 'userId is required.' });
    }

    Note.find({ userId: userId })
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred', error: error });
        });
});

router.post('/', (req, res, next) => {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
        return res.status(400).json({ message: 'userId is required.' });
    }

    const note = new Note({
        id: new Date().getTime().toString(),
        userId: userId,
        subject: req.body.subject,
        note: req.body.note
    });

    note.save()
        .then(createdNote => {
            res.status(201).json({message: 'Note added successfully', note: createdNote});
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred', error: error });
        });
});

router.put('/:id', (req, res, next) => {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
        return res.status(400).json({ message: 'userId is required.' });
    }

    Note.findOne({ id: req.params.id, userId: userId })
        .then(note => {
            if (!note) {
                return res.status(404).json({ message: 'Note not found.' });
            }

            note.subject = req.body.subject;
            note.note = req.body.note;

            note.save()
                .then(updatedNote => {
                    console.log('Note updated:', updatedNote);
                    res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
                })
                .catch(error => {
                    res.status(500).json({ message: 'An error occurred', error: error });
                });
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred', error: error });
        });
});

router.delete('/:id', (req, res, next) => {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
        return res.status(400).json({ message: 'userId is required.' });
    }

    Note.findOne({ id: req.params.id, userId: userId })
        .then(note => {
            if (!note) {
                return res.status(404).json({ message: 'Note not found.' });
            }

            note.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: 'Note deleted successfully' });
                })
                .catch(error => {
                    res.status(500).json({ message: 'An error occurred', error: error });
                });
        })
        .catch(error => {
            res.status(500).json({ message: 'Note not found.', error: { note: 'Note not found' } });
        });
});

module.exports = router;

