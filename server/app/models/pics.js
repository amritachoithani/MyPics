var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var MyPicSchema = new Schema({
    galleryId: { type: Schema.Types.ObjectId, required: true },
    picsDescription: {type: String},
    picsName: {type: String},
    file: {filename: String, originalName: String, dateUploaded: Date},    
    dateUploaded: { type: Date, default: Date.now },
});

module.exports = Mongoose.model('Pics', MyPicSchema);