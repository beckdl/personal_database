var express = require('express');
var router = express.Router();
const user = require('../models/user');

router.get('/', (req, res, next) => {
    user.findOne({ userName: req.query.userName, password: req.query.password })
        .then(user => {
            if (user) {
                console.log('User found:', user);
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred', error: error });
        });
});

router.post('/', (req, res, next) => {
    const newUser = new user({
        id: new Date().getTime().toString(),
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    });

    newUser.save()
        .then(createdUser => {
            res.status(201).json({message: 'User added successfully', user: createdUser});
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred', error: error });
        });
});

router.put('/:id', (req, res, next) => {
    user.findOne({ id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.userName = req.body.userName;
            user.password = req.body.password;
            user.email = req.body.email;
            user.phone = req.body.phone;

            user.save()
                .then(updatedUser => {
                    console.log('User updated:', updatedUser);
                    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
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
    user.findOne({ id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: 'User deleted successfully' });
                })
                .catch(error => {
                    res.status(500).json({ message: 'An error occurred', error: error });
                });
        })
        .catch(error => {
            res.status(500).json({ message: 'User not found.', error: { user: 'User not found' } });
        });
});

module.exports = router;