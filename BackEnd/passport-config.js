//this is where we store all of our passport realted informaion
const localStrategy = require('passport-local').Strategy //using the strategy method of the passport-local that we installed
const bcrypt = require('bcrypt') //we also need bcrypt for the password section


function intialize(passport, getUserByEmail) {
	const authenticateUser = async (email, passowrd, done) => { //this is the actual function that we gone call when loging in
		const user = getUserByEmail(email) //we will create this function later
		if (user == null) { //if no user if found
			return done(null, false, {message: 'No user with that email'})
		}

		try {
			if (await bcrypt.compare(passowrd, user.passowrd)) { //if true (both input pass and saved pass matches)
				return done(null, user) //return user data
			} else {
				return done(null, false, {message: 'Password incorrect'})//return a message saying that the password is incorrect
			}
		} catch(e) { //the catch is for other errores hense the e
			return done(e)
		}
	}
	passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser))//in our case the login page have the email as the username, we do not need a pssword field because it will automaticly default to password. Then we are calling the authenticateUser function.

	passport.serializeUser((user, done) => { }) //to serialize the user and assign it an ID
	passport.deserializeUser((id, done) => { })//to remove teh serialization by taking the ID away
}

module.exports = intialize //this is so we can use it with in our server.js file