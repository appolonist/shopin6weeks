const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        contentType: String,
        data: Buffer,
        required: true
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;