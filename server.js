const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const saltRounds = 10;
const knex = require('knex');

const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image")
const signin = require("./controllers/signin")

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'successjimoh-daodu',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express()

app.use(bodyParser.json())
app.use(cors())

// app.get("/", (req,res) => {
//     res.json(database.users)
// })

app.post("/signin", (req,res) => { signin.handleSignIn(req,res,db,bcrypt) })

app.post("/register", (req,res) => {register.handleRegister(req,res,db,bcrypt,saltRounds)})

app.get("/profile/:id", (req,res) => {profile.handleProfile(req,res,db)})

app.put("/image", (req,res) => { image.handleImage(req,res,db) })

app.post("/apicall", (req,res) => { image.handleApiCall(req,res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on ${process.env.PORT}`)
})