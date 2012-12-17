mongoose = require('mongoose')
Schema = mongoose.Schema

module.exports.mongoose = mongoose
module.exports.Schema = Schema

# Connect to cloud database
username = "admin"
password = "omega8"
address = '@ds045137.mongolab.com:45137/test-db'

# Connect to mongolab
connect = ->
	mongoose.connect("mongodb://#{username}:#{password}#{address}")
	return

disconnect = ->
	mongoose.disconnect()
	return

connect()