exports.createUserValidation = () => {
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
}