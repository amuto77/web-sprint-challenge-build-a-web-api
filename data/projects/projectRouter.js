const express = require("express");
const projectModel = require('../helpers/projectModel');

const router = express.Router();

router.get("/:id/actions", (req, res) => {
    projectModel
        .getProjectActions(req.params.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Retrieval Error" })
        })
})

router.post("/", (req, res) => {
    const projectInfo = req.body 
    projectModel
        .insert(projectInfo)
        .then(() => {
            res.status(201).json({ message: "Project created" })
        })
})

router.get('/', (req, res) => {
    projectModel
        .get(req.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Project Retrieval Error" })
        })
})



router.put("/:id", (req, res) => {
    const projectInfo = req.body;
    const { id } = req.params
    projectModel
        .update(id, projectInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "Project updated" })
            } else {
                res.status(404).json({ message: "Nothing to update" })
            }
        })
        .catch(error => {
            res.status(500).json(error, "Project Update Error")
        })

})

router.delete("/:id", (req, res) => {
    projectModel
        .remove(req.params.id)
        .then(e => {
            if (e > 0) {
                res.status(200).json({ message: "Project deleted" })
            } else {
                res.status(404).json({ message: "Project not found" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Project Delete Error" })
        })
})





module.exports = router; 