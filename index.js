const express = require("express");
const customer = require("./routes/customer")
const app = express()
const fs = require("fs");
app.set("view engine", "ejs");
app.use("/customer", customer);

app.get("/", (req, res) => {
    res.send("<div><a href='customer'><b>Customer</b></a></div>");
})

app.get("/user_data",(req,res) => 
{
    res.send(require("./Json_Data/user-data.json"));
})

app.get("/order_data",(req,res) => 
{
    res.send(require("./Json_Data/orders-data.json"));
})
app.listen(process.env.PORT || 5000);