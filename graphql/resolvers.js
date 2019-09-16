import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import uuidv4 from 'uuid/v4'
import validator from 'validator'
// import sgMail from '@sendgrid/mail'
import User from '../models/user'
import Post from '../models/post'
import comment from '../models/comment'
import auth from '../middleware/auth'
import { verify } from 'crypto'


import { sendConfrimMail, sendMail } from '../util/mailHandler'
import mail from '@sendgrid/mail'

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.setApiKey('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')


module.exports = {
    createUser: async ({ userInput }, req) => {
            const errors = []
            if (validator.isEmpty(userInput.name)) {
                errors.push({ message: 'Please enter name!' })
            }
            if (!validator.isEmail(userInput.email)) {
                errors.push({ message: 'E-mail is invalid.' })
            }
            if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
                errors.push({ message: 'Password too short!' })
            }
            if (validator.isEmpty(userInput.confirmedPassword)) {
                errors.push({ message: 'Please confirm password!' })
            }
            if (userInput.confirmedPassword !== userInput.password) {
                errors.push({ message: 'Passwords dont match!' })
            }
            
            if (errors.length > 0) {
                const error = new Error('Invalid input')
                error.data = errors
                error.code = 422
                throw error
            }
            const existingUser = await User.findOne({ email: userInput.email })
            if (existingUser) {
                const error = new Error('User exists already!')
                throw error
            }
            const authId = uuidv4()
            const hashedPassword = await bcrypt.hash(userInput.password, 12)
            const user = new User({
                name: userInput.name,
                email: userInput.email,
                password: hashedPassword,
                authId: authId,
                posts: []
            })
            const createdUser = await user.save()
            
        
            const mail = {
                to: 'bstanic16@raf.rs',
                from: 'Stefan Zivic',
                subject: 'Proba',
                html: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
            };
           

            sendConfrimMail(mail)
           
            return {
                ...createdUser._doc,
                _id: createdUser._id.toString()

            }
    },
    login: async ({ email, password }, req) => {
        const user = await User.findOne({ email })
        if (!user) {
            const error = new Error('User not found!')
            error.code = 401
            throw error
        }
        const verified = await User.findOne(user.authId)

        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const error = new Error('Password is incorrect!')
            error.code = 401
            throw error
        }
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, 
        '1ff1d761e8714d1cca6dbe645e6bbc83',
        { expiresIn: '1h' })

        return {
            userId: user._id.toString(),
            token: token
        }
    },
    verifyUser: async ({ authId }, req) => {
        const doc = await User.findOne({ authId: authId })
        if (!doc) {
            const error = new Error('No acc with that token')
            error.code = 404
            throw error
        }
        const update = { verified: true }
        await doc.updateOne(update)
        return true
    },
    updateUser: async ({ id, userInput }, req) => {
        if (!req.isAuth) {
            const error = new Error('Not authenticated!')
            error.code = 401
            throw error
        }
        const user = await User.findById(id)
        if (!user) {
            const error = new Error('User not found!')
            error.code = 404
            throw error
        }
        const errors = []
        if (validator.isEmpty(userInput.name)) {
            errors.push({ message: 'Please enter name!' })
        }
        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'E-mail is invalid.' })
        }
        if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
            errors.push({ message: 'Password too short!' })
        }
        if (validator.isEmpty(userInput.confirmedPassword)) {
            errors.push({ message: 'Please confirm password!' })
        }
        if (userInput.confirmedPassword !== userInput.password) {
            errors.push({ message: 'Passwords dont match!' })
        }
        
        if (errors.length > 0) {
            const error = new Error('Invalid input')
            error.data = errors
            error.code = 422
            throw error
        }

        const hashedPassword = await bcrypt.hash(userInput.password, 12)

        const updateUser = new User({
            name: userInput.name,
            email: userInput.email,
            password: hashedPassword,
            auth: true
        })
        user.name = userInput.name
        user.email = userInput.email
        user.password = hashedPassword

        await user.save()
        return {
            ...user._doc,
            id: user._id.toString()
        }
    },
    resetPassword: async ({ email }) => {
        const user = await User.findOne({ email: email})
        if (!user) {
            const error = new Error('No account with that email found.')
            error.code = 404
            throw error
        }
        const token = crypto.randomBytes(32).toString('hex')
        user.resetToken = token
        user.resetTokenExpiration = Date.now() + 3600000
        await user.save()

        var mail = {
            to: 'stefan.zivic.1997@gmail.com',
            from: "TESTTTTTTTTTTTTT@demo.com",
            subject: "Confrim Email",
            html: `<div style="border: 1px solid blue">
                        <h3 style="color: blue;"> Hello ${user.name} </h3>
                        <p>Click this <a style="color: red;" href="http://localhost:8080/verify/${user.authId}">link</a> to verify.</p>
                    </div>`
        };

        await sgMail.send(mail)

        return true
    }
}


// npm install --save @sendgrid/mail
// npm install --save bcrypt uuid @sendgrid/mail
