const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const PORT = process.env.PORT || 3030
const app = express()
const mainRouter = require("./routes");

app.use(express.json()); // POST 


app.use("/api", mainRouter)


app.listen(PORT, () => {
    console.log("Server ishga tushdi ", PORT);
})