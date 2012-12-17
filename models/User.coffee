db = require '../lib/db'

UserSchema = new db.Schema
	username:
		type: String
		unique: true
	password: String

MyUser = db.mongoose.model 'User', UserSchema

# Add user to database
addUser = (username, password, callback) ->
	instance = new MyUser()
	instance.username = username
	instance.password = password
	instance.save (err) ->
		if err
			callback(err)
		else
			callback(null, instance)
		return
	return

# Exports
module.exports.addUser = addUser