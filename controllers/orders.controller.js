const db = require("../config/db")

const getAllOrders = (req, res) => {
    db.query("SELECT * FROM orders", (error, results) => {
        if (error) {
            if (error) {
                console.log("Error selecting Orders", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        }
        res.json(results);
    })
}

const addOrder = (req, res) => {
    const { customer_id, total_price, order_date, status_id } = req.body
    db.query(
        `
       INSERT INTO orders (customer_id, total_price , order_date ,status_id)
       VALUES (? ,? ,? ,?)`, [customer_id, total_price, order_date, status_id],
        (error, results) => {
            if (error) {
                console.log("Error adding new a Order", error);
                return res.status(500).json({
                    message: "Error adding new Order",
                    error: "Internal server Error"
                });
            }
            res.status(201).json({
                message: "New Order added",
                flowerID: results.insertId
            })
        }
    )
}



const updateOrder = (req, res) => {
    const { id } = req.params
    const { customer_id, total_price, order_date, status_id } = req.body
    db.query(`
    UPDATE orders SET customer_id = ?, total_price = ?, order_date = ?, status_id = ?
     WHERE id =?
    `, [customer_id, total_price, order_date, status_id, id], (error, results) => {
        if (error) {
            console.log("Error updating Order BY ID ", error);
            return res.status(500).json({
                message: "Error updating Order",
                error: "Internal server Error"
            });
        }
        res.json({
            message: "Order updated successfully",
            flowerID: id
        });
    });
}


const getOrderById = (req, res) => {
    const { id } = req.params
    db.query(`SELECT * FROM orders WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error selecting Order BY ID ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Order Not Found"
            })
        }
        res.json(results[0])
    })
}


const deleteOrder = (req, res) => {
    const { id } = req.params
    db.query(`DELETE FROM orders WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error deleting Order BY ID ", error);
            return res.status(500).json({
                message: "Error deleting new folder",
                error: "Internal server Error"
            })
        }
        res.json({
            message: "Order delete succefully",
            flowerID: id
        })
    })
}


const getOrderByDate = (req, res) => {
    const { firstDay, secondDay } = req.body
    if (!firstDay || !secondDay) {
        return res.status(400).json({ message: "Params not entered !" })
    }
    db.query(
        `SELECT * FROM orders WHERE order_date BETWEEN ? AND ?`,
        [firstDay, secondDay],
        (error, order_result) => {
            if (error) {
                console.error("Error getting orders by date:", error);
                return res.status(500).json({ message: "Internal Server Error", error });
            }
            if (order_result.length == 0) {
                return res.status(404).json({
                    message: "Not Found"
                })
            }
            else {
                const customerIds = order_result.map(order => order.customer_id);
                db.query(`SELECT * FROM customers WHERE id IN (?)`, [customerIds], (error, result) => {
                    if (error) {
                        console.error("Error getting customer by date:", error);
                        return res.status(500).json({ message: "Internal Server Error", error });
                    }
                    res.status(200).json(result)
                })
            }
        }
    );
}



module.exports = {
    getAllOrders,
    addOrder,
    updateOrder,
    getOrderById,
    deleteOrder,
    getOrderByDate
}