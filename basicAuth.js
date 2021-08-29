/* this file contains middleware functions that 
control access to certain features based on
a user's role */
function authUser(req, res, next){
	if (req.user == null){
		res.status(403);
		res.render('error', {
			message: 'You need to sign in!',
		})
		return res.send('You need to sign in');
	};

	next();
};

function authRole(role){
	return (req, res, next) => {
		if (req.user.role !== role) {
			res.status(401);
			return res.send('Not Allowed');
		};

		next();
	}
}

//checks to see if a user is banned
function authBan(req, res, next){
	if (req.user.role === 'banned'){
		res.status(403).json('Enforcement action taken on your account.')
	};
	next();
}

module.exports = {
	authUser,
	authRole,
	authBan
}