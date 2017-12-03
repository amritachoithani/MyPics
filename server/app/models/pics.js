var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var MyPicSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    mypic: { type: String, required: true },
    description: { type: String },
    priority: {type: String},
    dateCreated: {type: Date, default: Date.now},
    dateDue: {type: Date, default: Date.now},
    completed: { type: Boolean, default: false},
    file: {filename: String, originalName: String, dateUploaded: Date}
    
});

module.exports = Mongoose.model('mypics', MyPicSchema);