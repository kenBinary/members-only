// -login
// -sign up new member
// -create new message
// -delete message
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");



// email should be in correct email format
// validate password be at least 8 char in length, has one uppercase,one lowercase one number
// req.body.username
// req.body.password
exports.loginValidation = [
    check("username").isEmail().normalizeEmail().trim().escape().withMessage("Invalid Message"),
    check("password").trim().escape().withMessage("Invalid Password")
];

exports.login = asyncHandler(async (req, res, next) => {
    // login with authentication using passport
});

exports.signUp = asyncHandler(async (req, res, next) => {
    // sign-up with sanitation and validation whose password is stored with hash
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmedPassord = req.body.cPassword;
    const code = req.body.secretCode;
});

// name should just be string with minimum 0 length
// email should be in correct email format
// password should be at least 8 characters in length, has one uppercase, one lowercase, one number
// code should just be string
function confirmPassword(value, { req }) {
    if (req.body.password === value) {
        return true;
    }
    else if (req.body.password !== value) {
        return false;
    }
}
exports.signupValidation = [
    check("name").matches(/[A-Za-z0-9]+/i).isLength({ min: 0 }).trim().escape().withMessage("Enter a name!"),
    check("email").isEmail().trim().escape().normalizeEmail().withMessage("Enter a valid email!"),
    check("password").isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1 }).trim().escape().withMessage("password not strong enough"),
    check("cPassword").custom(confirmPassword).trim().escape().withMessage("password do not match"),
    check("secretCode").matches(/[A-Za-z0-9]+/).isLength({ min: 5 }).escape().trim().withMessage("Invalid Code")
];