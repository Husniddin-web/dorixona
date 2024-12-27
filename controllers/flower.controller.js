const db = require("../config/db")


const getFlowers = (req, res) => {
    db.query("SELECT * FROM flowers", (error, results) => {
        if (error) {
            console.log("Error selecting flowers", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        res.json(results);
    });
};


const addFlower = (req, res) => {
    const { name, color, price, flower_type, photo, import_from } = req.body
    db.query(
        `
       INSERT INTO flowers (name,color,price, flower_type, photo, import_from)
       VALUES (? ,? , ? ,?,?,?)`, [name, color, price, flower_type, photo, import_from],
        (error, results) => {
            if (error) {
                console.log("Error adding new a flower", error);
                return res.status(500).json({
                    message: "Error adding new flower",
                    error: "Internal server Error"
                });
            }
            console.log(results);
            res.status(201).json({
                message: "New flower added",
                flowerID: results.insertId
            })
        }
    )
}


const getFlowerById = (req, res) => {
    const { id } = req.params
    db.query(`SELECT * FROM flowers WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error selecting flower BY ID ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Flower Not Found"
            })
        }
        res.json(results[0])
    })
}


const updateFlowerById = (req, res) => {
    const { id } = req.params
    const { name, color, price, flower_type, photo, import_from } = req.body

    db.query(`
        UPDATE flowers SET name = ? , color = ? , price = ? , flower_type = ? , photo = ? 
        , import_from =? WHERE id =?
        `, [name, color, price, flower_type, photo, import_from, id], (error, results) => {
        if (error) {
            console.log("Error updating Flower BY ID ", error);
            return res.status(500).json({
                message: "Error updating new folder",
                error: "Internal server Error"
            })
        }
        res.json({
            message: "FLower updated succefully",
            flowerID: id
        })

    })
}


const deleteFLowerById = (req, res) => {
    const { id } = req.params
    db.query(`DELETE FROM flowers WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error deleting Flower BY ID ", error);
            return res.status(500).json({
                message: "Error deleting new folder",
                error: "Internal server Error"
            })
        }
        res.json({
            message: "FLower delete succefully",
            flowerID: id
        })
    })
}


const getFlowerByName = (req, res) => {
    const { flowerName } = req.params
    db.query(`SELECT * FROM flowers WHERE name LIKE "%${flowerName}%"`, (error, results) => {
        if (error) {
            console.log("Error selecting flower BY NAME ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Flower Not Found"
            })
        }
        res.json(results)
    })
}



const getFlowerByNameQuery = (req, res) => {
    const searchquery = req.query
    db.query(`SELECT * FROM flowers WHERE name LIKE "%${searchquery.name}%"`, (error, results) => {
        if (error) {
            console.log("Error selecting flower BY NAME ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Flower Not Found"
            })
        }
        res.json(results)
    })
}



const findFlowerByAnyParams = (req, res) => {
    const { name, color, start_price, finish_price } = req.body
    let where = "true"

    if (name) {
        where += ` and name like '%${name}%'`;
    }

    if (color) {
        where += ` and color like '%${color}%'`;
    }

    if (start_price && finish_price) {
        where += ` and price BETWEEN '${start_price}' and '${finish_price}'`;
    } else if (start_price) {

        where += ` and price >= '${start_price}'`;

    }
    console.log(where);
    if (where != "true") {
        db.query(`SELECT * FROM flowers where ${where}`, (error, results) => {
            if (error) {
                console.log("error selecting by filter", error);
                return res.status(500).json({
                    error: "Internal server error"
                })
            };
            if (results.length == 0) {
                return res.status(404).json({
                    message: "Flower not found"
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



const findFlowerByName = (req, res) => {
    const { firstName, firstDay, secondDay, status } = req.body
    if (!firstName || !firstDay || !secondDay || !status) {
        return res.status(400).json({ message: "Not enough param" })
    }

    db.query(`SELECT * FROM flowers f
        LEFT JOIN order_details od ON f.id = od.flower_id
        LEFT JOIN orders o ON od.order_id = o.id
        LEFT JOIN status s ON o.status_id = s.id
        LEFT JOIN customers c ON o.customer_id = c.id
        WHERE c.first_name LIKE '%${firstName}%' AND s.name =  '${status}'  AND  (o.order_date BETWEEN '${firstDay}' AND '${secondDay}' )
        `, (error, results) => {
        if (error) {
            return res.status(500).json({ msg: "Error", error })
        }
        res.status(200).json(results)
    })
}







module.exports = {
    getFlowers,
    addFlower,
    getFlowerById,
    updateFlowerById,
    deleteFLowerById,
    getFlowerByName,
    getFlowerByNameQuery,
    findFlowerByAnyParams,
    findFlowerByName
}