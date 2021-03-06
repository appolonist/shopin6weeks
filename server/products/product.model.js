const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    productName: { type: String, unique: true, required: true},
    type: { type: String, required: true},
    price: { type: Number, required: true},
    avatar: { 
        data: Buffer, 
        contentType: String 
     },
    createdDate: {type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
})

module.exports = mongoose.model('Product', schema);