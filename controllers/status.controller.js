const db = require("../config/db")

const getAllStatus = (req, res) => {
    db.query("SELECT * FROM status", (error, results) => {
        if (error) {
            if (error) {
                console.log("Error selecting status", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        }
        res.json(results);
    })
}

const addStatus = (req, res) => {
    const { name } = req.body
    db.query(
        `
       INSERT INTO status (name)
       VALUES (?)`, [name],
        (error, results) => {
            if (error) {
                console.log("Error adding new a status", error);
                return res.status(500).json({
                    message: "Error adding new status",
                    error: "Internal server Error"
                });
            }
            res.status(201).json({
                message: "New status added",
                statusId: results.insertId
            })
        }
    )
}



const updateStatus = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    db.query(`
    UPDATE status SET name = ?
     WHERE id =?
    `, [name , id], (error, results) => {
        if (error) {
            console.log("Error updating status BY ID ", error);
            return res.status(500).json({
                message: "Error updating status",
                error: "Internal server Error"
            });
        }
        res.json({
            message: "Status updated successfully",
            flowerID: id
        });
    });
}



const deleteStatus = (req, res) => {
    const { id } = req.params
    db.query(`DELETE FROM status WHERE id = ?`, [id], (error, results) => {
        if (error) {
            console.log("Error deleting Status BY ID ", error);
            return res.status(500).json({
                message: "Error deleting new folder",
                error: "Internal server Error"
            })
        }
        res.json({
            message: "Status delete succefully",
            flowerID: id
        })
    })
}




const getStatusByName = (req, res) => {
    const { statusName } = req.params
    db.query(`SELECT * FROM status WHERE name LIKE "%${statusName}%"`, (error, results) => {
        if (error) {
            console.log("Error selecting status BY NAME ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Status Not Found"
            })
        }
        res.json(results)
    })
}



const getStatusByNameQuery = (req, res) => {
    const searchquery = req.query
    db.query(`SELECT * FROM status WHERE name LIKE "%${searchquery.name}%"`, (error, results) => {
        if (error) {
            console.log("Error selecting status BY NAME ", error);
            res.status(500).json({
                error: "Internal Server Error"
            })
        }
        if (results.length == 0) {
            res.status(404).json({
                message: "Status Not Found"
            })
        }
        res.json(results)
    })
}



module.exports = {
    getAllStatus,
    addStatus, 
    updateStatus,
    deleteStatus,
    getStatusByName,
    getStatusByNameQuery

}