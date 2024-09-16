const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./src/routes/user.route.js')
const { auth } = require('./src/middlewares/auth.middleware.js')
const { projectRouter } = require('./src/routes/project.route.js')
require('dotenv').config()
require('./src/models/db.js')
const path = require('path')
const _dirname = path.resolve()



app.use(cors())
app.use(express.json())



app.use("/api/auth", userRouter)
app.use("/api/project", auth, projectRouter)


app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.listen(process.env.PORT)