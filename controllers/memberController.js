// User model
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
// validation and sanitation
const { check, validationResult } = require("express-validator");
// password encrypting
const bcrypt = require("bcrypt");
// dotenv
require('dotenv').config();



// email should be in correct email format
// validate password be at least 8 char in length, has one uppercase,one lowercase one number
// req.body.username
// req.body.password
exports.loginValidation = [
    check("username").isEmail().normalizeEmail().trim().escape().withMessage("Invalid Message"),
    check("password").trim().escape().withMessage("Invalid Password")
];
// -login
exports.login = asyncHandler(async (loginName, password, done) => {
    // login with authentication using passport
    const user = await User.findOne({ email: loginName });
    const match = bcrypt.compare(password, user.hash);
    if (!user) {
        return done(null, false, { message: "Incorrect Username" });
    }
    else if (!match) {
        return done(null, false, { message: "Password do not match" });
    }
    return done(null, user);
});
// -sign up new member
exports.signUp = asyncHandler(async (req, res, next) => {
    // sign-up with sanitation and validation whose password is stored with hash
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error("Sign up validation and sanitation errors");
    }
    bcrypt.hash(req.body.password, 5, async (err, hash) => {
        const code = (req.body.secretCode === process.env.admin_code);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            hash: hash,
            isAdmin: code
        }
        const saveUser = new User(newUser);
        await saveUser.save();
    })
    res.redirect("/");
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