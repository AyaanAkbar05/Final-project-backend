const Project = require("../models/Project");

async function getAllProjects(req, res) {
	try {
		const projects = await Project.find({ user: req.user._id });
		res.json(projects);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function getProjectById(req, res) {
	try {
		const project = await Project.findById(req.params.id);

		if (!project) {
			return res.status(400).json({ message: "Invalid ID" });
		}

		if (project.user.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Not Authorize to view this project",
			});
		}

		res.json(project);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function createProject(req, res) {
	try {
		const project = await Project.create({
			...req.body,
			user: req.user._id,
		});

		res.status(201).json(project);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

async function updateProject(req, res) {
	try {
		const project = await Project.findById(req.params.id);

		if (!project) {
			return res.status(400).json({ message: "Invalid ID" });
		}

		if (project.user.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Not Authorize to update this project",
			});
		}

		const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function deleteProject(req, res) {
	try {
		const project = await Project.findById(req.params.id);

		if (!project) {
			return res.status(400).json({ message: "Invalid ID" });
		}

		if (project.user.toString() !== req.user._id) {
			return res.status(403).json({
				message: "Not Authorize to delete this project",
			});
		}

		await Project.findByIdAndDelete(req.params.id);

		res.json({ message: "project deleted!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
};
