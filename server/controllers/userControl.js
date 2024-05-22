const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userControl = {
    registerUser: async (req,res) => {
        try {
            const {username, email, password} = req.body
            const emailcheck = await Users.findOne({email: email})
            if(emailcheck) return res.status(400).json({message: "This already exists an account with this email!"})
            const user = await Users.findOne({username: username})
            if(user) return res.status(400).json({message: "This username is already taken :("})

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })
            await newUser.save()
            res.json({message: "User succesfully registered! :)"})
        } catch (err) {
            return res.status(400).json({message: err.message})
        }
    },
    loginUser: async (req,res) => {
        try {
            const {username, password} = req.body
            const user = await Users.findOne({username: username})
            if(!user) return res.status(400).json({message: "Username does not exist"})

            const passMatch = await bcrypt.compare(password, user.password)
            if(!passMatch) return res.status(400).json({message: "The password you entered is incorrect"})

            const payload = {id: user._id, name:user.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"})
            res.json({token})
        } catch (err) {
            return res.status(200).json({message: err.message})
        }
    },
    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, (err, verified) => {
                if(err) return res.send(false)

                const user = Users.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = userControl