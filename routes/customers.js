const express = require('express');
const { getAllCustomers, addCustomer, updateCustomer, getCustomerById, deleteCustomer, getCustomerByName, getCustomerByNameQuery, findCustomerByAnyParams, findCustomerByFlower } = require('../controllers/customers.controller');

const router = express.Router()




router.get("/", getAllCustomers)

router.post("/", addCustomer)

router.get("/findquery", getCustomerByNameQuery)

router.get("/findany", findCustomerByAnyParams)

router.get("/customerbyflower", findCustomerByFlower)

router.get("/:id", getCustomerById)

router.put("/:id", updateCustomer)


router.get("/find/:firstName", getCustomerByName)

router.delete("/:id", deleteCustomer)



module.exports = router