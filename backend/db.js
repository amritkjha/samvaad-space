const { default: mongoose } = require("mongoose")
const mongoURI = 'mongodb://127.0.0.1:27017/samvaad-space'
const connectToDB = async() => {
    await mongoose
    .connect(mongoURI, console.log("Success!"))
    .then(() => console.log("DB connected."))
    .catch((err) => console.log(err))
};
module.exports = connectToDB;