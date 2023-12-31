const { Schema, model } = require("mongoose");

const User = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	gender: { type: String, required: true },
});

module.exports = model("User", User);
