import { app, server, io } from "./config/socket.js";
import express from "express"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (_, res)=>{
    res.render("index")
})

server.listen(8080, ()=>{
    console.log("Server Started on port 8080!!");
})