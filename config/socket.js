import http from "http" 
import express from 'express'
import { Server } from "socket.io"

const app = express()

const server = http.createServer(app)

const io = new Server(server)

io.on("connection", (socket)=>{
    console.log("A user Connected ",socket.id);

    socket.on("send-location",({latitude, longitude})=>{

        io.emit("recieve-location",{
            id:socket.id,
            latitude,
            longitude
        })
    })

    socket.on("disconnect",()=>{
        io.emit("user-disconnect", socket.id)
        console.log("A User disconnected", socket.id);
    })
})

export {app, server, io};