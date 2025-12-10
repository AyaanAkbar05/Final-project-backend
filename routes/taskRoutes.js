const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");
const {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
} = require("../controllers/taskController");

router.use(authMiddleware);

router.get("/projects/:projectId/tasks", getTasks);

router.post("/projects/:projectId/tasks", createTask);

router.put("/tasks/:taskId", updateTask);

router.delete("/tasks/:taskId", deleteTask);

module.exports = router;
