//Imports
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const usersRouter = require('../users/users-router');
const users = require('../users/users-model');

//Routes

router.use('/users', restricted, usersRouter);

router.get('/hash', (req, res) => {
	const authentication = req.headers.authentication;
	const hash = bcrypt.hashSync(authentication, 8);
	res.json({originalValue: authentication, hashedValue: hash});
});

router.get('/', (req, res) => {
	res.json({message: 'Access granted'});
});

router.post('/register', (req, res) => {
	const hash = bcrypt.hashSync(req.body.password, 8);
	req.body.password = hash;
	users
		.add(req.body)
		.then(result => {
			res.status(201).json(result);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	users
		.findBy({username})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				req.session.user =
					user && res.status(200).json({message: 'Login Success'});
			} else {
				res.status(401).json({message: 'You shall not pass!'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.json({
					message:
						"When she calls you to go there is one thing you should know We don't have to live this way Baby, why don't you stay?"
				});
			} else {
				res.json(200).json({message: 'You will be gentle on my mind'});
			}
		});
	} else {
		res
			.status(200)
			.json({
				message:
					'Whats your name whats your sign whats your birthday? You were never logged in'
			});
	}
});
//middleware
function restricted(req, res, next) {
	const username = req.header.username;
	const password = req.header.password;
	if (req.session && req.session.user) {
		next();
	} else {
		res.status(400).json({error: 'please provide credentials'});
	}
}
module.exports = router;
