// implement your API here
const express = require('express');
const userDB = require('./data/db');
const server = express();

server.use(express.json());

const port = 5000;

server.get('/', () => {
	resizeBy.json({hello});
});

//Returns an array of all the user objects contained in the database.

// GET   /api/users  Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
	userDB
		.find()
		.then(users => res.status(200).json(users))
		.catch(err => {
			console.log(err);
			res
				.status(500)
				.json({errorMessage: 'The users information could not be retrieved.'});
		});
});

// GET  /api/users/:id  Returns the user object with the specified `id`.

server.get('/api/users/:id', (req, res) => {
	userDB
		.findById(req.params.id)
		.then(user => {
			if (user === undefined) {
				res
					.status(400)
					.json({message: 'The user with the specified ID does not exist.'});
			} else {
				res.status(200).json(user);
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({errorMessage: 'The user information could not be retrieved.'});
		});
});

// POST  /api/users  Creates a user using the information sent inside the `request body`.

server.post('/api/users', (req, res) => {
	users = req.body;
	if (!users.name || !users.bio) {
		res
			.status(400)
			.json({errorMessage: 'Please provide name and bio for the user.'});
	} else {
		userDB
			.insert(users)
			.then(user => {
				res.status(201).json(user);
			})
			.catch(error => {
				res.status(500).json({
					errorMessage:
						'There was an error while saving the user to the database'
				});
			});
	}
});

// DELETE /api/users/:id  Removes the user with the specified `id` and returns the deleted user.

server.delete(`/api/users/:id`, (req, res) => {
	userDB
		.remove(req.params.id)
		.then(user => {
			if (user === undefined) {
				res.status(404).json('The user with the specified ID does not exist');
			} else {
				res.status(200).json(user);
			}
		})
		.catch(error => {
			res.status(500).json({errorMessage: 'The user could not be removed'});
		});
});

//PUT /api/users/:id Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
server.put('/api/users/:id', (req, res) => {
	userDB
		.update(req.params.id, req.body)
		.then(user => {
			if (user === undefined) {
				res.status(404).json('The user with the specified ID does not exist.');
			} else if (!req.body.name || !req.body.bio) {
				res
					.status(400)
					.json({errorMessage: 'Please provide name and bio for the user.'});
			} else {
				res.status(200).json(user);
			}
		})
		.catch(error => {
			console.log(error);
			res
				.status(500)
				.json({errorMessage: 'The user information could not be modified.'});
		});
});

server.listen(port, () => console.log(` Port ${port} is active`));
