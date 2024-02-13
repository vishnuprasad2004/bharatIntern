const express = require("express");
const { connectDb, User } = require("./db.js")
const path = require("path");
const app = express();
const PORT = 3000;

connectDb();

app.use("/static", express.static('public'))
// to access the inputs given in the form inside the req.body.[name attribute]
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/public/index.html"))
})
app.get("/home",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/public/thankyou.html"))
})
app.get("/error",(req,res) => {
    res.sendFile(path.resolve(__dirname + "/public/error.html"))
})

app.post("/register",async(req,res) => {
    try {
        console.log(req.body);
        const {name, gender,email, password} = req.body
        User.create({
            name,
            gender,
            email,
            password
        })
        res.redirect("/home");

    }catch(e) {
        console.log(e.message);
        res.redirect("/error")
    }
})

app.listen(PORT,() => console.log(`listening on http://localhost:${PORT}`));
