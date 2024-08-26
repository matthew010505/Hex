const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/Document");
const mongoose = require('mongoose');

// Replace the connection string with your MongoDB Atlas URI----    ======>
mongoose.connect("<your ul>")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));;


app.get("/", (req, res) => {
    const data = `   Welcome to Hex!

    Use the commands in the top right corner
    to create a new file to share with others..`;
    res.render("data-display.ejs", { data,language:'plaintext' });
});

app.get("/new", (req, res) => {  
    res.render("new");
});

app.post("/save", async (req, res) => {
    const value = req.body.value;

    try {
        const document = await Document.create({ value });
        res.redirect(`/${document.id}`);
    } catch (e) {
        res.render("new", { value });
    }

    console.log(value);
});


app.get("/duplicate",async (req,res)=>{
    const id=req.params.id
    try{
        const document=await Document.findById(id)

        res.render('new',{value:document.value})
    } catch(e){
        res.redirect(`${id}`)
    }
})

app.get("/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const document=await Document.findById(id)

        res.render('data-display',{data:document.value,id})
    } catch(e){
        res.redirect("/")
    }
})

app.listen(3000);
