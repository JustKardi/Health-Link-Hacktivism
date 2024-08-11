
// EXPRESS SCRIPT
const express = require ("express")
const app = express()
const path = require ("path")
const collection = require("./mongodb")
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:false}))

// Example Express routes in your backend (Node.js/Express)
app.get('/api/key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

app.get('/api/mapid', (req, res) => {
    res.json({ mapId: process.env.GOOGLE_MAPS_MAP_ID });
});


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

app.get("/landing", (req, res) => {
    res.render("landing");
});

app.get("/viruses", (req, res) => {
    res.render("viruses");
});

app.get("/info", (req, res) => {
    res.render("info");
});

app.get("/ai", (req, res) => {
    res.render("ai");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/forum", (req, res) => {
    res.render("forum");
});

app.get("/maps", (req, res) => {
    res.render("maps");
});

// POST ROUTE
app.post("/signup", async (req, res) => {
    try {
        console.log(req.body); // Log the request body to debug
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            city: req.body.city,
            country: req.body.country,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,

        };

        if (!data.firstName || !data.lastName || !data.age || !data.gender || !data.city || !data.country || !data.email || !data.username || !data.password) {
            return res.status(400).send("All fields are required");
        }

        await collection.create(data);
        res.render("landing", { naming: req.body.name });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ username: req.body.username });
        
        if (user && user.password === req.body.password) {
            res.render("landing", { naming: req.body.username });
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Server Error");
    }
});

// change number in accordance with your local host
app.listen(5509, () => {
    console.log("port connected");
})
