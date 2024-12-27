const express = require('express');

const router = express.Router()

const flowerRoute = require("./flower")
const cutomerRoute = require("./customers")
const statusRoute = require("./status")
const orderRoute = require("./order")
const orderDetailRoute = require("./order_detail")



router.use("/flowers", flowerRoute)



// customers

router.use("/customers", cutomerRoute)


// status

router.use("/status", statusRoute)  


// order

router.use("/orders", orderRoute) 

// order_derail

router.use("/orderdetails", orderDetailRoute) 





module.exports = router