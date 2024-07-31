const express = require ("express")
const app = express()
const path = require ("path")

const collection = require("./mongodb")
app.use(express.json())

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

app.get("/", (req,res)=>{
    res.render("signup")
})

app.get("/", (req,res)=>{
    res.render("login")
})


app.post("/signup", async (req,res)=>{
    const data = {
        name: req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")

})

// change number in accordance with your local host
app.listen(5501, () => {
    console.log("port connected");
})