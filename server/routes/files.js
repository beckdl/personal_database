var express = require('express');
var router = express.Router();
const File = require('../models/file');

router.get('/', (req, res, next) => {
    File.find()
        .then(files => {
            res.status(200).json(files);
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred', error: error });
        });
});

router.post('/', (req, res, next) => {
    const file = new File({
        id: new Date().getTime().toString(),
        name: req.body.name,
        item: req.body.item,
        description: req.body.description
    });

    file.save()
        .then(createdFile => {
            res.status(201).json({message: 'File added successfully', file: createdFile});
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred', error: error });
        });
});

router.put('/:id', (req, res, next) => {
    File.findOne({ id: req.params.id })
        .then(file => {
            if (!file) {
                return res.status(404).json({ message: 'File not found.' });
            }

            file.name = req.body.name;
            file.item = req.body.item;
            file.description = req.body.description;

            file.save()
                .then(updatedFile => {
                    console.log('File updated:', updatedFile);
                    res.status(200).json({ message: 'File updated successfully', file: updatedFile });
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
    File.findOne({ id: req.params.id })
        .then(file => {
            file.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: 'File deleted successfully' });
                })
                .catch(error => {
                    res.status(500).json({ message: 'An error occurred', error: error });
                });
        })
        .catch(error => {
            res.status(500).json({ message: 'File not found.', error: { file: 'File not found' } });
        });
});

module.exports = router;