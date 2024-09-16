const jwt = require('jsonwebtoken')
const {userModel} = require('../models/user.model.js')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(422).json({ success: "false", message: "Fill all fields." })
        if (password.length < 8) return res.status(401).json({ success: "false", message: "Use a strong password." })
        const existingUser = await userModel.findOne({ email })
        if (existingUser) return res.status(409).json({ success: "false", message: "User already exists." })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const createdUser = await userModel.create({
            name, password: hashedPassword, email
        })
        const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, process.env.MYSECRET,)
        return res.status(200).json({ success: "true", data: createdUser, message: "User created successfully.", token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: "false", message: "Something went wrong." })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(422).json({ success: "false", message: "Fill all fields." })
        const user = await userModel.findOne({ email })
        if (!user) return res.status(409).json({ success: "false", message: "Invalid credentials." })
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(401).json({ success: "false", message: "Invalid credentials." })
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.MYSECRET)
        return res.status(200).json({ success: "true", message: "Login successfully.", data: user, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: "false", message: "Something went wrong." })
    }
}

module.exports = {
    signUp,
    login
}