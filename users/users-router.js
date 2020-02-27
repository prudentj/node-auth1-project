const router = require('express').Router();
const users = require('./users-model');

router.get('/', (req, res) => {
	users
		.find()
		.then(results => {
			res.json(results);
		})
		.catch(err => res.status(401).json({message: 'You shall not pass!'}));
});
module.exports = router;
