const express = require('express');
const { getAllOrders, addOrder, getOrderById, updateOrder, deleteOrder, getOrderByDate } = require('../controllers/orders.controller');

const router = express.Router()




router.get("/", getAllOrders)

router.post("/", addOrder)

router.get("/find", getOrderByDate)

router.get("/:id", getOrderById)

router.put("/:id", updateOrder)



router.delete("/:id", deleteOrder)



module.exports = router