const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imageName: {
        type: String,
        default: "none",
    },
    imageData: {
        contentType: String,
        data: Buffer,
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;