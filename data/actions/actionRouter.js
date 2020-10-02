const express = require("express");
const actionModel = require('../helpers/actionModel');
const router = express.Router();

router.post("/", (req, res) => {
    const actionInfo = req.body
    actionModel
        .insert(actionInfo)
        .then(() => {
            res.status(201).json({ message: "Action created" })
        })
})

router.get('/', (req, res) => {
    actionModel
        .get(req.id)
        .then(e => {
            res.status(200).json(e)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error getting actions" })
        })
})


router.put("/:id", (req, res) => {
    const actionInfo = req.body;
    const { id } = req.params
    actionModel
        .update(id, actionInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "Action updated" })
            } else {
                res.status(404).json({ message: "Nothing to update" })
            }
        })
        .catch(error => {
            res.status(500).json(error, "Update error")
        })

})

router.delete("/:id", (req, res) => {
    actionModel
        .remove(req.params.id)
        .then(e => {
            if (e > 0) {
                res.status(200).json({ message: "Action deleted" })
            } else {
                res.status(404).json({ message: "ACtion not found" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Delete error" })
        })
})

module.exports = router; 