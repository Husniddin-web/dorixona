const db = require("../config/db")

const getAllCustomers = (req, res) => {
    db.query("SELECT * FROM customers", (error, results) => {
        if (error) {
            if (error) {
                console.log("Error selecting customers", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        }
        res.json(results);
    })
}

const addCustomer = (req, res) => {
    const { first_name, last_name, phone, email, address } = req.body
    db.query(
        `
       INSERT INTO customers (first_name, last_name, phone, email, address)
       VALUES (? ,? , ? ,?,?)`, [first_name, last_name, phone, email, address],
        (error, results) => {
            if (error) {
                console.log("Error adding new a customer", error);
                return res.status(500).json({
                    message: "Error adding new customer",
                    error: "Internal server Error"
                });
            }
            console.log(results);
            res.status(201).json({
                message: "New customer added",
                flowerID: results.insertId
            })
        }
    )
}



const updateCustomer = (req, res) => {
    const { id } = req.params
    console.log(id);
    const { first_name, last_name, phone, email, address } = req.body
    db.query(`
    UPDATE customers SET first_name = ?, last_name = ?, phone = ?, email = ?, address =?
     WHERE id =?
    `, [first_name, last_name, phone, email, address, id], (error, results) => {
        if (error) {
            console.log("Error updating customer BY ID ", error);
            return res.status(500).json({
                message: "Error updating customer",
                error: "Internal server Error"
            });
        }
        res.json({
            message: "Customer updated successfully",
            flowerID: id
        });
    });
}


const getCustomerById = (req, res) => {
    const { id } = req.params
    db.query(`SELECT * FROM customers WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error selecting customer BY ID ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Customer Not Found"
            })
        }
        res.json(results[0])
    })
}


const deleteCustomer = (req, res) => {
    const { id } = req.params
    db.query(`DELETE FROM customers WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error deleting Customer BY ID ", error);
            return res.status(500).json({
                message: "Error deleting new folder",
                error: "Internal server Error"
            })
        }
        res.json({
            message: "Customer delete succefully",
            flowerID: id
        })
    })
}



const getCustomerByName = (req, res) => {
    const { firstName } = req.params
    db.query(`SELECT * FROM customers WHERE first_name LIKE "%${firstName}%"`, (error, results) => {
        if (error) {
            console.log("Error selecting customer BY NAME ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Customer Not Found"
            })
        }
        res.json(results)
    })
}



const getCustomerByNameQuery = (req, res) => {
    const searchquery = req.query
    db.query(`SELECT * FROM customers WHERE first_name LIKE "%${searchquery.name}%"`, (error, results) => {
        if (error) {
            console.log("Error selecting customer BY NAME ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Customer Not Found"
            })
        }
        res.json(results)
    })
}




const findCustomerByAnyParams = (req, res) => {
    const { first_name, last_name, phone, address } = req.body

    let where = "true"

    if (first_name) {
        where += ` and first_name like '%${first_name}%'`;
    }

    if (last_name) {
        where += ` and last_name like '%${last_name}%'`;
    }

    if (phone) {
        where += ` and phone like '%${phone}%'`;
    }

    if (address) {
        where += ` and address like '%${address}%'`;
    }

    if (where != "true") {
        db.query(`SELECT * FROM customers where ${where}`, (error, results) => {
            if (error) {
                console.log("error selecting by filter", error);
                return res.status(500).json({
                    error: "Internal server error"
                })
            };
            if (results.length == 0) {
                return res.status(404).json({
                    message: "Customer not found"
                })
            };
            res.json(results)
        })
    } else {
        return res.status(400).json({
            message: "Qidirsh prametrlar mavjud emas"
        })
    }
}

const findCustomerByFlower = (req, res) => {
    const { flowerName, firstDay, secondDay } = req.body
    if (!flowerName || !firstDay || !secondDay) {
        return res.status(400).json({ message: "Not enough param" })
    }

    db.query(`SELECT * FROM customers c
        LEFT JOIN orders o ON c.id = o.customer_id
        LEFT JOIN order_details od ON  o.id = od.order_id
        LEFT JOIN flowers f ON od.flower_id = f.id
        WHERE f.name LIKE '%${flowerName}%' AND  (o.order_date BETWEEN '${firstDay}' AND '${secondDay}' )
        `, (error, results) => {
        if (error) {
            return res.status(500).json({ msg: "Error", error })
        }
        res.status(200).json(results)
    })
}





module.exports = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    getCustomerById,
    deleteCustomer,
    getCustomerByName,
    getCustomerByNameQuery,
    findCustomerByAnyParams,
    findCustomerByFlower
}