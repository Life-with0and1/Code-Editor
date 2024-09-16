const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    htmlCode: {
        type: String,
        default: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`
    },
    cssCode: {
        type: String,
        default: `*{
    margin: 0;
    padding: 0;
    background: #00000025;
}`
    }, jsCode: {
        type: String,
        default: `console.log("Hello world")`
    }
})


const projectModel = mongoose.model("project", projectSchema)

module.exports = {projectModel}