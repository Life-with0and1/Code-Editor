const express = require('express')
const { createProject ,fetchProject, deleteProject, projectCode,updateCode } = require('../controllers/project.controller')
const projectRouter = express.Router()


projectRouter.post("/create" , createProject)
projectRouter.get("/fetch" , fetchProject)
projectRouter.delete("/delete:id" , deleteProject)
projectRouter.get("/get:id" , projectCode)
projectRouter.put("/update/:id" , updateCode)

module.exports = {projectRouter}