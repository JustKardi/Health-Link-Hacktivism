const express = require ("express")
const app = express()
const path = require ("path")
const collection = require("./mongodb")

app.use(express.json())
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:false}))

// GET ROUTE
app.get("/", (req,res)=>{
    res.render("login")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})

// POST ROUTE
app.get("/home", (req, res) => {
    res.render("home");
});

// HANDLE SIGNUP/LOGIN FORM SUBMISSION
app.post("/signup", async (req, res) => {
    try {
        console.log(req.body); // Log the request body to debug
        const data = {
            name: req.body.name,
            password: req.body.password
        };

        if (!data.name || !data.password) {
            return res.status(400).send("Name and password are required");
        }

        await collection.create(data);
        res.render("home", { naming: req.body.name });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name });
        
        if (user && user.password === req.body.password) {
            res.render("home", { naming: req.body.name });
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Server Error");
    }
});



// change number in accordance with your local host
app.listen(5501, () => {
    console.log("port connected");
})