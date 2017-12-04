var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var MyPicSchema = new Schema({
    galleryId: { type: Schema.Types.ObjectId, required: true },
    file: {filename: String, originalName: String, dateUploaded: Date}
    
});

module.exports = Mongoose.model('Pics', MyPicSchema);