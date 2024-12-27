const { getAllStatus, addStatus, updateStatus, deleteStatus, getStatusByName, getStatusByNameQuery } = require('../controllers/status.controller');

const router = require('express').Router();

router.get("/", getAllStatus)

router.post("/", addStatus)

router.get("/findquery", getStatusByNameQuery)

router.put("/:id", updateStatus)

router.get("/find/:statusName", getStatusByName)



router.delete("/:id", deleteStatus)


module.exports = router