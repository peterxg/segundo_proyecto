exports = module.exports = function(app, mongoose) {

	const userSchema = new mongoose.Schema({
		name: 		{ type: String },
		email: 		{ type: String, unique: true },
		gender: 	{
          type: String,
          enum: ['male', 'female']
        },
		age: 	{ type: Number },
		
	});

	mongoose.model('userInf', userSchema);

};
