const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");
const {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
} = require("../controllers/projectController");

//Run authorization middleware for every route
router.use(authMiddleware);

//Get all projects
router.get("/", getAllProjects);

//Get project by id
router.get("/:id", getProjectById);

//Create a project
router.post("/", createProject);

//Update a project
router.put("/:id", updateProject);

//Delete a project
router.delete("/:id", deleteProject);

module.exports = router;
