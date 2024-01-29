import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectionDB from "./db/db.js"
import authRoutes from "./routes/authRouter.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.__dirname(__filename)

// configure dotenv
dotenv.config({
    path: "./.env"
})


// Mongodb connection
connectionDB()


//rest object
const app = express()

//midlewear
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './frontend/build')))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes )
app.use('/api/v1/product', productRoutes)


//res api
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
    })

//port

const PORT = process.env.PORT || 3000
// running listening

app.listen(PORT, () => {
     console.log(`server is running on port: ${PORT}`);   
})

