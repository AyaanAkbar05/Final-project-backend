
const Task = require("../models/Task");
const Project = require("../models/Project");

//Get all tasks
async function getTasks(req, res) {
	try {
		const project = await Project.findById(req.params.projectId);

		if (!project) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}

		if (project.user.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Not Authorize to view this project tasks",
			});
		}

		const tasks = await Task.find({ project: req.params.projectId });

		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

//create a task
async function createTask(req, res) {
	try {
		const project = await Project.findById(req.params.projectId);

		if (!project) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}

		if (project.user.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Not Authorize to add task to this project",
			});
		}

		const task = await Task.create({
			...req.body,
			project: req.params.projectId,
		});

		res.status(201).json(task);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

//update a task
async function updateTask(req, res) {
	try {
		const task = await Task.findById(req.params.taskId);

		if (!task) {
			return res.status(400).json({ message: "Invalid Task ID" });
		}

		const project = await Project.findById(task.project);

		if (!project) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}

		if (project.user.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Not Authorize to update this task",
			});
		}

		const updated = await Task.findByIdAndUpdate(
			req.params.taskId,
			req.body,
			{ new: true }
		);

		res.json(updated);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

//Delete a task
async function deleteTask(req, res) {
	try {
		const task = await Task.findById(req.params.taskId);

		if (!task) {
			return res.status(400).json({ message: "Invalid Task ID" });
		}

		const project = await Project.findById(task.project);

		if (!project) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}

		if (project.user.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Not Authorize to delete this task",
			});
		}

		await Task.findByIdAndDelete(req.params.taskId);

		res.json({ message: "task deleted!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

module.exports = {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
};
