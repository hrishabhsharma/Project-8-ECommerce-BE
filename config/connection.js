const mongoose = require("mongoose")

mongoose.set("strictQuery", false);

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.URI)

    console.log('Successfully Established Connection with MongoDB');
  } catch (error) {
    console.log(`Failed to Establish Connection with MongoDB with Error: ${error}`);
  }
}

module.exports = connectToDb;