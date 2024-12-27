const db = require("../config/db")

const getAllorder_details = (req, res) => {
    db.query("SELECT * FROM order_details", (error, results) => {
        if (error) {
            if (error) {
                console.log("Error selecting order_details", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        }
        res.json(results);
    })
}

const addOrderDetails = (req, res) => {
    const { order_id, flower_id, quantity } = req.body
    db.query(
        `SELECT price FROM flowers where id = ? `, [flower_id], (error, flower_result) => {
            if (error) {
                console.log("Error selecting flower by ID");
                return res.status(500).json({
                    message: "Error adding new Order Detail",
                    error: "Server Internal Error"
                })
            } else {
                if (flower_result.length == 0) {
                    return res.status(404).json({
                        message: "Not found flower"
                    })
                } else {
                    db.query(
                        `SELECT  * FROM orders where id = ? `, [order_id], (error, order_total_price_result) => {
                            if (error) {
                                console.log("Selecting error Order by Id");
                                return res.status(500).json({
                                    message: "Error adding new Order Detail",
                                    error: "Server internal error"
                                })
                            } else {
                                if (order_total_price_result.length == 0) {
                                    return res.status(404).json({
                                        message: "Order Not Found"
                                    })
                                } else {
                                    let total_price = 0
                                    total_price = Number(order_total_price_result[0].total_price)
                                    total_price += Number(flower_result[0].price) * quantity
                                    db.query(
                                        `UPDATE orders 
                                        SET total_price = ?
                                        WHERE id = ?
                                        `, [total_price, order_id], (error, result) => {
                                        if (error) {
                                            console.log("erro updating totla price");
                                            return res.status(500).json({
                                                message: "Error adding new Order Detail",
                                                error: "Error internal server"
                                            })
                                        } else {
                                            db.query(
                                                `
                                                INSERT INTO order_details (order_id ,flower_id,quantity)
                                                VALUES (? ,? ,?)`, [order_id, flower_id, quantity],
                                                (error, results) => {
                                                    if (error) {
                                                        console.log("Error adding new a Order", error);
                                                        return res.status(500).json({
                                                            message: "Error adding new Order Detail",
                                                            error: "Internal server Error"
                                                        });
                                                    }
                                                    res.status(201).json({
                                                        message: "New Order Detail added update order totla price",
                                                        flowerID: results.insertId
                                                    })
                                                }
                                            )
                                        }

                                    }
                                    )
                                }
                            }
                        }
                    )
                }

            }
        }
    )

}



const updateOrderdetails = (req, res) => {
    const { id } = req.params
    const { order_id, flower_id, quantity } = req.body

    db.query(`
    UPDATE order_details SET order_id = ?, flower_id = ?, quantity = ?
     WHERE id =?
    `, [order_id, flower_id, quantity, id], (error, results) => {
        if (error) {
            console.log("Error updating Order detail BY ID ", error);
            return res.status(500).json({
                message: "Error updating Order",
                error: "Internal server Error"
            });
        }
        res.json({
            message: "Order  Detail updated successfully",
            flowerID: id
        });
    });
}


const getOrderDetailById = (req, res) => {
    const { id } = req.params
    db.query(`SELECT * FROM order_details WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error selecting Order Detail BY ID ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Order Detail Not Found"
            })
        }
        res.json(results[0])
    })
}


const deleteOrderDetail = (req, res) => {
    const { id } = req.params
    db.query(`DELETE FROM order_details WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error deleting Order Detail BY ID ", error);
            return res.status(500).json({
                message: "Error deleting new folder",
                error: "Internal server Error"
            })
        }
        res.json({
            message: "Order Detail delete succefully",
            flowerID: id
        })
    })
}



module.exports = {
    getAllorder_details,
    addOrderDetails,
    updateOrderdetails,
    deleteOrderDetail,
    getOrderDetailById
}
