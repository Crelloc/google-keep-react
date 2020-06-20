const mongoose = require('mongoose');
const {readFileSync} = require('fs');
const url      = process.env.MONGODB_ATLAS_URI;
const options  = {
	//https://docs.mongodb.com/manual/reference/connection-string/#connection-string-options 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	w: "majority",
	retryWrites: true,
//	ssl: true,
//	authMechanism: "MONGODB-X509",
//	authSource: "$external",
//	tlsCertificateKeyFile: readFileSync(process.env.MONGODB_X509_PATH)
};

console.log('connection to', url);
mongoose.connect(url, options)
	.then(result => {
    		console.log('connected to MongoDB');
  	})
  	.catch((error) => {
		console.error(error);
    		console.log('error connecting to MongoDB:', error.message);
  	});

const noteSchema = new mongoose.Schema({
	title  : String,
	content: String,
	date   : Date
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}

});

module.exports = mongoose.model('Note', noteSchema);
