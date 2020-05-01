const express = require('express')
const router = express.Router()
const User = require('../model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res, next) => {
    res.status(200).json({
        message: 'hh'
    })
})

router.get('/:id', async (req, res, next) => {
    res.status(200).json({
        id: req.params.id
    })
})

router.post('/sign-up', async (req, res, next) => {
    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        })

        let create = await user.save()
        if (!create) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json(create)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json({
                error: "username not found"
            })
        }
        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({
                error: "unauthorized"
            })
        } else {
            const token = jwt.sign({
                username: user.username,
                email: user.email,
            }, "my-secret-key", { expiresIn: "1h" })
            console.log("OK")
            res.status(200).json({
                message: "OK",
                token: token,
            })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.post('/', async (req, res, next) => {
    try {

    } catch (err) {

    }
})
router.put('/:id', async (req, res, next) => {
    try {

    } catch (err) {

    }
})
router.delete('/:id', async (req, res) => {
    try {

    } catch (err) {

    }
})


module.exports = router