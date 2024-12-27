const express = require('express');
const { getFlowers, addFlower, getFlowerById, updateFlowerById, deleteFLowerById, getFlowerByName, getFlowerByNameQuery, findFlowerByAnyParams, findFlowerByName } = require('../controllers/flower.controller');

const router = express.Router();


router.get("/", getFlowers);

router.post("/", addFlower)

router.get("/findquery", getFlowerByNameQuery)

router.get("/findanyparams", findFlowerByAnyParams)

router.get("/findbyname", findFlowerByName)

router.get("/:id", getFlowerById)

router.put("/:id", updateFlowerById)

router.get("/find/:flowerName", getFlowerByName)

router.delete("/:id", deleteFLowerById)





module.exports = router