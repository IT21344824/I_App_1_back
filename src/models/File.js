const mongoose = require('../configuration/dbConfig');

const fileSchema = new mongoose.Schema({
    firstname: String,
    filename: String,
    fileData: Buffer,
    contentType: String,
});

module.exports = mongoose.model("Files", fileSchema);
