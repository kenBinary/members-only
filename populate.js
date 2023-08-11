const User = require("./models/user");
const Message = require("./models/message");
require("dotenv").config();

// connecting to mongoose
const connectionString = process.env.connection_string
const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(connectionString);
    console.log(mongoose.connection.readyState);
    console.log("Debug: Should be connected?");
    await createUsers();
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

let userArray = [];

async function createUser(pName, pEmail, pHash, isAdmin) {
    const newUser = {
        name: pName,
        email: pEmail,
        hash: pHash,
        isAdmin: isAdmin
    }
    const userDocument = new User(newUser);
    await userDocument.save();
    userArray = [...userArray, userDocument];
}

async function createUsers() {
    await Promise.all([
        createUser("testUser", "testEmail", "testHash", false)
    ])
}
async function createMessage(pAuthor, pPosted, pTitle, pMessage) {
    const newMessage = {
        author: pAuthor,
        datePosted: pPosted,
        title: pTitle,
        message: pMessage,
    }
    const messageDocument = new Message(newMessage);
    await messageDocument.save();
}

async function createMessages() {
    await Promise.all([
        createMessage(userArray[0], new Date(), "some title", "some Message"),
        createMessage(userArray[0], new Date(), "some title 2", "some Message 2")
    ])
}
