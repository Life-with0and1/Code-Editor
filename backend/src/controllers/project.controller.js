const { projectModel } = require("../models/project.model");

const createProject = async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    if (!title) {
        return res.status(400).json({ success: false, message: "Project title is required." });
    }

    try {
        const newProject = await projectModel.create({
            title,
            user: user.email,
            username: user.name
        });
        return res.status(201).json({ success: true, message: "Created new project.", data: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ success: false, message: "Error while creating project.", error: error.message });
    }
};

const fetchProject = async (req, res) => {

    const user = req.user;
    try {
        const projects = await projectModel.find({
            user: user.email
        });
        return res.status(201).json({ success: true, name: user.name, data: projects });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error while fetching project.", error: error.message });
    }
}

const deleteProject = async (req, res) => {
    const id = req.params.id;
    try {
        const newProject = await projectModel.deleteOne({
            _id: id
        });
        return res.status(201).json({ success: true, message: "Project deleted." });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error while deleting project.", error: error.message });
    }
};

const projectCode = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await projectModel.findOne({
            _id: id
        });
        if (!data) res.status(500).json({ success: false, message: "Error while fetching project.", error: error.message });
        else return res.status(201).json({ success: true, data: data });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error while fetching project.", error: error.message });
    }
};
const updateCode = async (req, res) => {
    const id = req.params.id;
    const { htmlCode, cssCode, jsCode } = req.body;

    try {
        const updatedProject = await projectModel.findByIdAndUpdate(
            { _id: id },
            { htmlCode, cssCode, jsCode },
            { new: true }
        );

        if (updatedProject) {
            return res.status(200).json({ success: true, message: "Code updated successfully.", data: updatedProject });
        }
        else return res.status(404).json({ success: false, message: "Project not found." });

    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ success: false, message: "Error while updating project.", error: error.message });
    }
};



module.exports = { createProject, fetchProject, deleteProject, projectCode, updateCode };
