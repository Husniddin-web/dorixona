const express = require('express');
const { getAllorder_details, addOrderDetails, updateOrderdetails, deleteOrderDetail, getOrderDetailById } = require('../controllers/order_details.controller');

const router = express.Router()




router.get("/", getAllorder_details)


router.post("/", addOrderDetails)


router.get("/:id", getOrderDetailById)


router.put("/:id", updateOrderdetails)


router.delete("/:id", deleteOrderDetail)



module.exports = router