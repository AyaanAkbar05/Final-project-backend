const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");
const {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
} = require("../controllers/taskController");

//apply authorization middleware to all routes
router.use(authMiddleware);

//Get all tasks
router.get("/projects/:projectId/tasks", getTasks);

//Create a task
router.post("/projects/:projectId/tasks", createTask);

//Update a task
router.put("/tasks/:taskId", updateTask);

//Delete a task
router.delete("/tasks/:taskId", deleteTask);

module.exports = router;
