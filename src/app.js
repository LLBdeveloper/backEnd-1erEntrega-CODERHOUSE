import express from "express"
import {engine} from "express-handlebars"
import {Server} from "socket.io"
import displayRoutes from 'express-routemap'
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"


const app = express()
const PUERTO = 8080

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static("./src/public"));

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)

const httpServer = app.listen(PUERTO, () => {
    displayRoutes(app)
    console.log('escuchando en el puerto 8080')
})


import ProductManager from "./controllers/products.manager.js"
const productManager = new ProductManager("./src/models/productos.json")

const io = new Server(httpServer)

io.on("connection", ()=>{
    console.log("un cliente se conecto")
})