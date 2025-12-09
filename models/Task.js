const { Schema, model } = require("mongoose");
const taskSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["todo", "in-progress", "done"],
		default: "todo",
		required: true,
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},
});

const Task = model("Task", taskSchema);

module.exports = Task;