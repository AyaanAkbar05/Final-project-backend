const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");
const {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
} = require("../controllers/projectController");

router.use(authMiddleware);

router.get("/", getAllProjects);

router.get("/:id", getProjectById);

router.post("/", createProject);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

module.exports = router;
